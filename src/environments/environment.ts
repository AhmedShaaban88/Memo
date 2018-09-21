// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase : {
    apiKey: 'AIzaSyCI1J-IfMni9gdQTtNv2In6wiqWPxwQ8UA',
    authDomain: 'memo-fc010.firebaseapp.com',
    databaseURL: 'https://memo-fc010.firebaseio.com',
    projectId: 'memo-fc010',
    storageBucket: 'memo-fc010.appspot.com',
    messagingSenderId: '971963849362'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
