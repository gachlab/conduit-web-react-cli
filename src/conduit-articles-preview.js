import React from 'react';

export default (props) => (
	<div>
		<div className="article-preview">
			{props.children}
			<a className="preview-link" href={props.article.href}>
				<h1>{props.article.title}</h1>
				<p>{props.article.description}</p>
				<span>Read more...</span>
				<ul className="tag-list">
					{props.article.tagList.map((tag) => (
						<li key={tag} className="tag-default tag-pill tag-outline">
							{tag}
						</li>
					))}
				</ul>
			</a>
		</div>
	</div>
);
