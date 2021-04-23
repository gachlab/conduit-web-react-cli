import React from 'react';

export default (props) => (
	<div className="feed-toggle">
		<ul className="nav nav-pills outline-active">
			{props.feeds.map((feed) => (
				<li key={feed.id} className="nav-item">
					<a
						className={feed.id === props.selected ? 'active nav-link' : 'nav-link'}
						onClick={() => props.onSelected(feed)}
					>
						{feed.name}
					</a>
				</li>
			))}
		</ul>
	</div>
);
