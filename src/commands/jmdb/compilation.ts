// This table contains compilations. A compilation is a project that uses the
// contents of another project.
// ==========================================================================

interface Table {
   [ id: string ]: {
      project: string,
      includes: string,
   };
}

export default <Table> {

   // Jumpmaze BE
   // -----------------------------------------------------------------------

   jmbejm: {
      project: 'jmbe',
      includes: 'jm',
   },
   jmbejm2: {
      project: 'jmbe',
      includes: 'jm2',
   },

   // Jumpmaze CE
   // -----------------------------------------------------------------------

   jmcejpx: {
      project: 'jmce',
      includes: 'jpx',
   },
   jmcejpx2: {
      project: 'jmce',
      includes: 'jpx2',
   },
   jmcelightjm: {
      project: 'jmce',
      includes: 'lightjm',
   },
   jmceneo: {
      project: 'jmce',
      includes: 'neojm',
   },
   jmcehypno: {
      project: 'jmce',
      includes: 'hypnojm',
   },
   jmceretrojm: {
      project: 'jmce',
      includes: 'retrojm',
   },
   jmcexneojm: {
      project: 'jmce',
      includes: 'xneojm',
   },
   jmcencj: {
      project: 'jmce',
      includes: 'ncj',
   },
   jmceaac: {
      project: 'jmce',
      includes: 'aac',
   },

}