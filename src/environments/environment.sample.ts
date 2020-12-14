// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	captcha_key: '', // Captcha key from Google ReCaptcha
	captcha_secret: '', // Captcha secret from Google ReCaptcha
	formspree_fr_url: '', // Formspree URL for contact POST request and host kilian-paquier.fr
	formspree_github_url: '', // Formspree URL for contact PORT request and host kilian-paquier.github.io
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
