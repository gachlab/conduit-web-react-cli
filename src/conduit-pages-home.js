import React, { useState, useEffect } from 'react';

export default (dependencies) => () => {
	const [state, setState] = useState();

	useEffect(() => {
		dependencies.Service.init().then(setState);
	}, []);

	return (
		<div className="home-page">
			<div className="banner">
				<div className="container">
					<h1 className="logo-font">conduit</h1>
					<p>
						A place to share your <i>Angular</i> knowledge.
					</p>
				</div>
			</div>
			<div className="container page">
				<div className="row">
					<div className="col-md-9">
						{state && state.feeds ? (
							<dependencies.ArticlesFeed
								feeds={state.feeds}
								selected={state.selectedFeed}
								onSelected={onFeedSelected}
							></dependencies.ArticlesFeed>
						) : (
							<div>Loading... </div>
						)}

						{state && state.articles ? (
							<dependencies.ArticlesList articles={state.articles} />
						) : (
							<div>Loading...</div>
						)}
					</div>
					<div className="col-md-3">
						{state && state.tags ? (
							<dependencies.TagsPopular tags={state.tags} onSelected={onTagSelected} />
						) : (
							<div>Loading...</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	function onTagSelected(tag) {
		dependencies.Service.onTagSelected({ tag, state: getState() }).then(setState);
	}

	function onFeedSelected(feed) {
		dependencies.Service.onFeedSelected({ feed, state: getState() }).then(setState);
	}

	function getState() {
		return JSON.parse(JSON.stringify(state));
	}
};
