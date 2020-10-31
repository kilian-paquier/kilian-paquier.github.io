/*!
 * Stati18n v0.2
 * stati18n.js
 * Created by Florian Rotagnon
 * Licensed under MIT
 */

function createCookie(name, value, days) {
	let expires;
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	} else {
		expires = '';
	}
	document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
	if (document.cookie.length > 0) {
		let c_start = document.cookie.indexOf(name + '=');
		if (c_start !== -1) {
			c_start = c_start + name.length + 1;
			let c_end = document.cookie.indexOf(';', c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return undefined;
}

// find on http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie
function isIE() {
	let ua = window.navigator.userAgent;
	let msie = ua.indexOf('MSIE ');

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
}

$(document).ready(function () {
	let languageList = [];
	let defaultUserLanguage = 'fr';
	$('link[rel="stylesheet"]').each(function () {
		let fileName = $(this).attr('href');
		if (
			fileName !== 'translation/stati18n.css' &&
			fileName.indexOf('stati18n') > -1
		)
			defaultUserLanguage = fileName.slice(9, -4);
	});

	var userLanguage = defaultUserLanguage;

	$('.stati18n-language-selector').each(function () {
		languageList.push(this.getAttribute('value'));
	});
	//get info about css files
	$('body').append('<div id="stati18n-infos" style="display:none;"></div>');

	let infos;
	if (isIE()) {
		let cssElem = window.getComputedStyle(
			document.getElementById('stati18n-infos')
		);
		infos = cssElem['customContent'];
	} else {
		infos = $('#stati18n-infos').css('content');
	}

	infos = infos.slice(1, infos.length - 1);
	let infosTab = infos.split(' ');
	let host = infosTab[0];
	let languages = infosTab.slice(1, infosTab.length);

	$('#stati18n-infos').remove();

	//get static content
	$('body').append(
		'<div id="stati18n-fixed-values" style="display:none;"></div>'
	);

	if (isIE()) {
		let cssElem = window.getComputedStyle(
			document.getElementById('stati18n-fixed-values')
		);
		infos = cssElem['customContent'];
	} else {
		infos = $('#stati18n-fixed-values').css('content');
	}
	infos = infos.slice(1, infos.length - 1);
	let fixedTab = infos.split(';;');

	$('#stati18n-fixed-values').remove();

	let i = languageList.indexOf(userLanguage);
	if (i > -1) {
		userLanguage = languageList[i];
	} else {
		userLanguage = languageList[0];
	}

	let newUserLanguage = getCookie('lang');
	if (newUserLanguage === undefined) {
		if (navigator.language.includes('fr')) newUserLanguage = 'fr';
		else newUserLanguage = 'en';
	}

	changeLanguage(newUserLanguage);

	// updateStatic();

	/****** FUNCTION ******/

	//Add static content
	function updateStatic() {
		for (let ind in fixedTab) {
			let line = fixedTab[ind];
			let lineSplit = line.split('§§');
			let currentLanguage = lineSplit[0];

			if (currentLanguage === userLanguage) {
				let id = lineSplit[1];
				let content = lineSplit[2];

				if (typeof $('.s18n-' + id).attr('value') != 'undefined')
					$('.s18n-' + id).attr('value', content);
				else $('.s18n-' + id).html(content);
			}
		}
	}

	//Modify language
	function changeLanguage(newLanguage) {
		let precUserLanguage = userLanguage;
		userLanguage = newLanguage;

		let precFile =
			host + '/translation/stati18n-' + precUserLanguage + '.css';
		let file = host + '/translation/stati18n-' + userLanguage + '.css';

		if (
			!$("link[href='" + file + "']").length &&
			$.inArray(userLanguage, languages) >= 0
		) {
			$("link[href='" + precFile + "']").remove();
			$('head').append(
				'<link rel="stylesheet" href="' + file + '" type="text/css" />'
			);
		}
		createCookie('lang', userLanguage, 7);
		$('.stati18n-language-selector').attr('value', userLanguage);
		if ($('.stati18n-language-selector').attr('value') === 'fr') {
			$('.stati18n-language-selector').attr('value', 'en');
			$('.stati18n-language-selector')
				.find('.flag-icon')
				.removeClass('flag-icon-fr');
			$('.stati18n-language-selector')
				.find('.flag-icon')
				.addClass('flag-icon-gb');
			$('.stati18n.s18n-see-more').attr(
				'onclick',
				"window.open('https://cvdesignr.com/p/5d9cd3013bcbb', '_blank')"
			);
			changeContactForm(userLanguage);
		} else {
			$('.stati18n-language-selector').attr('value', 'fr');
			$('.stati18n-language-selector')
				.find('.flag-icon')
				.removeClass('flag-icon-gb');
			$('.stati18n-language-selector')
				.find('.flag-icon')
				.addClass('flag-icon-fr');
			$('.stati18n.s18n-see-more').attr(
				'onclick',
				"window.open('https://cvdesignr.com/p/5ddff0dda9765', '_blank')"
			);
			changeContactForm(userLanguage);
		}
		updateStatic();
	}

	/****** EVENTS ******/

	$('.stati18n-language-selector').click(function (e) {
		changeLanguage(this.getAttribute('value'));
	});

	/**
	 *
	 * @param newLanguage Le nouveau language
	 */
	function changeContactForm(newLanguage) {
		if (newLanguage === 'fr') {
			$('#name').attr('placeholder', 'Votre nom *');
			$('#name').attr(
				'data-validation-required-message',
				'Veuillez saisir votre nom'
			);

			$('#email').attr('placeholder', 'Votre adresse mail *');
			$('#email').attr(
				'data-validation-required-message',
				'Veuillez saisir votre adresse mail'
			);

			$('#company').attr('placeholder', 'Nom de votre entreprise');

			$('#message').attr('placeholder', 'Votre message *');
			$('#message').attr(
				'data-validation-required-message',
				'Veuillez saisir votre message'
			);
		} else {
			$('#name').attr('placeholder', 'Your last name *');
			$('#name').attr(
				'data-validation-required-message',
				'Please fill in your last name'
			);

			$('#email').attr('placeholder', 'Your email address *');
			$('#email').attr(
				'data-validation-required-message',
				'Please fill in your email address'
			);

			$('#company').attr('placeholder', "Company's name");

			$('#message').attr('placeholder', 'Your message *');
			$('#message').attr(
				'data-validation-required-message',
				'Please fill in your message'
			);
		}
	}
});
