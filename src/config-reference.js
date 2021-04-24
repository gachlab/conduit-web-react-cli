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
import fetchArticlesApi from './fetchArticles-api';
import fetchTagsApi from './fetchTags-api';

export default {
	Header: ConduitLayoutHeader,
	Home: ConduitPagesHome({
		Service: HomePageService({
			fetchArticles: fetchArticlesApi,
			fetchTags: fetchTagsApi,
		}),
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
	Footer: ConduitLayoutFooter,
};
