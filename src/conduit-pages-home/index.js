import React, { useState, useEffect } from "react";
import ConduitTagsPopular from "../components/conduit-tags-popular";
import ConduitArticlesList from "../components/conduit-articles-list";
import ConduitArticlesFeed from "../components/conduit-articles-feed";
import {
  init as serviceOnInit,
  onFeedSelected as serviceOnFeedSelected,
  onTagSelected as serviceOnTagSelected,
  onPageSelected as serviceOnPageSelected,
} from "./service";

import { fetchArticles } from "../fetchArticles.http";
import { fetchTags } from "../fetchTags.http";

export default function component(dependencies) {
  !dependencies && (dependencies = {});
  return function ({
    init = serviceOnInit({
      fetchArticles: dependencies.fetchArticles || fetchArticles(),
      fetchTags: dependencies.fetchTags || fetchTags(),
    }),
    onTagSelected = serviceOnFeedSelected({
      fetchArticles: dependencies.fetchArticles || fetchArticles(),
      fetchTags: dependencies.fetchTags || fetchTags(),
    }),
    onFeedSelected = serviceOnTagSelected({
      fetchArticles: dependencies.fetchArticles || fetchArticles(),
      fetchTags: dependencies.fetchTags || fetchTags(),
    }),
    onPageSelected = serviceOnPageSelected({
      fetchArticles: dependencies.fetchArticles || fetchArticles(),
      fetchTags: dependencies.fetchTags || fetchTags(),
    }),
  }) {
    const [state, setState] = useState();

    useEffect(() => {
      init().then((state) => setState(state));
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

    return state ? (
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
              {state["articles.feeds.data"] ? (
                <ConduitArticlesFeed
                  feeds={state["articles.feeds.data"]}
                  selected={state["articles.feeds.selected"]}
                  onSelected={onFeedIsSelected}
                ></ConduitArticlesFeed>
              ) : (
                <div>Loading... </div>
              )}

              {state["articles.list.data"] ? (
                <ConduitArticlesList articles={state["articles.list.data"]} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div className="col-md-3">
              {state["tags.data"] ? (
                <ConduitTagsPopular
                  tags={state["tags.data"]}
                  onSelected={onTagIsSelected}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading... </div>
    );
  };
}
