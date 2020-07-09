import React, { useState, useEffect } from "react";
import ConduitTagsPopular from "./ConduitTagsPopular";
import HomePageService from "./home-page-service";
import ConduitArticlesList from "./ConduitArticlesList";
import ConduitArticlesListItem from "./ConduitArticlesListitem";
import ConduitArticlesPreview from "./ConduitArticlesPreview";
import ConduitArticlesMeta from "./ConduitArticlesMeta";
import ConduitButtonsFavorite from "./ConduitButtonsFavorite";
import ConduitArticlesFeed from "./ConduitArticlesFeed";

const Home = (props) => {
  const [tags, setTags] = useState();
  const [articles, setArticles] = useState();
  const [feeds, setFeeds] = useState([
    { id: "personal", name: "Your feed" },
    { id: "all", name: "Global Feed" },
  ]);
  const [selectedFeed, setSelectedFeed] = useState("all");

  useEffect(() => {
    HomePageService.fetchTags().then((tags) => setTags(tags));

    HomePageService.fetchArticles({
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
            <ConduitArticlesFeed
              feeds={feeds}
              selected={selectedFeed}
              onSelected={onFeedSelected({
                setArticles,
                setSelectedFeed,
                HomePageService,
                feeds,
              })}
            ></ConduitArticlesFeed>
            <ConduitArticlesList>
              {articles
                ? articles.map((article) => (
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
                : ""}
            </ConduitArticlesList>
          </div>
          <div className="col-md-3">
            <ConduitTagsPopular
              tags={tags}
              onSelected={onTagSelected({
                setArticles,
                setSelectedFeed,
                HomePageService,
                feeds,
              })}
            />
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
