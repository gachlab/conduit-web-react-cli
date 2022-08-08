const state = {
  "articles.list.data": [],
  "articles.list.pages": [],
  "articles.list.selectedPage": 1,
  "articles.feeds.data": [
    { id: "personal", name: "Your feed" },
    { id: "all", name: "Global Feed" },
  ],
  "articles.feeds.selected": "all",
  "tags.data": [],
};

export function init(dependencies) {
  return () =>
    Promise.resolve(Object.assign({}, state)).then((state) =>
      Promise.all([
        dependencies.fetchArticles({
          limit: 10,
          page: state["articles.list.selectedPage"],
          feed: state["articles.feeds.data"].find(
            (feed) => feed.id === state["articles.feeds.selected"]
          ),
        }),
        dependencies.fetchTags(),
      ])
        .then(([articles, tags]) => ({
          articles: articles,
          tags: tags.tags,
        }))
        .then((response) =>
          Object.assign({}, state, {
            "articles.list.data": response.articles.data,
            "articles.list.pages": response.articles.meta.pages,
            "tags.data": response.tags,
          })
        )
    );
}

export function onTagSelected(dependencies) {
  return (input) =>
    selectFeed(dependencies)({
      feed: {
        id: input.tag.toLowerCase(),
        name: "#" + input.tag,
      },
      state: input.state,
    });
}

export function onFeedSelected(dependencies) {
  return (input) =>
    selectFeed(dependencies)({
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
      .then((articles) =>
        Object.assign({}, input.state, {
          articles: articles.data,
          pages: articles.meta.pages,
          selectedFeed: input.feed.id,
          selectedPage: 1,
        })
      );
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
