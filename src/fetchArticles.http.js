export function fetchArticles(
  baseUrl = "https://conduit.productionready.io/api/articles"
) {
  return (filter) => {
    filter = Object.assign(filter, {
      offset: filter.limit * (filter.page - 1),
    });
    const url = `${baseUrl}${filter ? "?" : ""}${
      filter.limit ? "limit=" + filter.limit : ""
    }${"&offset=" + filter.offset || 0}${
      filter.feed.name.includes("#") ? "&tag=" + filter.feed.id : ""
    }`;

    return fetch(url)
      .then((response) => response.json())
      .then((response) => ({
        data: response.articles.map((article) =>
          addArticleDetailLink(addProfilePageLink(article))
        ),
        meta: {
          pages: Array.from(
            new Array(Math.ceil(response.articlesCount / filter.limit)),
            (val, index) => index + 1
          ),
        },
      }));
  };
}

function addArticleDetailLink(article) {
  return Object.assign({}, article, {
    href: window.location.href + "article/" + article.slug,
  });
}

function addProfilePageLink(article) {
  return Object.assign({}, article, {
    authorHref: window.location.href + "profile/" + article.author.username,
  });
}
