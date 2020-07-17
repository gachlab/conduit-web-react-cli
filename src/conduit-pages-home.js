import React, { useState, useEffect } from "react";
import service from "./conduit-pages-home-service";
import ConduitTagsPopular from "./conduit-tags-popular";
import ConduitArticlesPreview from "./conduit-articles-preview";
import ConduitArticlesMeta from "./conduit-articles-meta";
import ConduitButtonsFavorite from "./conduit-buttons-favorite";
import ConduitArticlesFeed from "./conduit-articles-feed";

const Home = () => {
  const [state, setState] = useState();

  useEffect(() => {
    service.init().then(setState);
  }, []);

  const onTagSelected = (tag) => {
    service.onTagSelected({ tag, state: getState() }).then(setState);
  };

  const onFeedSelected = (feed) => {
    service.onFeedSelected({ feed, state: getState() }).then(setState);
  };

  const onFavoritedArticle = (article) => {
    console.log(article);
  };

  const getState = () => {
    return JSON.parse(JSON.stringify(state));
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
            {state && state.feeds ? (
              <ConduitArticlesFeed
                feeds={state.feeds}
                selected={state.selectedFeed}
                onSelected={onFeedSelected}
              ></ConduitArticlesFeed>
            ) : (
              <div>Loading... </div>
            )}

            {state && state.articles ? (
              state.articles.map((article) => (
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
            {state && state.tags ? (
              <ConduitTagsPopular
                tags={state.tags}
                onSelected={onTagSelected}
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

export default Home;
