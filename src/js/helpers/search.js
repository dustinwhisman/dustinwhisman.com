import MiniSearch from 'minisearch';

const miniSearch = new MiniSearch({
	fields: ['title', 'text', 'description'],
	storeFields: ['title', 'url', 'date', 'description'],
});
let searchIndex;

const searchBasedOnURL = () => {
	const url = new URL(window.location.href);
	const params = url.searchParams;
	const query = params.get('q');
	const searchInput = document.querySelector('#search');
	if (searchInput) {
		searchInput.value = query;
	}

	if (query) {
		const searchResults = performSearch(query);
		showResults(searchResults);
	}
};

const fetchSearchIndex = async () => {
	const response = await fetch('/search-index.json');
	searchIndex = await response.json();
	miniSearch.addAll(searchIndex);

	searchBasedOnURL();
};

const performSearch = (query) => miniSearch.search(query);

const showResults = (results, shouldFocus = false) => {
	let resultsHTML = '';
	const searchResultsElement = document.querySelector('#search-results');
	if (searchResultsElement) {
		if (!results.length) {
			searchResultsElement.innerHTML = `
				<h2>No Results Found</h2>
				<p>Ope, I couldn't find anything that matched what you were looking for. Maybe try another search term?</p>
			`;

			return;
		}

		results.forEach(({ title, url, date, description }) => {
			resultsHTML += `
				<h2><a href="${url}">${title}</a></h2>
				<p class="cmp-fine-print">Published: ${date}</p>
				<p>${description}</p>
			`;
		});

		searchResultsElement.innerHTML = resultsHTML;

		if (shouldFocus) {
			searchResultsElement.focus();
		}
	}
};

export const initializeSearchFormListener = () => {
	fetchSearchIndex();

	window.addEventListener('popstate', searchBasedOnURL);

	const form = document.querySelector('form[role="search"]');
	if (form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const query = formData.get('q');
			window.history.pushState(null, '', `?q=${query}`);

			const searchResults = performSearch(query);
			showResults(searchResults, true);
		});
	}
};
