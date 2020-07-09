import React from "react";

const ConduitArticlesPreview = ({ article, children }) => (
  <div>
    <div className="article-preview">
      {children}
      <a className="preview-link" href={article.href}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </div>
  </div>
);

export default ConduitArticlesPreview;
