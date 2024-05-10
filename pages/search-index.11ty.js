class SearchIndex {
	data() {
		return {
			permalink: '/search-index.json',
			eleventyExcludeFromCollections: true,
		};
	}

	render({ collections }) {
		const searchIndex = collections.all.map((post) => ({
			id: post.url,
			title: post.data.title,
			url: post.url,
			date: new Date(post.date).toLocaleDateString(undefined, { timeZone: 'UTC' }),
			text: post.templateContent,
			description: post.data.description,
		}));

		return JSON.stringify(searchIndex);
	}
}

module.exports = SearchIndex;
