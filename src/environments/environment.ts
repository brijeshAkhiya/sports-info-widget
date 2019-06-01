// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: true,
  apiUrl: 'https://sports.bhavin.cf',
  version: '/api/v1',
  socket: {
    baseUrl: 'https://sports.bhavin.cf',
    config: {}
  },
  s3Url : 'https://d1ldsx0apuyt84.cloudfront.net/',
  siteUrl : 'http://dev.sports.info/',
};
