import React from 'react';

export default (dependencies) => (props) => (
	<dependencies.ArticlesPreview article={props.article} key={props.article.slug}>
		<dependencies.ArticlesMeta article={props.article} key={props.article.slug}>
			<dependencies.ButtonsFavorite
				article={props.article}
				onFavoritedArticle={props.onFavoritedArticle}
				key={props.article.slug}
			></dependencies.ButtonsFavorite>
		</dependencies.ArticlesMeta>
	</dependencies.ArticlesPreview>
);
