import React, { useState, useEffect } from "react";
import ConduitTagsPopular from "../components/conduit-tags-popular";
import ConduitArticlesList from "../components/conduit-articles-list";
import ConduitArticlesFeed from "../components/conduit-articles-feed";

const Home = ({ init, onTagSelected, onFeedSelected, onPageSelected }) => {
  const [state, setState] = useState();

  useEffect(() => {
    init().then(setState);
  }, []);

  const onTagIsSelected = (tag) => {
    onTagSelected({ tag, state: getState() }).then(setState);
  };

  const onFeedIsSelected = (feed) => {
    onFeedSelected({ feed, state: getState() }).then(setState);
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
                onSelected={onFeedIsSelected}
              ></ConduitArticlesFeed>
            ) : (
              <div>Loading... </div>
            )}

            {state && state.articles ? (
              <ConduitArticlesList articles={state.articles} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="col-md-3">
            {state && state.tags ? (
              <ConduitTagsPopular
                tags={state.tags}
                onSelected={onTagIsSelected}
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
