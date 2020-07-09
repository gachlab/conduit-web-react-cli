import React from "react";

const ConduitButtonsFavorite = ({ article, onFavoritedArticle }) => (
  <div className="pull-xs-right">
    <button
      className="btn btn-sm btn-outline-primary"
      onClick={() => onFavoritedArticle(article)}
    >
      <i className="ion-heart"></i>
      {article.favoritesCount}
    </button>
  </div>
);

export default ConduitButtonsFavorite;
