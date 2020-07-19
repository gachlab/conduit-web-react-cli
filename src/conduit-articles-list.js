import React from "react";
import ConduitArticlesListItem from "./conduit-articles-list-item";

const component = ({ articles }) =>
  articles.map((article) => <ConduitArticlesListItem article={article} />);

export default component;
