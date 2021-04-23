import React from 'react';

export default (props) => (
	<div className="sidebar">
		<p>Popular Tags</p>

		{props.tags && props.tags.length === 0 && <div>No tags are here... yet.</div>}

		{props.tags && props.tags.length > 0 && (
			<div className="tag-list">
				{props.tags.map((tag) => (
					<a key={tag} className="tag-default tag-pill" onClick={() => props.onSelected(tag)}>
						{tag}
					</a>
				))}
			</div>
		)}
	</div>
);
