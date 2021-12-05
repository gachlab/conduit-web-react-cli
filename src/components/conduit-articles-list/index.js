import React from "react";
import ConduitArticlesListItem from "../conduit-articles-list-item";

const component = ({ articles }) =>
  articles.map((article) => <ConduitArticlesListItem key={article.slug} article={article} />);

export default component;
