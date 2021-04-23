export default {
	init,
	onFeedSelected,
	onTagSelected,
	onPageSelected,
};

function init() {
	const selectedPage = 1;
	const feeds = [
		{ id: 'personal', name: 'Your feed' },
		{ id: 'all', name: 'Global Feed' },
	];
	const selectedFeed = feeds[1].id;

	return Promise.all([
		fetchArticles({
			limit: 10,
			page: selectedPage,
			feed: feeds[1],
		}),
		fetchTags(),
	])
		.then(([articles, tags]) => ({
			articles: articles,
			tags: tags.tags,
		}))
		.then((state) => ({
			articles: state.articles.data,
			pages: state.articles.meta.pages,
			tags: state.tags,
			selectedFeed,
			feeds,
			selectedPage,
		}));
}

function onTagSelected(input) {
	return selectFeed({
		feed: {
			id: input.tag.toLowerCase(),
			name: '#' + input.tag,
		},
		state: input.state,
	});
}

function onFeedSelected(input) {
	return selectFeed({
		feed: input.feed,
		state: input.state,
	});
}

function onPageSelected(input) {
	return changePage({ page: input.page, state: input.state });
}

function selectFeed(input) {
	if (!input.state.feeds.find((f) => f.id === input.feed.id)) {
		input.state.feeds[2] = input.feed;
	}

	return fetchArticles({
		limit: 10,
		page: 1,
		feed: input.feed,
	}).then((articles) => ({
		articles: articles.data,
		pages: articles.meta.pages,
		tags: input.state.tags,
		feeds: input.state.feeds,
		selectedFeed: input.feed.id,
		selectedPage: 1,
	}));
}

function changePage(input) {
	return fetchArticles({
		limit: 10,
		page: input.page,
		feed: input.state.feeds.find((feed) => feed.id === input.state.selectedFeed),
	}).then((response) => ({
		articles: response.data,
		pages: response.meta.pages,
		selectedPage: input.page,
		tags: input.state.tags,
		feeds: input.state.feeds,
		selectedFeed: input.state.selectedFeed,
	}));
}

function fetchArticles(filter) {
	filter = Object.assign(filter, {
		offset: filter.limit * (filter.page - 1),
	});
	const url = `https://conduit.productionready.io/api/articles${filter ? '?' : ''}${
		filter.limit ? 'limit=' + filter.limit : ''
	}${'&offset=' + filter.offset || 0}${filter.feed.name.includes('#') ? '&tag=' + filter.feed.id : ''}`;

	return fetch(url)
		.then((response) => response.json())
		.then((response) => ({
			data: response.articles.map((article) => addArticleDetailLink(addProfilePageLink(article))),
			meta: {
				pages: Array.from(
					new Array(Math.ceil(response.articlesCount / filter.limit)),
					(val, index) => index + 1
				),
			},
		}));
}

function fetchTags() {
	return fetch('https://conduit.productionready.io/api/tags').then((response) => response.json());
}

function addArticleDetailLink(article) {
	return Object.assign({}, article, {
		href: window.location.href + 'article/' + article.slug,
	});
}

function addProfilePageLink(article) {
	return Object.assign({}, article, {
		authorHref: window.location.href + 'profile/' + article.author.username,
	});
}
