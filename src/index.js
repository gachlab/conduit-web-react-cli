import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ConduitLayoutHeader from './conduit-layout-header';
import ConduitLayoutFooter from './conduit-layout-footer';

import ConduitPagesHome from './conduit-pages-home';
import HomePageService from './conduit-pages-home-service';

import ConduitTagsPopular from './conduit-tags-popular';
import ConduitArticlesList from './conduit-articles-list';
import ConduitArticlesFeed from './conduit-articles-feed';
import ConduitArticlesListItem from './conduit-articles-list-item';

import ConduitArticlesPreview from './conduit-articles-preview';
import ConduitArticlesMeta from './conduit-articles-meta';
import ConduitButtonsFavorite from './conduit-buttons-favorite';

import * as serviceWorker from './serviceWorker';

const Conduit = App({
	Header: ConduitLayoutHeader,
	Footer: ConduitLayoutFooter,
	Home: ConduitPagesHome({
		Service: HomePageService,
		TagsPopular: ConduitTagsPopular,
		ArticlesList: ConduitArticlesList({
			ArticlesListItem: ConduitArticlesListItem({
				ArticlesPreview: ConduitArticlesPreview,
				ArticlesMeta: ConduitArticlesMeta,
				ButtonsFavorite: ConduitButtonsFavorite,
			}),
		}),
		ArticlesFeed: ConduitArticlesFeed,
	}),
});

ReactDOM.render(
	<React.StrictMode>
		<Conduit />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
