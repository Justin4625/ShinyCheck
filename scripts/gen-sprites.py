#!/usr/bin/env python3
# Fetches the shiny Pokémon HOME sprite (512px on PokeAPI) for every data/pokedex.js entry and saves it at SIZE px
# over the entry's own sprite file, so data/pokedex.js stays the same. Run from anywhere: python3 scripts/gen-sprites.py
# Before overwriting, the new sprite's outline is compared with the old one: a big difference (a wrong form) is
# printed and that file is left alone. Pass --force to write those too. macOS only (uses sips).
import json, os, struct, subprocess, sys, tempfile, zlib, concurrent.futures as cf

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GQL = "https://beta.pokeapi.co/graphql/v1beta"
HOME = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/"
SIZE = 256  # crisp up to 170px on 1.5x screens and in the share card; scripts/gen-forms.py uses the same size
VARIETY = {"Alolan": "-alola", "Galarian": "-galar", "Hisuian": "-hisui", "Paldean": "-paldea",
           "Paldean Combat Breed": "-paldea-combat-breed", "White Stripe": "-white-striped"}
# Entries whose PokeAPI default isn't what the entry shows: Minior's shiny is its core (every color looks the same).
POKEMON = {"minior": "minior-red", "darmanitan-1": "darmanitan-galar-standard"}

def curl(*args):
  return subprocess.check_output(["curl", "-s", *args])

def alpha(path):
  """Opacity mask (list of bools) of an 8-bit, non-interlaced RGBA or palette PNG."""
  data = open(path, "rb").read()
  pos, idat, trns = 8, b"", b""
  while pos < len(data):
    n, kind = struct.unpack(">I4s", data[pos:pos + 8])
    chunk = data[pos + 8:pos + 8 + n]
    if kind == b"IHDR": w, h, depth, ctype = struct.unpack(">IIBB", chunk[:10])
    elif kind == b"tRNS": trns = chunk
    elif kind == b"IDAT": idat += chunk
    pos += 12 + n
  bpp = {6: 4, 3: 1, 2: 3, 4: 2}[ctype]
  raw, rows, prev, i = zlib.decompress(idat), [], bytearray(w * bpp), 0
  for _ in range(h):
    f, line = raw[i], bytearray(raw[i + 1:i + 1 + w * bpp])
    i += 1 + w * bpp
    for x in range(len(line)):
      a = line[x - bpp] if x >= bpp else 0
      b, c = prev[x], prev[x - bpp] if x >= bpp else 0
      if f == 1: line[x] = (line[x] + a) & 255
      elif f == 2: line[x] = (line[x] + b) & 255
      elif f == 3: line[x] = (line[x] + (a + b) // 2) & 255
      elif f == 4:
        p = a + b - c
        pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
        line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
    rows.append(line)
    prev = line
  if ctype == 6: return [r[x * 4 + 3] > 127 for r in rows for x in range(w)]
  if ctype == 4: return [r[x * 2 + 1] > 127 for r in rows for x in range(w)]
  if ctype == 3: return [(trns[v] if v < len(trns) else 255) > 127 for r in rows for v in r]
  return [True] * (w * h)

def overlap(a, b):
  """Shared outline of two same-size sprites, 0–1; the old Gen 9 sprites face the other way, so mirrored counts too."""
  ma, mb = alpha(a), alpha(b)
  if len(ma) != len(mb): return 0
  w = int(len(ma) ** .5)
  flipped = [mb[y * w + w - 1 - x] for y in range(w) for x in range(w)]
  iou = lambda p, q: sum(x and y for x, y in zip(p, q)) / max(1, sum(x or y for x, y in zip(p, q)))
  return max(iou(ma, mb), iou(ma, flipped))

spec = json.loads(curl("-X", "POST", GQL, "-H", "Content-Type: application/json", "-d", json.dumps(
  {"query": "{ pokemon_v2_pokemonspecies { id pokemon_v2_pokemons { id name is_default } } }"})))
spec = {s["id"]: s["pokemon_v2_pokemons"] for s in spec["data"]["pokemon_v2_pokemonspecies"]}
dex = json.loads(subprocess.check_output(["node", "-e",
  f'global.window={{}};require({json.dumps(REPO + "/data/pokedex.js")});console.log(JSON.stringify(window.DEX.filter(x=>x.name)))']))
force = "--force" in sys.argv
tmp = tempfile.mkdtemp()

def fetch(m):
  pokes = spec[int(m["dex"])]
  suffix = VARIETY.get(m["form"])
  if m["key"] in POKEMON: p = next((p for p in pokes if p["name"] == POKEMON[m["key"]]), None)
  elif suffix: p = next((p for p in pokes if p["name"].endswith(suffix)), None)
  else: p = next(p for p in pokes if p["is_default"])
  if not p: return f"no variety: {m['key']} ({m['form']})"
  big, small = f"{tmp}/{m['key']}.png", f"{tmp}/{m['key']}-check.png"
  if subprocess.run(["curl", "-sfL", "-o", big, f"{HOME}{p['id']}.png"]).returncode: return f"no sprite: {m['key']} ({p['name']})"
  dst = f"{REPO}/{m['sprite']}"
  if not os.path.exists(dst): score = 1
  else:
    width = struct.unpack(">I", open(dst, "rb").read()[16:20])[0]  # compare at the old sprite's size
    subprocess.run(["sips", "-Z", str(width), big, "--out", small], capture_output=True)
    score = overlap(small, dst)
  if score < .8 and not force: return f"differs ({score:.2f}): {m['key']} {m['sprite']} vs {p['name']}"
  subprocess.run(["sips", "-Z", str(SIZE), big], capture_output=True)  # in place: sips --out never overwrites
  os.replace(big, dst)
  os.chmod(dst, 0o644)
  return None

with cf.ThreadPoolExecutor(16) as ex:
  for r in ex.map(fetch, dex):
    if r: print(r)
