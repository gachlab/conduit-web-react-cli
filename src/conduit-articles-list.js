import React from 'react';

export default (dependencies) => (props) =>
	props.articles.map((article) => <dependencies.ArticlesListItem key={article.slug} article={article} />);
