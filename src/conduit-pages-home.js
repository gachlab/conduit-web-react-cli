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
  const [selectedFeed, setSelectedFeed] = useState();
  const [pages, setPages] = useState();
  const [selectedPage, setSelectedPage] = useState();

  useEffect(() => {
    service.init().then((state) => setState(state));
  }, []);

  const onTagSelected = (tag) => {
    service
      .onTagSelected({ tag, state: getState() })
      .then((state) => setState(state));
  };

  const onFeedSelected = (feed) => {
    service
      .onFeedSelected({ feed, state: getState() })
      .then((state) => setState(state));
  };

  const onFavoritedArticle = (article) => {
    console.log(article);
  };

  const getState = () => {
    return JSON.parse(
      JSON.stringify({
        articles: articles,
        pages: pages,
        tags: tags,
        feeds: feeds,
        selectedFeed: selectedFeed,
        selectedPage: selectedPage,
      })
    );
  };

  const setState = (input) => {
    setArticles(input.articles);
    setPages(input.pages);
    setTags(input.tags);
    setFeeds(input.feeds);
    setSelectedFeed(input.selectedFeed);
    setSelectedPage(input.selectedPage);
  };

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
                onSelected={onFeedSelected}
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
                      onFavoritedArticle={onFavoritedArticle}
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
              <ConduitTagsPopular tags={tags} onSelected={onTagSelected} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
