import React, { useState, useEffect } from "react";
import ConduitTagsPopular from "./conduit-tags-popular";
import ConduitHomePageService from "./conduit-home-page-service";
import ConduitArticlesList from "./conduit-articles-list";
import ConduitArticlesListItem from "./conduit-articles-list-item";
import ConduitArticlesPreview from "./conduit-articles-preview";
import ConduitArticlesMeta from "./conduit-articles-meta";
import ConduitButtonsFavorite from "./conduit-buttons-favorite";
import ConduitArticlesFeed from "./conduit-articles-feed";

const Home = (props) => {
  const [tags, setTags] = useState();
  const [articles, setArticles] = useState();
  const [feeds, setFeeds] = useState();
  const [selectedFeed, setSelectedFeed] = useState("all");

  useEffect(() => {
    ConduitHomePageService.fetchTags().then((tags) => setTags(tags));
    setFeeds([
      { id: "personal", name: "Your feed" },
      { id: "all", name: "Global Feed" },
    ]);
    ConduitHomePageService.fetchArticles({
      limit: 10,
      offset: 0,
      feed: { id: "all", name: "Global Feed" },
    }).then((articles) => setArticles(articles));
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
                  HomePageService: ConduitHomePageService,
                  feeds,
                })}
              ></ConduitArticlesFeed>
            ) : (
              <div>Loading... </div>
            )}

            <ConduitArticlesList>
              {articles ? (
                articles.map((article) => (
                  <ConduitArticlesListItem key={article.slug}>
                    <ConduitArticlesPreview article={article}>
                      <ConduitArticlesMeta article={article}>
                        <ConduitButtonsFavorite
                          article={article}
                          onFavoritedArticle={onFavoritedArticle()}
                        ></ConduitButtonsFavorite>
                      </ConduitArticlesMeta>
                    </ConduitArticlesPreview>
                  </ConduitArticlesListItem>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </ConduitArticlesList>
          </div>
          <div className="col-md-3">
            {tags ? (
              <ConduitTagsPopular
                tags={tags}
                onSelected={onTagSelected({
                  setArticles,
                  setSelectedFeed,
                  HomePageService: ConduitHomePageService,
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
