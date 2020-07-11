import React from "react";

const ConduitArticlesMeta = ({ article, children }) => (
  <div className="article-meta">
    <a>
      <img src={article.author.image} />
    </a>
    <div className="info">
      <a className="author" href={"#/profile/" + article.author.username}>
        {article.author.username}
      </a>
      <span className="date">
        {new Date(article.createdAt).toLocaleString()}
      </span>
    </div>
    {children}
  </div>
);

export default ConduitArticlesMeta;
