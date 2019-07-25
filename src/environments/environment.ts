// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  hmr: true,
  apiUrl: 'https://backend.sports.info',
  version: '/api/v1',
  socket: {
      baseUrl: 'https://dev.backend.sports.info',
      config: {}
  },
  s3Url : 'https://d1ldsx0apuyt84.cloudfront.net/',
  siteUrl : 'https://www.sports.info/',
  mapsKey : 'AIzaSyAjnz5zvaRF5aMwMcsZ2-5nm43B9Hs3KhY',
  facebookId:'392165904733265',
  googleOuthId:'504140892785-j5u4ed8b9rv3vl2ibvto9c1hljqg05sg.apps.googleusercontent.com'
};

