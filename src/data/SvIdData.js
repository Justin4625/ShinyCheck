const svIdData = [
    { id: "498", name: "Doduo", game: "Pokémon Scarlet & Violet" },
    { id: "499", name: "Dodrio", game: "Pokémon Scarlet & Violet" },
    { id: "500", name: "Exeggcute", game: "Pokémon Scarlet & Violet" },
    { id: "501", name: "Exeggutor", game: "Pokémon Scarlet & Violet" },
    { id: "502", name: "Rhyhorn", game: "Pokémon Scarlet & Violet" },
    { id: "503", name: "Rhydon", game: "Pokémon Scarlet & Violet" },
    { id: "504", name: "Rhyperior", game: "Pokémon Scarlet & Violet" },
    { id: "256", name: "Venonat", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "257", name: "Venomoth", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "505", name: "Elekid", game: "Pokémon Scarlet & Violet" },
    { id: "506", name: "Electabuzz", game: "Pokémon Scarlet & Violet" },
    { id: "507", name: "Electivire", game: "Pokémon Scarlet & Violet" },
    { id: "508", name: "Magby", game: "Pokémon Scarlet & Violet" },
    { id: "509", name: "Magmar", game: "Pokémon Scarlet & Violet" },
    { id: "510", name: "Magmortar", game: "Pokémon Scarlet & Violet" },
    { id: "43", name: "Happiny", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "44", name: "Chansey", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "45", name: "Blissey", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "260", name: "Scyther", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "261", name: "Scizor", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "511", name: "Kleavor", game: "Pokémon Scarlet & Violet" },
    { id: "223", name: "Tauros", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "512", name: "Blitzle", game: "Pokémon Scarlet & Violet" },
    { id: "513", name: "Zebstrika", game: "Pokémon Scarlet & Violet" },
    { id: "192", name: "Girafarig", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "193", name: "Farigiraf", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "267", name: "Sandile", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "268", name: "Krokorok", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "269", name: "Krookodile", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "254", name: "Rellor", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "255", name: "Rabsca", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "365", name: "Rufflet", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "366", name: "Braviary", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "514", name: "Vullaby", game: "Pokémon Scarlet & Violet" },
    { id: "515", name: "Mandibuzz", game: "Pokémon Scarlet & Violet" },
    { id: "224", name: "Litleo", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "225", name: "Pyroar", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "190", name: "Deerling", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "191", name: "Sawsbuck", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "516", name: "Smeargle", game: "Pokémon Scarlet & Violet" },
    { id: "310", name: "Rotom", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "517", name: "Milcery", game: "Pokémon Scarlet & Violet" },
    { id: "518", name: "Alcremie", game: "Pokémon Scarlet & Violet" },
    { id: "519", name: "Trapinch", game: "Pokémon Scarlet & Violet" },
    { id: "520", name: "Vibrava", game: "Pokémon Scarlet & Violet" },
    { id: "521", name: "Flygon", game: "Pokémon Scarlet & Violet" },
    { id: "522", name: "Pikipek", game: "Pokémon Scarlet & Violet" },
    { id: "523", name: "Trumbeak", game: "Pokémon Scarlet & Violet" },
    { id: "524", name: "Toucannon", game: "Pokémon Scarlet & Violet" },
    { id: "525", name: "Tentacool", game: "Pokémon Scarlet & Violet" },
    { id: "526", name: "Tentacruel", game: "Pokémon Scarlet & Violet" },
    { id: "527", name: "Horsea", game: "Pokémon Scarlet & Violet" },
    { id: "528", name: "Seadra", game: "Pokémon Scarlet & Violet" },
    { id: "529", name: "Kingdra", game: "Pokémon Scarlet & Violet" },
    { id: "335", name: "Bruxish", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "530", name: "Cottonee", game: "Pokémon Scarlet & Violet" },
    { id: "531", name: "Whimsicott", game: "Pokémon Scarlet & Violet" },
    { id: "532", name: "Comfey", game: "Pokémon Scarlet & Violet" },
    { id: "78", name: "Slakoth", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "79", name: "Vigoroth", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "80", name: "Slaking", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "533", name: "Oddish", game: "Pokémon Scarlet & Violet" },
    { id: "534", name: "Gloom", game: "Pokémon Scarlet & Violet" },
    { id: "535", name: "Vileplume", game: "Pokémon Scarlet & Violet" },
    { id: "536", name: "Bellossom", game: "Pokémon Scarlet & Violet" },
    { id: "148", name: "Diglett", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "149", name: "Dugtrio", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "194", name: "Grimer", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "195", name: "Muk", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "217", name: "Zangoose", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "218", name: "Seviper", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "118", name: "Crabrawler", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "119", name: "Crabominable", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "100", name: "Oricorio", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "324", name: "Slowpoke", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "325", name: "Slowbro", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "326", name: "Slowking", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "537", name: "Chinchou", game: "Pokémon Scarlet & Violet" },
    { id: "538", name: "Lanturn", game: "Pokémon Scarlet & Violet" },
    { id: "539", name: "Inkay", game: "Pokémon Scarlet & Violet" },
    { id: "540", name: "Malamar", game: "Pokémon Scarlet & Violet" },
    { id: "332", name: "Luvdisc", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "333", name: "Finneon", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "334", name: "Lumineon", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "336", name: "Alomomola", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "150", name: "Torkoal", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "19", name: "Fletchling", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "20", name: "Fletchinder", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "21", name: "Talonflame", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "541", name: "Dewpider", game: "Pokémon Scarlet & Violet" },
    { id: "542", name: "Araquanid", game: "Pokémon Scarlet & Violet" },
    { id: "543", name: "Tyrogue", game: "Pokémon Scarlet & Violet" },
    { id: "544", name: "Hitmonlee", game: "Pokémon Scarlet & Violet" },
    { id: "545", name: "Hitmonchan", game: "Pokémon Scarlet & Violet" },
    { id: "546", name: "Hitmontop", game: "Pokémon Scarlet & Violet" },
    { id: "445", name: "Geodude", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "446", name: "Graveler", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "447", name: "Golem", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "547", name: "Drilbur", game: "Pokémon Scarlet & Violet" },
    { id: "548", name: "Excadrill", game: "Pokémon Scarlet & Violet" },
    { id: "234", name: "Gothita", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "235", name: "Gothorita", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "236", name: "Gothitelle", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "549", name: "Espurr", game: "Pokémon Scarlet & Violet" },
    { id: "550", name: "Meowstic", game: "Pokémon Scarlet & Violet" },
    { id: "551", name: "Minior", game: "Pokémon Scarlet & Violet" },
    { id: "552", name: "Cranidos", game: "Pokémon Scarlet & Violet" },
    { id: "553", name: "Rampardos", game: "Pokémon Scarlet & Violet" },
    { id: "554", name: "Shieldon", game: "Pokémon Scarlet & Violet" },
    { id: "555", name: "Bastiodon", game: "Pokémon Scarlet & Violet" },
    { id: "556", name: "Minccino", game: "Pokémon Scarlet & Violet" },
    { id: "557", name: "Cinccino", game: "Pokémon Scarlet & Violet" },
    { id: "558", name: "Skarmory", game: "Pokémon Scarlet & Violet" },
    { id: "219", name: "Swablu", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "220", name: "Altaria", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "209", name: "Magnemite", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "210", name: "Magneton", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "211", name: "Magnezone", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "559", name: "Plusle", game: "Pokémon Scarlet & Violet" },
    { id: "560", name: "Minun", game: "Pokémon Scarlet & Violet" },
    { id: "561", name: "Scraggy", game: "Pokémon Scarlet & Violet" },
    { id: "562", name: "Scrafty", game: "Pokémon Scarlet & Violet" },
    { id: "563", name: "Golett", game: "Pokémon Scarlet & Violet" },
    { id: "564", name: "Golurk", game: "Pokémon Scarlet & Violet" },
    { id: "151", name: "Numel", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "152", name: "Camerupt", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "237", name: "Sinistea", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "238", name: "Polteageist", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "565", name: "Porygon", game: "Pokémon Scarlet & Violet" },
    { id: "566", name: "Porygon2", game: "Pokémon Scarlet & Violet" },
    { id: "567", name: "Porygon-Z", game: "Pokémon Scarlet & Violet" },
    { id: "568", name: "Joltik", game: "Pokémon Scarlet & Violet" },
    { id: "569", name: "Galvantula", game: "Pokémon Scarlet & Violet" },
    { id: "341", name: "Tynamo", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "342", name: "Eelektrik", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "343", name: "Eelektross", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "570", name: "Beldum", game: "Pokémon Scarlet & Violet" },
    { id: "571", name: "Metang", game: "Pokémon Scarlet & Violet" },
    { id: "572", name: "Metagross", game: "Pokémon Scarlet & Violet" },
    { id: "155", name: "Axew", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "156", name: "Fraxure", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "157", name: "Haxorus", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "573", name: "Seel", game: "Pokémon Scarlet & Violet" },
    { id: "574", name: "Dewgong", game: "Pokémon Scarlet & Violet" },
    { id: "575", name: "Lapras", game: "Pokémon Scarlet & Violet" },
    { id: "331", name: "Qwilfish", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "576", name: "Overqwil", game: "Pokémon Scarlet & Violet" },
    { id: "577", name: "Solosis", game: "Pokémon Scarlet & Violet" },
    { id: "578", name: "Duosion", game: "Pokémon Scarlet & Violet" },
    { id: "579", name: "Reuniclus", game: "Pokémon Scarlet & Violet" },
    { id: "580", name: "Snubbull", game: "Pokémon Scarlet & Violet" },
    { id: "581", name: "Granbull", game: "Pokémon Scarlet & Violet" },
    { id: "355", name: "Cubchoo", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "356", name: "Beartic", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "462", name: "Sandshrew", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "463", name: "Sandslash", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "425", name: "Vulpix", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "426", name: "Ninetales", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "352", name: "Snover", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "353", name: "Abomasnow", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "582", name: "Duraludon", game: "Pokémon Scarlet & Violet" },
    { id: "583", name: "Archaludon", game: "Pokémon Scarlet & Violet" },
    { id: "584", name: "Hydrapple", game: "Pokémon Scarlet & Violet" },
    { id: "585", name: "Bulbasaur", game: "Pokémon Scarlet & Violet" },
    { id: "586", name: "Ivysaur", game: "Pokémon Scarlet & Violet" },
    { id: "587", name: "Venusaur", game: "Pokémon Scarlet & Violet" },
    { id: "588", name: "Charmander", game: "Pokémon Scarlet & Violet" },
    { id: "589", name: "Charmeleon", game: "Pokémon Scarlet & Violet" },
    { id: "590", name: "Charizard", game: "Pokémon Scarlet & Violet" },
    { id: "591", name: "Squirtle", game: "Pokémon Scarlet & Violet" },
    { id: "592", name: "Wartortle", game: "Pokémon Scarlet & Violet" },
    { id: "593", name: "Blastoise", game: "Pokémon Scarlet & Violet" },
    { id: "594", name: "Chikorita", game: "Pokémon Scarlet & Violet" },
    { id: "595", name: "Bayleef", game: "Pokémon Scarlet & Violet" },
    { id: "596", name: "Meganium", game: "Pokémon Scarlet & Violet" },
    { id: "597", name: "Cyndaquil", game: "Pokémon Scarlet & Violet" },
    { id: "598", name: "Quilava", game: "Pokémon Scarlet & Violet" },
    { id: "599", name: "Typhlosion", game: "Pokémon Scarlet & Violet" },
    { id: "600", name: "Totodile", game: "Pokémon Scarlet & Violet" },
    { id: "601", name: "Croconaw", game: "Pokémon Scarlet & Violet" },
    { id: "602", name: "Feraligatr", game: "Pokémon Scarlet & Violet" },
    { id: "603", name: "Treecko", game: "Pokémon Scarlet & Violet" },
    { id: "604", name: "Grovyle", game: "Pokémon Scarlet & Violet" },
    { id: "605", name: "Sceptile", game: "Pokémon Scarlet & Violet" },
    { id: "606", name: "Torchic", game: "Pokémon Scarlet & Violet" },
    { id: "607", name: "Combusken", game: "Pokémon Scarlet & Violet" },
    { id: "608", name: "Blaziken", game: "Pokémon Scarlet & Violet" },
    { id: "609", name: "Mudkip", game: "Pokémon Scarlet & Violet" },
    { id: "610", name: "Marshtomp", game: "Pokémon Scarlet & Violet" },
    { id: "611", name: "Swampert", game: "Pokémon Scarlet & Violet" },
    { id: "612", name: "Turtwig", game: "Pokémon Scarlet & Violet" },
    { id: "613", name: "Grotle", game: "Pokémon Scarlet & Violet" },
    { id: "614", name: "Torterra", game: "Pokémon Scarlet & Violet" },
    { id: "615", name: "Chimchar", game: "Pokémon Scarlet & Violet" },
    { id: "616", name: "Monferno", game: "Pokémon Scarlet & Violet" },
    { id: "617", name: "Infernape", game: "Pokémon Scarlet & Violet" },
    { id: "618", name: "Piplup", game: "Pokémon Scarlet & Violet" },
    { id: "619", name: "Prinplup", game: "Pokémon Scarlet & Violet" },
    { id: "620", name: "Empoleon", game: "Pokémon Scarlet & Violet" },
    { id: "621", name: "Snivy", game: "Pokémon Scarlet & Violet" },
    { id: "622", name: "Servine", game: "Pokémon Scarlet & Violet" },
    { id: "623", name: "Serperior", game: "Pokémon Scarlet & Violet" },
    { id: "624", name: "Tepig", game: "Pokémon Scarlet & Violet" },
    { id: "625", name: "Pignite", game: "Pokémon Scarlet & Violet" },
    { id: "626", name: "Emboar", game: "Pokémon Scarlet & Violet" },
    { id: "627", name: "Oshawott", game: "Pokémon Scarlet & Violet" },
    { id: "628", name: "Dewott", game: "Pokémon Scarlet & Violet" },
    { id: "629", name: "Samurott", game: "Pokémon Scarlet & Violet" },
    { id: "630", name: "Chespin", game: "Pokémon Scarlet & Violet" },
    { id: "631", name: "Quilladin", game: "Pokémon Scarlet & Violet" },
    { id: "632", name: "Chesnaught", game: "Pokémon Scarlet & Violet" },
    { id: "633", name: "Fennekin", game: "Pokémon Scarlet & Violet" },
    { id: "634", name: "Braixen", game: "Pokémon Scarlet & Violet" },
    { id: "635", name: "Delphox", game: "Pokémon Scarlet & Violet" },
    { id: "636", name: "Froakie", game: "Pokémon Scarlet & Violet" },
    { id: "637", name: "Frogadier", game: "Pokémon Scarlet & Violet" },
    { id: "638", name: "Greninja", game: "Pokémon Scarlet & Violet" },
    { id: "639", name: "Rowlet", game: "Pokémon Scarlet & Violet" },
    { id: "640", name: "Dartrix", game: "Pokémon Scarlet & Violet" },
    { id: "641", name: "Decidueye", game: "Pokémon Scarlet & Violet" },
    { id: "642", name: "Litten", game: "Pokémon Scarlet & Violet" },
    { id: "643", name: "Torracat", game: "Pokémon Scarlet & Violet" },
    { id: "644", name: "Incineroar", game: "Pokémon Scarlet & Violet" },
    { id: "645", name: "Popplio", game: "Pokémon Scarlet & Violet" },
    { id: "646", name: "Brionne", game: "Pokémon Scarlet & Violet" },
    { id: "647", name: "Primarina", game: "Pokémon Scarlet & Violet" },
    { id: "648", name: "Grookey", game: "Pokémon Scarlet & Violet" },
    { id: "649", name: "Thwackey", game: "Pokémon Scarlet & Violet" },
    { id: "650", name: "Rillaboom", game: "Pokémon Scarlet & Violet" },
    { id: "651", name: "Scorbunny", game: "Pokémon Scarlet & Violet" },
    { id: "652", name: "Raboot", game: "Pokémon Scarlet & Violet" },
    { id: "653", name: "Cinderace", game: "Pokémon Scarlet & Violet" },
    { id: "654", name: "Sobble", game: "Pokémon Scarlet & Violet" },
    { id: "655", name: "Drizzile", game: "Pokémon Scarlet & Violet" },
    { id: "656", name: "Inteleon", game: "Pokémon Scarlet & Violet" },
    { id: "657", name: "Gouging Fire", game: "Pokémon Scarlet & Violet" },
    { id: "658", name: "Raging Bolt", game: "Pokémon Scarlet & Violet" },
    { id: "659", name: "Iron Crown", game: "Pokémon Scarlet & Violet" },
    { id: "660", name: "Iron Boulder", game: "Pokémon Scarlet & Violet" },
    { id: "661", name: "Terapagos", game: "Pokémon Scarlet & Violet" },
    { id: "662", name: "Walking Wake", game: "Pokémon Scarlet & Violet" },
    { id: "663", name: "Iron Leaves", game: "Pokémon Scarlet & Violet" },
    { id: "664", name: "Pecharunt", game: "Pokémon Scarlet & Violet" }
];

export default svIdData;