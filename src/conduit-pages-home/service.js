const state = {
  articles: [],
  tags: [],
  pages: [],
  feeds: [
    { id: "personal", name: "Your feed" },
    { id: "all", name: "Global Feed" },
  ],
  selectedPage: 1,
  selectedFeed: "all",
};

export function init(dependencies) {
  return () =>
    Promise.resolve(Object.assign({}, state))
      .then((state) =>
        Promise.all([
          dependencies.fetchArticles({
            limit: 10,
            page: state.selectedPage,
            feed: state.feeds[1],
          }),
          dependencies.fetchTags(),
        ]).then(([articles, tags]) => ({
          articles: articles,
          tags: tags.tags,
        }))
      )
      .then((state) =>
        Object.assign({}, state, {
          articles: state.articles.data,
          pages: state.articles.meta.pages,
          tags: state.tags,
        })
      );
}

export function onTagSelected(input) {
  return selectFeed({
    feed: {
      id: input.tag.toLowerCase(),
      name: "#" + input.tag,
    },
    state: input.state,
  });
}

export function onFeedSelected(input) {
  return selectFeed({
    feed: input.feed,
    state: input.state,
  });
}

export function onPageSelected(input) {
  return changePage({ page: input.page, state: input.state });
}

function selectFeed(dependencies) {
  return (input) => {
    if (!input.state.feeds.find((f) => f.id === input.feed.id)) {
      input.state.feeds[2] = input.feed;
    }

    return dependencies
      .fetchArticles({
        limit: 10,
        page: 1,
        feed: input.feed,
      })
      .then((articles) => ({
        articles: articles.data,
        pages: articles.meta.pages,
        tags: input.state.tags,
        feeds: input.state.feeds,
        selectedFeed: input.feed.id,
        selectedPage: 1,
      }));
  };
}

function changePage(dependencies) {
  return (input) => {
    return dependencies
      .fetchArticles({
        limit: 10,
        page: input.page,
        feed: input.state.feeds.find(
          (feed) => feed.id === input.state.selectedFeed
        ),
      })
      .then((response) => ({
        articles: response.data,
        pages: response.meta.pages,
        selectedPage: input.page,
        tags: input.state.tags,
        feeds: input.state.feeds,
        selectedFeed: input.state.selectedFeed,
      }));
  };
}
