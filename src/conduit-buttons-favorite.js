import React from 'react';

export default (props) => (
	<div className="pull-xs-right">
		<button className="btn btn-sm btn-outline-primary" onClick={() => props.onFavoritedArticle(props.article)}>
			<i className="ion-heart"></i>
			{props.article.favoritesCount}
		</button>
	</div>
);
