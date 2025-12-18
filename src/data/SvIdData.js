const svIdPokemon = [
    { id: "601", name: "Doduo", game: "Pokémon Scarlet & Violet" },
    { id: "602", name: "Dodrio", game: "Pokémon Scarlet & Violet" },
    { id: "603", name: "Exeggcute", game: "Pokémon Scarlet & Violet" },
    { id: "604", name: "Exeggutor", game: "Pokémon Scarlet & Violet" },
    { id: "605", name: "Rhyhorn", game: "Pokémon Scarlet & Violet" },
    { id: "606", name: "Rhydon", game: "Pokémon Scarlet & Violet" },
    { id: "607", name: "Rhyperior", game: "Pokémon Scarlet & Violet" },
    { id: "256", name: "Venonat", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "257", name: "Venomoth", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "608", name: "Elekid", game: "Pokémon Scarlet & Violet" },
    { id: "609", name: "Electabuzz", game: "Pokémon Scarlet & Violet" },
    { id: "610", name: "Electivire", game: "Pokémon Scarlet & Violet" },
    { id: "611", name: "Magby", game: "Pokémon Scarlet & Violet" },
    { id: "612", name: "Magmar", game: "Pokémon Scarlet & Violet" },
    { id: "613", name: "Magmortar", game: "Pokémon Scarlet & Violet" },
    { id: "43", name: "Happiny", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "44", name: "Chansey", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "45", name: "Blissey", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "260", name: "Scyther", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "261", name: "Scizor", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "614", name: "Kleavor", game: "Pokémon Scarlet & Violet" },
    { id: "223", name: "Tauros", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "615", name: "Blitzle", game: "Pokémon Scarlet & Violet" },
    { id: "616", name: "Zebstrika", game: "Pokémon Scarlet & Violet" },
    { id: "192", name: "Girafarig", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "193", name: "Farigiraf", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "267", name: "Sandile", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "268", name: "Krokorok", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "269", name: "Krookodile", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "254", name: "Rellor", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "255", name: "Rabsca", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "365", name: "Rufflet", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "366", name: "Braviary", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "127", name: "Vullaby", game: "Pokémon Scarlet & Violet" },   // Base Game ID (uit jouw svPokemon lijst)
    { id: "128", name: "Mandibuzz", game: "Pokémon Scarlet & Violet" }, // Base Game ID (uit jouw svPokemon lijst)
    { id: "224", name: "Litleo", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "225", name: "Pyroar", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "190", name: "Deerling", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "191", name: "Sawsbuck", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "617", name: "Smeargle", game: "Pokémon Scarlet & Violet" },
    { id: "310", name: "Rotom", game: "Pokémon Scarlet & Violet" },     // Base Game ID
    { id: "618", name: "Milcery", game: "Pokémon Scarlet & Violet" },
    { id: "619", name: "Alcremie", game: "Pokémon Scarlet & Violet" },
    { id: "620", name: "Trapinch", game: "Pokémon Scarlet & Violet" },
    { id: "621", name: "Vibrava", game: "Pokémon Scarlet & Violet" },
    { id: "622", name: "Flygon", game: "Pokémon Scarlet & Violet" },
    { id: "623", name: "Pikipek", game: "Pokémon Scarlet & Violet" },
    { id: "624", name: "Trumbeak", game: "Pokémon Scarlet & Violet" },
    { id: "625", name: "Toucannon", game: "Pokémon Scarlet & Violet" },
    { id: "626", name: "Tentacool", game: "Pokémon Scarlet & Violet" },
    { id: "627", name: "Tentacruel", game: "Pokémon Scarlet & Violet" },
    { id: "628", name: "Horsea", game: "Pokémon Scarlet & Violet" },
    { id: "629", name: "Seadra", game: "Pokémon Scarlet & Violet" },
    { id: "630", name: "Kingdra", game: "Pokémon Scarlet & Violet" },
    { id: "335", name: "Bruxish", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "631", name: "Cottonee", game: "Pokémon Scarlet & Violet" },
    { id: "632", name: "Whimsicott", game: "Pokémon Scarlet & Violet" },
    { id: "633", name: "Comfey", game: "Pokémon Scarlet & Violet" },
    { id: "78", name: "Slakoth", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "79", name: "Vigoroth", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "80", name: "Slaking", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "634", name: "Oddish", game: "Pokémon Scarlet & Violet" },
    { id: "635", name: "Gloom", game: "Pokémon Scarlet & Violet" },
    { id: "636", name: "Vileplume", game: "Pokémon Scarlet & Violet" },
    { id: "637", name: "Bellossom", game: "Pokémon Scarlet & Violet" },
    { id: "148", name: "Diglett", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "149", name: "Dugtrio", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "194", name: "Grimer", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "195", name: "Muk", game: "Pokémon Scarlet & Violet" },       // Base Game ID
    { id: "217", name: "Zangoose", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "218", name: "Seviper", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "118", name: "Crabrawler", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "119", name: "Crabominable", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "100", name: "Oricorio", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "324", name: "Slowpoke", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "325", name: "Slowbro", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "326", name: "Slowking", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "638", name: "Chinchou", game: "Pokémon Scarlet & Violet" },
    { id: "639", name: "Lanturn", game: "Pokémon Scarlet & Violet" },
    { id: "640", name: "Inkay", game: "Pokémon Scarlet & Violet" },
    { id: "641", name: "Malamar", game: "Pokémon Scarlet & Violet" },
    { id: "332", name: "Luvdisc", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "333", name: "Finneon", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "334", name: "Lumineon", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "336", name: "Alomomola", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "150", name: "Torkoal", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "19", name: "Fletchling", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "20", name: "Fletchinder", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "21", name: "Talonflame", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "642", name: "Dewpider", game: "Pokémon Scarlet & Violet" },
    { id: "643", name: "Araquanid", game: "Pokémon Scarlet & Violet" },
    { id: "644", name: "Tyrogue", game: "Pokémon Scarlet & Violet" },
    { id: "645", name: "Hitmonlee", game: "Pokémon Scarlet & Violet" },
    { id: "646", name: "Hitmonchan", game: "Pokémon Scarlet & Violet" },
    { id: "647", name: "Hitmontop", game: "Pokémon Scarlet & Violet" },
    { id: "445", name: "Geodude", game: "Pokémon Scarlet & Violet" },    // Teal Mask ID
    { id: "446", name: "Graveler", game: "Pokémon Scarlet & Violet" },   // Teal Mask ID
    { id: "447", name: "Golem", game: "Pokémon Scarlet & Violet" },      // Teal Mask ID
    { id: "648", name: "Drilbur", game: "Pokémon Scarlet & Violet" },
    { id: "649", name: "Excadrill", game: "Pokémon Scarlet & Violet" },
    { id: "234", name: "Gothita", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "235", name: "Gothorita", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "236", name: "Gothitelle", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "650", name: "Espurr", game: "Pokémon Scarlet & Violet" },
    { id: "651", name: "Meowstic", game: "Pokémon Scarlet & Violet" },
    { id: "652", name: "Minior", game: "Pokémon Scarlet & Violet" },
    { id: "653", name: "Cranidos", game: "Pokémon Scarlet & Violet" },
    { id: "654", name: "Rampardos", game: "Pokémon Scarlet & Violet" },
    { id: "655", name: "Shieldon", game: "Pokémon Scarlet & Violet" },
    { id: "656", name: "Bastiodon", game: "Pokémon Scarlet & Violet" },
    { id: "657", name: "Minccino", game: "Pokémon Scarlet & Violet" },
    { id: "658", name: "Cinccino", game: "Pokémon Scarlet & Violet" },
    { id: "659", name: "Skarmory", game: "Pokémon Scarlet & Violet" },
    { id: "219", name: "Swablu", game: "Pokémon Scarlet & Violet" },     // Base Game ID
    { id: "220", name: "Altaria", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "209", name: "Magnemite", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "210", name: "Magneton", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "211", name: "Magnezone", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "660", name: "Plusle", game: "Pokémon Scarlet & Violet" },
    { id: "661", name: "Minun", game: "Pokémon Scarlet & Violet" },
    { id: "662", name: "Scraggy", game: "Pokémon Scarlet & Violet" },
    { id: "663", name: "Scrafty", game: "Pokémon Scarlet & Violet" },
    { id: "664", name: "Golett", game: "Pokémon Scarlet & Violet" },
    { id: "665", name: "Golurk", game: "Pokémon Scarlet & Violet" },
    { id: "151", name: "Numel", game: "Pokémon Scarlet & Violet" },     // Base Game ID
    { id: "152", name: "Camerupt", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "237", name: "Sinistea", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "238", name: "Polteageist", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "666", name: "Porygon", game: "Pokémon Scarlet & Violet" },
    { id: "667", name: "Porygon2", game: "Pokémon Scarlet & Violet" },
    { id: "668", name: "Porygon-Z", game: "Pokémon Scarlet & Violet" },
    { id: "669", name: "Joltik", game: "Pokémon Scarlet & Violet" },
    { id: "670", name: "Galvantula", game: "Pokémon Scarlet & Violet" },
    { id: "341", name: "Tynamo", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "342", name: "Eelektrik", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "343", name: "Eelektross", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "671", name: "Beldum", game: "Pokémon Scarlet & Violet" },
    { id: "672", name: "Metang", game: "Pokémon Scarlet & Violet" },
    { id: "673", name: "Metagross", game: "Pokémon Scarlet & Violet" },
    { id: "155", name: "Axew", game: "Pokémon Scarlet & Violet" },      // Base Game ID
    { id: "156", name: "Fraxure", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "157", name: "Haxorus", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "674", name: "Seel", game: "Pokémon Scarlet & Violet" },
    { id: "675", name: "Dewgong", game: "Pokémon Scarlet & Violet" },
    { id: "676", name: "Lapras", game: "Pokémon Scarlet & Violet" },
    { id: "331", name: "Qwilfish", game: "Pokémon Scarlet & Violet" },  // Base Game ID
    { id: "677", name: "Overqwil", game: "Pokémon Scarlet & Violet" },
    { id: "678", name: "Solosis", game: "Pokémon Scarlet & Violet" },
    { id: "679", name: "Duosion", game: "Pokémon Scarlet & Violet" },
    { id: "680", name: "Reuniclus", game: "Pokémon Scarlet & Violet" },
    { id: "681", name: "Snubbull", game: "Pokémon Scarlet & Violet" },
    { id: "682", name: "Granbull", game: "Pokémon Scarlet & Violet" },
    { id: "355", name: "Cubchoo", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "356", name: "Beartic", game: "Pokémon Scarlet & Violet" },   // Base Game ID
    { id: "462", name: "Sandshrew", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "463", name: "Sandslash", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "425", name: "Vulpix", game: "Pokémon Scarlet & Violet" },    // Teal Mask ID
    { id: "426", name: "Ninetales", game: "Pokémon Scarlet & Violet" }, // Teal Mask ID
    { id: "352", name: "Snover", game: "Pokémon Scarlet & Violet" },    // Base Game ID
    { id: "353", name: "Abomasnow", game: "Pokémon Scarlet & Violet" }, // Base Game ID
    { id: "683", name: "Duraludon", game: "Pokémon Scarlet & Violet" },
    { id: "684", name: "Archaludon", game: "Pokémon Scarlet & Violet" },
    { id: "685", name: "Hydrapple", game: "Pokémon Scarlet & Violet" },
    { id: "686", name: "Bulbasaur", game: "Pokémon Scarlet & Violet" },
    { id: "687", name: "Ivysaur", game: "Pokémon Scarlet & Violet" },
    { id: "688", name: "Venusaur", game: "Pokémon Scarlet & Violet" },
    { id: "689", name: "Charmander", game: "Pokémon Scarlet & Violet" },
    { id: "690", name: "Charmeleon", game: "Pokémon Scarlet & Violet" },
    { id: "691", name: "Charizard", game: "Pokémon Scarlet & Violet" },
    { id: "692", name: "Squirtle", game: "Pokémon Scarlet & Violet" },
    { id: "693", name: "Wartortle", game: "Pokémon Scarlet & Violet" },
    { id: "694", name: "Blastoise", game: "Pokémon Scarlet & Violet" },
    { id: "695", name: "Chikorita", game: "Pokémon Scarlet & Violet" },
    { id: "696", name: "Bayleef", game: "Pokémon Scarlet & Violet" },
    { id: "697", name: "Meganium", game: "Pokémon Scarlet & Violet" },
    { id: "698", name: "Cyndaquil", game: "Pokémon Scarlet & Violet" },
    { id: "699", name: "Quilava", game: "Pokémon Scarlet & Violet" },
    { id: "700", name: "Typhlosion", game: "Pokémon Scarlet & Violet" },
    { id: "701", name: "Totodile", game: "Pokémon Scarlet & Violet" },
    { id: "702", name: "Croconaw", game: "Pokémon Scarlet & Violet" },
    { id: "703", name: "Feraligatr", game: "Pokémon Scarlet & Violet" },
    { id: "704", name: "Treecko", game: "Pokémon Scarlet & Violet" },
    { id: "705", name: "Grovyle", game: "Pokémon Scarlet & Violet" },
    { id: "706", name: "Sceptile", game: "Pokémon Scarlet & Violet" },
    { id: "707", name: "Torchic", game: "Pokémon Scarlet & Violet" },
    { id: "708", name: "Combusken", game: "Pokémon Scarlet & Violet" },
    { id: "709", name: "Blaziken", game: "Pokémon Scarlet & Violet" },
    { id: "710", name: "Mudkip", game: "Pokémon Scarlet & Violet" },
    { id: "711", name: "Marshtomp", game: "Pokémon Scarlet & Violet" },
    { id: "712", name: "Swampert", game: "Pokémon Scarlet & Violet" },
    { id: "713", name: "Turtwig", game: "Pokémon Scarlet & Violet" },
    { id: "714", name: "Grotle", game: "Pokémon Scarlet & Violet" },
    { id: "715", name: "Torterra", game: "Pokémon Scarlet & Violet" },
    { id: "716", name: "Chimchar", game: "Pokémon Scarlet & Violet" },
    { id: "717", name: "Monferno", game: "Pokémon Scarlet & Violet" },
    { id: "718", name: "Infernape", game: "Pokémon Scarlet & Violet" },
    { id: "719", name: "Piplup", game: "Pokémon Scarlet & Violet" },
    { id: "720", name: "Prinplup", game: "Pokémon Scarlet & Violet" },
    { id: "721", name: "Empoleon", game: "Pokémon Scarlet & Violet" },
    { id: "722", name: "Snivy", game: "Pokémon Scarlet & Violet" },
    { id: "723", name: "Servine", game: "Pokémon Scarlet & Violet" },
    { id: "724", name: "Serperior", game: "Pokémon Scarlet & Violet" },
    { id: "725", name: "Tepig", game: "Pokémon Scarlet & Violet" },
    { id: "726", name: "Pignite", game: "Pokémon Scarlet & Violet" },
    { id: "727", name: "Emboar", game: "Pokémon Scarlet & Violet" },
    { id: "728", name: "Oshawott", game: "Pokémon Scarlet & Violet" },
    { id: "729", name: "Dewott", game: "Pokémon Scarlet & Violet" },
    { id: "730", name: "Samurott", game: "Pokémon Scarlet & Violet" },
    { id: "731", name: "Chespin", game: "Pokémon Scarlet & Violet" },
    { id: "732", name: "Quilladin", game: "Pokémon Scarlet & Violet" },
    { id: "733", name: "Chesnaught", game: "Pokémon Scarlet & Violet" },
    { id: "734", name: "Fennekin", game: "Pokémon Scarlet & Violet" },
    { id: "735", name: "Braixen", game: "Pokémon Scarlet & Violet" },
    { id: "736", name: "Delphox", game: "Pokémon Scarlet & Violet" },
    { id: "737", name: "Froakie", game: "Pokémon Scarlet & Violet" },
    { id: "738", name: "Frogadier", game: "Pokémon Scarlet & Violet" },
    { id: "739", name: "Greninja", game: "Pokémon Scarlet & Violet" },
    { id: "740", name: "Rowlet", game: "Pokémon Scarlet & Violet" },
    { id: "741", name: "Dartrix", game: "Pokémon Scarlet & Violet" },
    { id: "742", name: "Decidueye", game: "Pokémon Scarlet & Violet" },
    { id: "743", name: "Litten", game: "Pokémon Scarlet & Violet" },
    { id: "744", name: "Torracat", game: "Pokémon Scarlet & Violet" },
    { id: "745", name: "Incineroar", game: "Pokémon Scarlet & Violet" },
    { id: "746", name: "Popplio", game: "Pokémon Scarlet & Violet" },
    { id: "747", name: "Brionne", game: "Pokémon Scarlet & Violet" },
    { id: "748", name: "Primarina", game: "Pokémon Scarlet & Violet" },
    { id: "749", name: "Grookey", game: "Pokémon Scarlet & Violet" },
    { id: "750", name: "Thwackey", game: "Pokémon Scarlet & Violet" },
    { id: "751", name: "Rillaboom", game: "Pokémon Scarlet & Violet" },
    { id: "752", name: "Scorbunny", game: "Pokémon Scarlet & Violet" },
    { id: "753", name: "Raboot", game: "Pokémon Scarlet & Violet" },
    { id: "754", name: "Cinderace", game: "Pokémon Scarlet & Violet" },
    { id: "755", name: "Sobble", game: "Pokémon Scarlet & Violet" },
    { id: "756", name: "Drizzile", game: "Pokémon Scarlet & Violet" },
    { id: "757", name: "Inteleon", game: "Pokémon Scarlet & Violet" },
    { id: "758", name: "Gouging Fire", game: "Pokémon Scarlet & Violet" },
    { id: "759", name: "Raging Bolt", game: "Pokémon Scarlet & Violet" },
    { id: "760", name: "Iron Crown", game: "Pokémon Scarlet & Violet" },
    { id: "761", name: "Iron Boulder", game: "Pokémon Scarlet & Violet" },
    { id: "762", name: "Terapagos", game: "Pokémon Scarlet & Violet" },
    { id: "763", name: "Walking Wake", game: "Pokémon Scarlet & Violet" },
    { id: "764", name: "Iron Leaves", game: "Pokémon Scarlet & Violet" },
    { id: "765", name: "Pecharunt", game: "Pokémon Scarlet & Violet" }
];

export default svIdPokemon;