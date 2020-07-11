const fetchArticles = (filter) => {
  const url =
    // filter.feed.id === "personal"
    //   ? `https://conduit.productionready.io/api/articles/feed`
    //   :
    `https://conduit.productionready.io/api/articles${filter ? "?" : ""}${
      filter.limit ? `limit=${filter.limit}` : ""
    }${filter.offset >= 0 ? `&offset=${filter.offset}` : ""}${
      filter.feed.name.includes("#") ? `&tag=${filter.feed.id}` : ""
    }`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.articles);
};

const fetchTags = () => {
  return fetch("https://conduit.productionready.io/api/tags")
    .then((response) => response.json())
    .then((response) => response.tags);
};

export default {
  fetchArticles,
  fetchTags,
};
