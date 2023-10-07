const isCSSNakedDay = () => {
	const today = new Date();
	if (today.getMonth() !== 3) {
		return false;
	}

	if (today.getDate() !== 9) {
		return false;
	}

	return true;
};

const getCSSPreference = () => {
	const url = new URL(window.location.href);

	switch (url.searchParams.get('css')) {
		case 'false':
		case 'no':
		case 'off':
		case '0':
			return false;
		case 'true':
		case 'yes':
		case 'on':
		case '1':
			return true;
		default:
			return null;
	}
};

const removeCSS = () => {
	const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
	stylesheets.forEach((stylesheet) => {
		stylesheet.remove();
	});
};

const insertDisclaimer = () => {
	const disclaimer = document.createElement('p');
	disclaimer.setAttribute('aria-hidden', 'true');
	disclaimer.innerHTML = `Today is <a href="https://css-naked-day.github.io/">CSS Naked Day</a>, so if you're confused about why the site looks how it does, that's why! To <a href="?css=on">view this page with CSS</a>, you can append "?css=on" to the page's URL.`;
	const article = document.querySelector('main > article');
	article?.prepend(disclaimer);
};

const currentYear = () => {
	const today = new Date();
	const year = today.getFullYear();
	return year;
};

const updateCurrentYear = () => {
	const year = currentYear();
	const yearElement = document.querySelector('[data-current-year]');
	if (yearElement) {
		yearElement.innerHTML = year;
	}
};

(() => {
	const cssPreference = getCSSPreference();
	if (cssPreference === false) {
		removeCSS();
	}

	if (isCSSNakedDay() && cssPreference !== true) {
		removeCSS();
		insertDisclaimer();
	}

	updateCurrentYear();
})();
