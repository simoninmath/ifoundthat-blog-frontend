// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    BASE_URL: 'https://127.0.0.1:8000',
    GLOBAL_API: '/api',
    ARTICLES_API: '/api/public_articles',
    CATEGORIES_API: '/api/categories',
    COMMENTS_API: '/api/comments',
    LOGS_API: '/api/logs',
    NEWSLETTERS_API: '/api/newsletters',
    TAGS_API: '/api/tags',
    USER_CONNEXIONS_API: '/api/user_connexions',
    USERS_API: '/api/users',
    AUTH_API: '/api/login',
  };
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.