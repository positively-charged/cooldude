// Map difficulty levels
// ==========================================================================

interface Table {
   [ id: string ]: {
      name: string,
   };
}

export default <Table> {
   none: { name: 'None' },
   varied: { name: '\\ccVaried\\c-' },
   veryeasy: { name: '\\cqVery Easy\\c-' },
   easy: { name: '\\cdEasy\\c-' },
   moderate: { name: '\\chModerate\\c-' },
   hard: { name: '\\cgHard\\c-' },
   veryhard: { name: '\\cmVery Hard\\c-' },
   veryveryhard: { name: '\\chVery Very Hard\\c-' },
   extreme: { name: '\\cgExtreme\\c-' },
   extreme2: { name: '\\cgExtreme \\cc(thanks to the last part)\\c-' },
   extreme3: { name: '\\ciExtreme\\c-' },
   fuckyoudevon: { name: '\\cgFuck you, Devon\\c-' },
   cruel: { name: '\\c[s0]CRUEL\\c-' },
   killyourself: { name: '\\cmKill Yourself\\c-' },
}