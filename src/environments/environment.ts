// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // serverURL: 'http://localhost:8080/api/',
  // whitelistedDomains: ['localhost:8080'],
  serverURL: 'http://127.0.0.1:8000/api/',
  googleMapsApiKey: 'AIzaSyCEroEM0m4QzyhQcqeK2GvCc0qDlCIzcAA',
  // s3Url: 'https://torhavn-maps.s3.us-east-2.amazonaws.com/images/',
  s3Url: 'https://cloud-cube.s3.amazonaws.com/r98sunmzllfr/public/',
  cloudCubeApiKey: '4hVheYo/JLpRr5Ba35Uhserl9y8ZRpG/4O6UqJmE'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
