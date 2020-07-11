import React, { useState, useEffect } from "react";
import service from "./conduit-pages-home-service";
import ConduitTagsPopular from "./conduit-tags-popular";
import ConduitArticlesPreview from "./conduit-articles-preview";
import ConduitArticlesMeta from "./conduit-articles-meta";
import ConduitButtonsFavorite from "./conduit-buttons-favorite";
import ConduitArticlesFeed from "./conduit-articles-feed";

const Home = () => {
  const [tags, setTags] = useState();
  const [articles, setArticles] = useState();
  const [feeds, setFeeds] = useState();
  const [selectedFeed, setSelectedFeed] = useState("all");

  useEffect(() => {
    service.fetchTags().then((tags) => setTags(tags));
    setFeeds([
      { id: "personal", name: "Your feed" },
      { id: "all", name: "Global Feed" },
    ]);
    service
      .fetchArticles({
        limit: 10,
        offset: 0,
        feed: { id: "all", name: "Global Feed" },
      })
      .then((articles) => setArticles(articles));
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>
            A place to share your <i>Angular</i> knowledge.
          </p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {feeds ? (
              <ConduitArticlesFeed
                feeds={feeds}
                selected={selectedFeed}
                onSelected={onFeedSelected({
                  setArticles,
                  setSelectedFeed,
                  HomePageService: service,
                  feeds,
                })}
              ></ConduitArticlesFeed>
            ) : (
              <div>Loading... </div>
            )}

            {articles ? (
              articles.map((article) => (
                <ConduitArticlesPreview article={article} key={article.slug}>
                  <ConduitArticlesMeta article={article} key={article.slug}>
                    <ConduitButtonsFavorite
                      article={article}
                      onFavoritedArticle={onFavoritedArticle()}
                      key={article.slug}
                    ></ConduitButtonsFavorite>
                  </ConduitArticlesMeta>
                </ConduitArticlesPreview>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="col-md-3">
            {tags ? (
              <ConduitTagsPopular
                tags={tags}
                onSelected={onTagSelected({
                  setArticles,
                  setSelectedFeed,
                  HomePageService: service,
                  feeds,
                })}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const onTagSelected = (dependencies) => (tag) => {
  const tagFeed = {
    id: tag.toLowerCase(),
    name: "#" + tag,
  };
  dependencies.feeds[2] = tagFeed;
  dependencies.setSelectedFeed(tagFeed.id);
  dependencies.HomePageService.fetchArticles({
    limit: 10,
    offset: 0,
    feed: tagFeed,
  }).then((articles) => dependencies.setArticles(articles));
};

const onFeedSelected = (dependencies) => (selectedFeed) => {
  dependencies.setSelectedFeed(selectedFeed.id);
  dependencies.HomePageService.fetchArticles({
    limit: 10,
    offset: 0,
    feed: selectedFeed,
  }).then((articles) => dependencies.setArticles(articles));
};

const onFavoritedArticle = (dependencies) => (article) => {
  console.log(article);
};

export default Home;
