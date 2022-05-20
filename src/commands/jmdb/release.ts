// This table stores the known public releases for each project. A public
// release is a new version of a project. A release is not necessarily a single
// file; multiple files can be released for a project, each with their own
// version.
// ==========================================================================

interface Table {
   [ id: string ]: {
      project: string,
      version: string,
      date?: string, // Release date.
      file: string,
   };
}

export default <Table> {

   // Jumpmaze 2
   // -----------------------------------------------------------------------

   jm2v8: {
      project: 'jm2',
      version: 'v8',
      date: 'YYYYMMDD',
      file: 'jumpmaze2_v8a.pk3',
   },

   // Jumpmaze BE
   // -----------------------------------------------------------------------

   // jm_assets
   jmassetsv1c: {
      project: 'jmbe',
      version: 'v1c',
      file: 'jm_assets-v1c.pk3',
   },
   jmassetsv1g: {
      project: 'jmbe',
      version: 'v1g',
      file: 'jm_assets-v1g.pk3',
   },

   // jm_core
   jmcorev1d: {
      project: 'jmbe',
      version: 'v1d',
      file: 'jm_core-v1d.pk3',
   },
   jmcorev1f: {
      project: 'jmbe',
      version: 'v1f',
      date: '20190526',
      file: 'jm_core-v1f.pk3',
   },
   jmcorev1g: {
      project: 'jmbe',
      version: 'v1g',
      date: '20200528',
      file: 'jm_core-v1g.pk3',
   },
   jmcorev1g2: {
      project: 'jmbe',
      version: 'v1g2',
      date: '20200630',
      file: 'jm_core-v1g2.pk3',
   },

   // jm_maps
   jmmaps: {
      project: 'jmbe',
      version: 'v1',
      date: '20160129',
      file: 'jm_maps.pk3',
   },
   jmmapsv1f: {
      project: 'jmbe',
      version: 'v1f',
      date: '20190526',
      file: 'jm_maps-v1f.pk3',
   },

   // jm2_maps
   jm2mapsv1f: {
      project: 'jmbe',
      version: 'v1f',
      date: '20190526',
      file: 'jm2_maps-v1f.pk3',
   },

   // Jumpmaze CE
   // -----------------------------------------------------------------------

   // jmce_assets
   jmceassetsv1c: {
      project: 'jmce',
      version: 'v1c',
      file: 'jmce_assets-v1c.pk3',
   },
   jmceassetsv1f: {
      project: 'jmce',
      version: 'v1f',
      file: 'jmce_assets-v1f.pk3',
   },

   // jmce_maps
   jmcemapsv1c: {
      project: 'jmce',
      version: 'v1c',
      date: '2016',
      file: 'jmce_maps-v1c.pk3',
   },
   jmcemapsvfc: {
      project: 'jmce',
      version: 'v1f',
      date: '2020',
      file: 'jmce_maps-v1f.pk3',
   },
}