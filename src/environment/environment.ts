// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // AUTH_API: 'http://localhost:8000/api/login_check',
    GLOBAL_API: 'https://127.0.0.1:8000/api',
    ARTICLES_API: 'http://localhost:8000/api/articles',
    CATEGORIES_API: 'http://localhost:8000/api/categories',
    COMMENTS_API: 'http://localhost:8000/api/comments',
    LOGS_API: 'http://localhost:8000/api/logs',
    NEWSLETTERS_API: 'http://localhost:8000/api/newsletters',
    TAGS_API: 'http://localhost:8000/api/tags',
    USER_CONNEXIONS_API: 'http://localhost:8000/api/user_connexions',
    USERS_API: 'http://localhost:8000/api/users',
  };
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.