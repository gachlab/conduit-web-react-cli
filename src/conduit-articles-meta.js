import React from 'react';

export default (props) => (
	<div className="article-meta">
		<a>
			<img src={props.article.author.image} />
		</a>
		<div className="info">
			<a className="author" href={'#/profile/' + props.article.author.username}>
				{props.article.author.username}
			</a>
			<span className="date">{new Date(props.article.createdAt).toLocaleString()}</span>
		</div>
		{props.children}
	</div>
);
