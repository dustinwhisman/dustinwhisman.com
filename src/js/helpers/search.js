import MiniSearch from 'minisearch';

const miniSearch = new MiniSearch({
	fields: ['title', 'text', 'description'],
	storeFields: ['title', 'url', 'date', 'description'],
});
let searchIndex;

const fetchSearchIndex = async () => {
	const response = await fetch('/search-index.json');
	searchIndex = await response.json();
	miniSearch.addAll(searchIndex);
};

const performSearch = (query) => miniSearch.search(query);

const showResults = (results) => {
	let resultsHTML = '';
	const searchResultsElement = document.querySelector('#search-results');
	if (searchResultsElement) {
		results.forEach(({ title, url, date, description }) => {
			resultsHTML += `
				<h2><a href="${url}">${title}</a></h2>
				<p class="cmp-fine-print">Published: ${date}</p>
				<p>${description}</p>
			`;
		});

		searchResultsElement.innerHTML = resultsHTML;
		searchResultsElement.focus();
	}
};

export const initializeSearchFormListener = () => {
	fetchSearchIndex();

	const form = document.querySelector('form[role="search"]');
	if (form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const query = formData.get('q');

			const searchResults = performSearch(query);
			showResults(searchResults);
		});
	}
};
