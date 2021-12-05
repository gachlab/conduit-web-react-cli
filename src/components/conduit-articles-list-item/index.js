import React from "react";

import ConduitArticlesPreview from "../conduit-articles-preview";
import ConduitArticlesMeta from "../conduit-articles-meta";
import ConduitButtonsFavorite from "../conduit-buttons-favorite";

const onFavoritedArticle = (article) => {
  console.log(article);
};

const component = ({ article }) => (
  <ConduitArticlesPreview article={article} key={article.slug}>
    <ConduitArticlesMeta article={article} key={article.slug}>
      <ConduitButtonsFavorite
        article={article}
        onFavoritedArticle={onFavoritedArticle}
        key={article.slug}
      ></ConduitButtonsFavorite>
    </ConduitArticlesMeta>
  </ConduitArticlesPreview>
);

export default component;
