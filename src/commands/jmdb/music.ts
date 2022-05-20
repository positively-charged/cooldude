// This table contains the music used by the projects.
// ==========================================================================

interface Table {
   [ id: string ]: {
      game?: string|null,  // What game the music game from?
      level?: string|null, // What level from the game the music came from?
      title?: string|null,
      artist?: string|null,
      youtube?: string|null, // ID of a YouTube video of the music.
      link?: string|null, // Download link.
   };
}

export default <Table> {

   // Jumpmaze
   // -----------------------------------------------------------------------
   
   musmap01: {
      game: 'Doom',
      level: 'Hangar (E1M1)',
      title: null,
      artist: null,
      youtube: null,
      link: null,
   },
   musmap02: {
      game: 'Doom',
      level: 'Command Center (E1M4)',
   },
   musmap03: {
      title: 'Ken\'s Theme',
      game: 'Street Fighter II',
   },
   musmap04: {
      title: 'Magnetic Fields, Pt. 2 (MIDI)',
      artist: 'Jean-Michel Jarre',
   },
   musmap05: {
      title: 'Opened the Door (MIDI)',
      artist: 'Journey',
   },
   musmap06: {
      game: 'TNT: Evilution',
      level: 'System Control (MAP01)',
   },
   musmap07: {
      game: 'Doom 2',
      level: 'The Spirit World (MAP28)',
   },
   musmap08: {
      title: 'Arcterra Theme #2',
      game: 'Metroid Prime: Hunters',
      youtube: 'uoBWRAx-S1c',
   },
   musmap09: {
      title: 'Boss Battle 2 (MIDI)',
      artist: 'Sequenced by Ashura Demon, ' +
         'composed by Koji Kondo & Hajime Wakai',
      game: 'Star Fox 64',
   },
   musmap10: {
      title: 'I\'m Blue',
      artist: 'Eiffel 65',
      youtube: '68ugkg9RePc',
   },
   musmap11: {
      game: 'Sonic Heroes',
      level: 'Rail Canyon',
   },
   musmap12: {
      game: 'Alien Vendetta',
      level: 'Toxic Touch (MAP10)',
   },
   musmap13: {
      title: 'Technownage',
      artist: 'James Paddock',
   },
   musmap14: {
      title: 'Nuts & Bolts',
      game: 'Donkey Kong Country 3',
   },
   musmap15: {
      title: 'The Night Begins',
      game: 'Resident Evil',
   },
   musmap16: {
      game: 'PSX Doom',
      level: 'Refinery (MAP11)',
      artist: 'Aubrey Hodges',
   },
   musmap17: {
      game: 'PSX Doom',
      level: 'Mount Erebus (MAP21)',
      artist: 'Aubrey Hodges',
   },
   musmap18: {
      game: 'Castlevania: Dracula X',
      level: 'Bloodlines (Stage 1)',
   },
   musmap19: {
      game: 'Mega Man 2',
      level: 'Dr. Wily\'s Castle',
   },
   musmap20: {
      title: 'Year of the New Moon',
      artist: 'wyldfyre1',
   },
   musmap21: {
      game: 'Donkey Kong Country 2',
      level: 'Toxic Tower',
   },
   musmap22: {
      game: 'Gundam Wing: Endless Duel',
      title: 'Death Scythe',
      link: 'https://www.vgmusic.com/music/console/nintendo/snes/GWscythe.mid',
   },
   musmap23: {
      game: 'Final Fantasy VII',
      title: 'Makou Reactor',
   },
   musmap24: {
      game: 'Metroid Prime',
      level: 'Phendrana Drifts',
   },
   musmap25: {
      game: 'Rise Of The Triads',
      title: 'Mist Ache',
      artist: 'Lee Jackson',
   },
   musmap26: {
      game: 'Megaman X7',
      title: 'Our Blood Boils (vs Sigma 1st)',
   },
   musmap27: {
      title: 'Exquisite',
      artist: 'The Solid Energy Crew',
   },
   // Unknown.
   musmap28: {
   },
   musmap29: {
      game: 'Sonic 3D Blast',
      level: 'Volcano Valley Zone Act 2',
   },
   // Unknown.
   musmap30: {
   },
   musmap31: {
      game: 'Jazz Jackrabbit 2',
      title: 'Dark Groove',
   },
   musmap32track1: {
      game: 'Megaman X7',
      title: 'Intro Stage 2',
   },
   musmap32track2: {
      title: 'Leeroy Jenkins (Fun Times Mix)',
      artist: 'Funtastic Power!',
   },

   // Jumpmaze 2
   // -----------------------------------------------------------------------

   musmap00: {
      game: 'Perfect Dark',
      level: 'Carrington Institute',
   },
   musmap33: {
      title: 'UNATCO',
      game: 'Deus Ex',
   },
   musmap34: {
      title: 'Primal Rave',
      artist: 'David Wise',
      game: 'Donkey Kong Country 2',
   },
   musmap35: {
      title: 'Futureal (MIDI)',
      artist: 'Iron Maiden',
   },
   musmap36: {
      game: 'Goldeneye 64',
      level: 'Caverns and Silo Detonation Imminent',
   },
   musmap37: {
      game: 'Battletoads in Battlemaniacs',
      level: 'Hollow Tree',
   },
   musmap38: {
      game: 'Mario Kart 64',
      level: 'Luigi Raceway',
   },
   musmap39: {
      artist: 'Simon "SlayeR" Judd',
      game: 'Hellcore 2',
      level: 'Credits (MAP12)',
   },
   musmap40: {
      game: 'F-Zero GX',
      level: 'Red Canyon',
   },
   musmap41: {
      title: 'Blank Page',
      artist: '4-Mat',
   },
   musmap42: {
      game: 'Doom',
      level: 'Halls of the Damned (E2M6)',
   },
   musmap43: {
      game: 'Jazz Jackrabbit',
      level: 'World 2-1, Lenti',
   },
   musmap44: {
      title: 'The Dance of the Spheres',
      artist: 'David M. Karlsson',
   },
   musmap45: {
      title: 'The Beauty and the Beast',
      artist: 'Nightwish',
   },
   musmap46: {
      level: 'Dead Simple (MAP07)',
      game: 'Doom 2',
   },
   musmap47: {
      level: 'Command Center (E2M5)',
      game: 'Doom',
   },
   musmap48: {
      level: 'Deimos Lab (E2M4)',
      game: 'Doom',
   },
   musmap49: {
      title: 'Kill Ratio',
      artist: 'Sonic Mayhem',
      game: 'Quake II',
   },
   musmap50: {
      title: 'How\'d I do?',
      artist: 'Lee Jackson',
      game: 'Rise Of The Triads',
      level: 'Intermission',
   },
   musmap51: {
      game: 'F-Zero (SNES)',
      level: 'Silence',
   },
   musmap52: {
      title: 'The Great River Race',
      artist: 'Bjorn Lynne',
   },
   musmap53: {
      title: 'Become the Hunted',
      artist: 'James Paddock',
      game: 'Plutonia 2',
      level: 'MAP11',
   },
   musmap54: {
      game: 'Super Mario RPG',
      level: 'Factory',
   },
   musmap55: {
      title: 'Zombie Chase',
      artist: 'Bjorn Lynne',
   },
   musmap56: {
      title: 'Crocodile Cacophony',
      artist: 'David Wise',
      game: 'Donkey Kong Country 2',
   },
   musmap57: {
      title: 'Out of Phase',
      artist: 'David Wise',
      game: 'Parasite Eve',
      youtube: 'xnyOyiA7gbc',
   },
   musmap58: {
      title: 'Big Boss Blues',
      artist: 'Eveline Fischer',
      game: 'Donkey Kong Country 3',
   },
   musmap59: {
      title: 'Transylvania (MIDI)',
      artist: 'Iron Maiden',
   },
   musmap60: {
      title: 'Winding Roads',
      artist: 'Bjorn Lynne',
   },
   musmap61: {
      title: 'Lightning',
      artist: 'Jay Reichard',
      game: 'F-Zero: GP Legend',
   },
   musmap62: {
      game: 'Donkey Kong Country 2',
      level: 'Wasp Hive',
   },
   musmap63: {
      game: 'wolfen.wad (Hexen mod)',
      level: 'Oes Bog (MAP03)',
   },
   musmap64track1: {
      game: 'Donkey Kong Country',
      level: 'Misty Menace',
   },
   musmap64track2: {
      game: 'Mario 64',
      level: 'Final Bowser Music',
   },
   musmap64track3: {
      game: 'Mario 64',
      level: 'Credits Music',
   },
   musrject01: {
      game: 'Resident Evil',
   },
   musrject02track1: {
      game: 'Killer Instinct',
      level: 'Glacius',
   },
   musrject02track2: {
      title: 'Fanfare 1 (AKA Lucca\'s Theme)',
      game: 'Chrono Trigger',
   },
   musrject03: {
      game: 'Descent I',
      level: 'Level 3',
   },
   musrject04track1: {
      game: 'Sonic 3 & Knuckles',
      level: 'Flying Battery Zone Act 1',
   },
   musrject04track2: {
      game: 'Sonic the Hedgehog',
      level: 'Scrap Brain Zone',
   },
   musrject04track3: {
      game: 'Sonic 3D Blast',
      level: 'Panic Puppet Zone Act 2',
   },
   musrject05: {
      title: 'Title Theme',
      game: 'Perfect Cherry Blossom',
      youtube: 'R5PU-Z986Y0',
   },
   musrject06track1: {
      title: 'Battle With Seymour (Black Mages Remix)',
      artist: 'Uematsu Nobuo',
      game: 'Final Fantasy X',
   },
   musrject06track2: {
      title: 'Tai ma Gekisen (Fairy Tail soundtrack II)',
      artist: 'Takanashi Yasuharu',
   },
   musrject07: {
      title: 'Destiny',
      game: 'Megaman ZX Advent',
   },
   musdrag: {
      game: 'F-Zero X',
      level: 'Silence',
   },
   musfloorlav: {
      title: 'The Healer Stalks',
      artist: 'Bobby Prince',
   },
   // musgrav: same as musrject03.

   // Jumpix
   // -----------------------------------------------------------------------

   musjpx01: {
      game: 'Skulltag',
      title: 'DM Lose Intermission',
   },
   musjpx02: {
      game: 'Killer Instinct',
      title: 'Orchid Theme',
   },
   musjpx03: {
      game: 'Plutonia 2',
      level: 'Arch-Violence (MAP11)',
   },
   musjpx04: {
      game: 'Rock n\' Roll Racing',
      title: 'Born To Be Wild',
   },
   musjpx05: {
      title: 'The Night (MIDI/MP3)',
      artist: 'Disturbed',
   },
   musjpx06: {
      game: 'Doom',
      level: 'Deimos Anomaly (E2M1)',
   },
   musjpx07: {
      game: 'Super Smash Bros. Brawl',
      title: 'Bramble Blast',
   },
   musjpx08: {
      game: 'Doom 2',
      level: 'Gotcha! (MAP20)',
   },
   musjpx09: {
      game: 'Star Fox',
      title: 'Corneria',
   },
   musjpx10track1: {
      game: 'Halo: Combat Evolved',
      title: 'Perilous Journey',
   },
   musjpx10track2: {
      title: 'Benny Hill Theme',
   },
   musjpx11: {
      game: 'Doom',
   },
   musjpx12: {
      game: 'Hexen',
      level: 'Seven Portals',
   },
   musjpx13: {
      game: 'Rise of the Triad',
      title: 'Havana Smooth (Enhanced) MIDI',
   },
   musjpx14: {
      game: 'Donkey Kong Country 2',
      title: 'Lava Theme',
   },
   musjpx15: {
      game: 'Doom 2',
      level: 'Grosse (MAP32)',
   },
   musjpx16: {
      game: 'F-Zero',
      level: 'Fire Field',
   },
   musjpx17: {
      game: 'Duke Nukem 3D',
      level: 'Hollywood Holocaust',
   },
   musjpx18: {
      game: 'Doom',
      level: 'Containment Area (E2M2)',
   },
   musjpx19: {
      game: 'Heretic',
      level: 'D\'Sparil\'s Keep (E3M8)',
   },
   musjpx20: {
      game: 'TNT: Evilution',
      level: 'Human BBQ (MAP02)',
   },
   musjpx21: {
      game: 'Doom',
      level: 'Phobos Anomaly (E1M8)',
   },
   musjpx22: {
      game: 'TNT: Evilution',
      level: 'Habitat (MAP22)',
   },
   musjpx23: {
      game: 'Warcraft 3: Frozen Throne',
      title: 'Human Expansion Theme',
   },
   musjpx24: {
      title: 'Ricochet Love',
      artist: 'Waterflame',
   },
   musjpx25: {
      game: 'Quake II',
      title: 'Crashed Up Again',
      artist: 'Sonic Mayhem',
   },
   musjpx26: {
      game: 'Doom 2',
      level: 'Monster Condo (Map27)',
   },
   musjpx27: {
      game: 'Quake II',
      title: 'Big Gun',
      artist: 'Sonic Mayhem',
   },
   musjpx28: {
      title: 'Infected Lab',
      artist: 'DJ Carbunk1e',
   },
   musjpx29: {
      game: 'Rock n\' Roll Racing',
   },
   musjpx30track1: {
      game: 'MDK',
      title: 'Bounty Hunter',
   },
   musjpx30track2: {
      game: 'Starcraft 2',
      title: 'Terran Theme 01',
   },
   musjpx30track3: {
      game: 'MDK',
      title: 'Crossfire',
   },
   musjpx30track4: {
      game: 'Starcraft 2',
      title: 'Terran Theme 05',
   },
   musjpx31: {
      title: 'Ice World',
      artist: 'Minielle',
   },
   musjpx32: {
      game: 'Descent: First Strike',
      level: 'MAP22',
   },
   musjpxsec: {
      game: 'Castlevania: Symphony of the Night',
      title: 'Crystal Teardrops',
   },
   musjpxsec2: {
      title: 'Stayin\' Alive',
      artist: 'Bee Gees',
   },
   musjpxsec3: {
      game: 'MDK',
      title: 'Tribal Unity',
   },
   musbass: {
      title: 'Club Sound',
      artist: 'David Kane',
   },

   // Jumpix 2
   // -----------------------------------------------------------------------

   musjpx33: {
      title: 'Minor Thing (Instrumental)',
      artist: 'Red Hot Chili Peppers',
   },
   musjpx34: {
      game: 'Crash Bandicoot',
      title: 'The Great Gate, Native Fortress',
   },
   musjpx35: {
      game: 'Quake II',
      title: 'Stealth Frag',
      artist: 'Sonic Mayhem',
   },
   musjpx36: {
      game: 'Doom 2',
      level: 'Tricks and Traps (MAP08)',
      title: 'The Dave D. Taylor Blues',
   },
   musjpx37: {
      title: 'Vltava',
      artist: 'Bedrich Smetana',
   },
   musjpx38: {
      game: 'Quake II',
      title: 'Gravity Well',
      artist: 'Sonic Mayhem',
   },
   musjpx39: {
      game: 'Resident Evil: Survivor',
      title: 'Entering The Laboratory',
   },
   musjpx40: {
      game: 'spacedm5.pk3',
      level: 'S5CTF06',
   },
   musjpx41: {
      game: 'Nekketsu Kakutou Densetsu',
      title: 'Introduction Theme Part 2',
   },
   musjpx42: {
      game: 'Shin Nekketsu Kōha: Kunio-tachi no Banka',
      title: 'Sabu\'s Mansion',
   },
   musjpx49: {
      game: 'The Misadventures of PB Winterbottom',
      title: 'Savory Salutations',
   },
   musjpx50: {
      title: 'Rock Force',
      artist: 'Bjorn Lynne',
   },
   musjpx51: {
      title: 'Incoming Signals',
      artist: 'Bjorn Lynne',
   },
   musjpx52: {
      game: 'Sonic Advance 3',
      level: 'Twinkle Snow Act 1',
   },
   musjpx53: {
      title: 'Kokomo',
      artist: 'The Beach Boys',
   },
   musjpx54: {
      game: 'Romance of the Three Kingdoms 6',
      title: 'Town Siege',
   },
   musjpx55: {
      game: 'Shin Nekketsu Kōha: Kunio-tachi no Banka',
      title: 'Inside Prison, Jail Fight, Escape Plan',
   },
   musjpxiisec: {
      game: 'Crash Bandicoot',
      title: 'Upstream, Up the Creek',
   },
   musjpx2bdemtrack1: {
      game: 'Castlevania: Symphony of the Night',
      title: 'Tower of Mist',
   },
   musjpx2bdemtrack2: {
      game: 'Castlevania: Symphony of the Night',
      title: 'Requiem for the Gods',
   },

   // Lightmaze
   // -----------------------------------------------------------------------

   // musljm01: same as musjpx50.
   musljm02: {
      game: 'Donkey Kong Country 2',
      title: 'Crocodile Cauldron',
   },
   // musljm03: same as musjpx08
   musljm04: {
      game: 'Doom 2',
      level: 'The Courtyard (MAP18)',
   },
   musljm05track1: {
      title: 'Polar 240',
      artist: 'Paragon X9',
   },
   musljm05track2: {
      game: 'Donkey Kong Country',
      title: 'Aquatic Ambience (SPC)',
   },
   musljm11: {
      game: 'Donkey Kong Country 2',
      title: 'Bayou Boogie',
   },
   musljm13: {
      game: 'Donkey Kong Country',
      title: 'Jungle Groove',
   },
   musljm14: {
      game: 'Doom',
      level: 'Tower of Babel (E2M8)',
   },
   musgreen: {
      title: 'Archetype',
      artist: 'Helix6',
   },

   // Neojump
   // -----------------------------------------------------------------------

   musneo01: {
      game: 'Doom 2',
      level: 'Entryway (MAP01)',
   },
   // musneo02: same as musmap42.
   musneo07: {
      game: 'Final Fantasy X',
      title: 'Those Who Come Closer',
   },
   musneo08: {
      game: 'Kingdom Hearts',
      title: 'Hollow Bastion',
   },
   musneo11: {
      game: 'Doom',
      level: 'Central Processing (E1M6)',
   },
   musneo12: {
      game: 'Sonic 3',
      level: 'Special Stage',
   },
   musneo13: {
      title: 'Glorious Morning',
      artist: 'Waterflame',
   },
   musneo14: {
      game: 'Touhou 6',
      title: 'Flandre Scarlet Theme',
   },

   // Hypnojump
   // -----------------------------------------------------------------------

   mushyp01: {
      game: 'SimCity (SNES)',
      title: 'Capital Theme',
   },
   mushyp02: {
      game: 'Doom 2',
      level: 'The Gantlet (MAP03)',
   },
   mushyp03: {
      game: 'F-Zero',
      title: 'Big Blue',
   },
   mushyp04: {
      game: 'Donkey Kong Country',
      title: 'Fear Factory',
   },
   mushyp05: {
      game: 'Streets of Rage',
      title: 'The Last Soul',
   },

   // Retromaze
   // -----------------------------------------------------------------------

   musrjm01track1: {
      game: 'Super Mario Bros.',
      level: 'W1L1',
      title: 'Underground Theme',
   },
   musrjm01track2: {
      game: 'Super Mario Bros.',
      title: 'Fanfares',
   },
   musrjm01track3: {
      game: 'Super Mario Bros.',
      level: 'W1L4',
      title: 'Castle',
   },
   musrjm01track4: {
      game: 'Super Mario Bros.',
      level: 'W2L1',
   },
   musrjm01track5: {
      game: 'Super Mario Bros.',
      title: 'Water Theme',
   },
   musrjm01track6: {
      game: 'Super Metroid',
      title: 'Kraid\'s Theme',
   },
   musrjm01track7: {
      game: 'Donkey Kong Country 2',
      title: 'Hot-Head Bop',
   },
   musrjm01track8: {
      game: 'Metroid',
      title: 'Brinstar Theme',
   },
   musrjm01track9: {
      game: 'Megaman X2',
      title: 'Intro Music (Remake)',
   },
   musrjm01track10: {
      game: 'Sonic the Hedgehog',
      level: 'Green Hill',
   },
   musrjm01track11: {
      game: 'Sonic the Hedgehog',
      level: 'Marble Zone',
   },
   musrjm01track12: {
      game: 'Donkey Kong Country',
      level: 'Final Boss',
   },
   musrjm02track1: {
      title: 'Pacman Theme Remix',
   },
   musrjm02track2: {
      title: 'Tetris Theme Remix',
   },
   musrjm02track3: {
      title: 'Circus Charlie Theme Remix',
   },
   musrjm02track4: {
      title: 'Mario 2 Ice level Remix',
   },
   musrjm02track5: {
      title: 'Donkey Kong Arcade Remix',
   },
   musrjm02track6: {
      title: 'Hudson\'s Adventure Island (Area 1 Round 1) Remix',
   },
   musrjm03: {
      game: 'Legend of Zelda',
      title: 'Dungeon Theme',
   },
   musrjm04: {
      game: 'Golden Sun: The Lost Age',
   },
   musrjmold01track1: {
      game: 'Blaster Master',
      level: 'Opening',
   },
   musrjmold01track2: {
      game: 'Blaster Master',
      level: 'Area 1: Forest',
   },
   musrjmold01track3: {
      game: 'Blaster Master',
      level: 'Area 2: Castle',
   },
   musrjmold01track4: {
      game: 'Blaster Master',
      level: 'Area 3: Factory',
   },
   musrjmold01track5: {
      game: 'Blaster Master',
      level: 'Area 4: Catacombs',
   },
   musrjmold01track6: {
      game: 'Blaster Master',
      level: 'Area 5: Underwater',
   },
   musrjmold01track7: {
      game: 'Blaster Master',
      level: 'Area 6: Icy Caves',
   },
   musrjmold01track8: {
      game: 'Blaster Master',
      title: 'Boss Theme 1',
   },
   musrjmold01track9: {
      game: 'Blaster Master',
      level: 'Area 8: Biomass Caves',
   },
   musrjmold01track10: {
      game: 'Blaster Master',
      title: 'Incoming Boss',
   },
   musrjmold01track11: {
      game: 'Blaster Master',
      title: 'Ending / Staff Roll',
   },

   // NotCXJump
   // -----------------------------------------------------------------------

   musncj01: {
      title: '1 Ghosts I',
      artist: 'Nine Inch Nails',
   },
   musncj02: {
      game: 'Sonic 3D Blast',
      level: 'Green Grove Zone Act 2',
   },

   // Advanced Jumpmaze
   // -----------------------------------------------------------------------

   // musadv01: same as musmap42.
   musadv02: {
      game: 'Heretic',
      level: 'The Guard Tower (E1M4)',
   },
   musfllv2: {
      game: 'Doom',
      level: 'Hell Keep (E3M1)',
   },

   // Jumpmaze X
   // -----------------------------------------------------------------------

   musjmx00a: {
      game: 'Dark Cloud',
      title: 'Castle of Dark Heaven',
   },
   musjmx00c: {
      game: 'Dark Cloud',
      title: 'The Corridor of Time',
   },
   musjmx00e: {
      game: 'Digimon World 2',
      title: 'Core Tower',
   },
   musjmx01: {
      game: 'Megaman 8',
      title: 'Astro Man\'s Stage',
   },
   musjmx02: {
      game: 'Megaman 8',
      title: 'Aqua Man\'s Stage',
   },
   musjmx04: {
      game: 'Command & Conquer: Red Alert',
      title: 'Bigfoot',
   },
   musjmx05: {
      game: 'Donkey Kong Country 3',
      title: 'Cascade Capers',
   },
   musjmx06: {
      game: 'Donkey Kong Country 3 (GBA)',
      title: 'Water World',
   },
   musjmx07: {
      game: 'Sonic Advance 3',
      level: 'Ocean Base Zone',
   },
   musjmx08: {
      game: 'Megaman ZX',
      title: 'Sky High - Grand Nuage',
   },
   musjmx09: {
      game: 'Quake II',
      title: 'The Underworld',
      artist: 'Sonic Mayhem',
   },
   musjmx10: {
      game: 'Super Smash Bros. Brawl',
      title: 'The Dark World',
   },
   musjmx11: {
      game: 'Donkey Kong Country 2',
      title: 'Mining Melancholy',
   },
   musjmx12: {
      game: 'Donkey Kong Country 3',
      title: 'Rockface Rumble',
   },
   musjmx13: {
      game: 'Ape Escape',
      level: 'Snowy Mammoth',
   },
   musjmx14: {
      game: 'The Nightmare of Rebellion',
      title: 'Another Hakurei Shrine',
   },
   musjmx15: {
      game: 'Metroid Fusion',
      title: 'Frozen in Time',
   },
   musjmx16: {
      title: 'The Perfect Drug',
      artist: 'Mystic Cloud',
   },
   musjmx17: {
      game: 'Megaman ZX Advent',
      title: 'Whisper of Relics',
   },
   musjmx18: {
      game: 'Donkey Kong Country 2',
      title: 'Forest Interlude',
   },
   musjmx19: {
      game: 'Donkey Kong Country',
      title: 'Voices of the Temple',
   },
   musjmx20: {
      game: 'The Legend of Heroes: Trails of Cold Steel IV',
      title: 'Synchronicity',
   },
   musjmx21: {
      game: 'Jill of the Jungle',
      title: 'Ominous',
   },
   musjmx22: {
      game: 'Sword Art Online: Fatal Bullet',
      title: 'The Old South',
   },
   musjmx23: {
      title: 'Abandon',
      artist: 'Rabiteman',
   },
   musjmx24track1: {
      game: 'Shadow of the Colossus',
      title: 'The Opened Way',
   },
   musjmx24track2: {
      game: 'Tales of Symphonia',
      title: 'Beat the Angel',
   },
   musjmx24track3: {
      game: 'Imperishable Night',
      title: 'Extend Ash ~ Hourai Victim',
   },
   musjmx25: {
      game: 'Ape Escape',
      title: 'Crumbling Castle',
   },
   musjmx26: {
      game: 'Corpse Party: Blood Drive',
   },
   musjmx27: {
      game: '.hack//Infection',
      title: 'Castle Dungeon Normal',
   },
   musjmx28: {
      game: 'Super Mario 64',
      title: 'Bowser\'s Road',
   },
   musjmx29: {
      game: 'The Legend of Heroes: Trails of Cold Steel III',
      title: 'One Way to the Netherworld',
   },
   musjmx30: {
      game: 'Halo 3',
      title: 'Warthog Run',
   },
   musjmx31: {
      game: 'Megaman X',
      level: 'Sigma\'s Fortress: Stage 1',
   },
   musjmx32: {
      game: 'The Legend of Heroes: Trails of Cold Steel II',
      level: 'Reverie Corridor',
   },
   musjmx33: {
      game: 'Donkey Kong Country 2',
      title: 'Donkey Kong Rescued (End Credits)',
   },

   mustrash01: {
      title: 'New Powers (Bacon92 Remix)',
      artist: 'DESHIEL',
   },
   mustrash02: {
      title: 'Wish Your Wish (Bacon92 Remix)',
      artist: 'DESHIEL',
   },
   musgmz02: {
      game: 'Quake II',
      title: 'Quad Machine (MIDI)',
      artist: 'Sonic Mayhem',
   },
   // zteel: same as musjpx50.
};