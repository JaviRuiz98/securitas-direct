// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  preproduction: false,
  backendServer:  "http://localhost:3001/api/",
  webSocketUrl:  "http://localhost:3001/api/",
  imgUrl:  "http://localhost:3001/api/",
  CARPETAS: {
    TICKETS: 'datastore/uploads/tickets/',
    CLIENTE_DOCUMENTOS: 'datastore/uploads/client/documents/',
    USUARIO_PROFILE: 'datastore/uploads/user/profile/',
    SERVICE_IMAGE: 'datastore/uploads/configurador/',
    COMUNICACIONES: 'datastore/uploads/comunicaciones',
  },
  // mapbox: {
  //   accessToken: 'pk.eyJ1IjoibWFyaW9hdHpzYSIsImEiOiJjbGQ5ejRweXQwMzExM29uenVxb2gwNXd6In0.p0pZeFFMFqbhqbI0ClyLNA',
  // },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
