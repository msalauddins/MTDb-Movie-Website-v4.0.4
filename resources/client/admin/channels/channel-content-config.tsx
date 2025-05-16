import {message} from '@common/i18n/message';
import {
  MOVIE_MODEL,
  SERIES_MODEL,
  Title,
  TITLE_MODEL,
} from '@app/titles/models/title';
import {NEWS_ARTICLE_MODEL, NewsArticle} from '@app/titles/models/news-article';
import {Channel, CHANNEL_MODEL} from '@common/channels/channel';
import {ChannelContentConfig} from '@common/admin/channels/channel-editor/channel-content-config';
import {Person, PERSON_MODEL} from '@app/titles/models/person';
import {GridViewIcon} from '@common/icons/material/GridView';
import {ViewWeekIcon} from '@common/icons/material/ViewWeek';
import {ViewListIcon} from '@common/icons/material/ViewList';

export enum Sort {
  popular = 'popularity:desc',
  recent = 'created_at:desc',
  rating = 'rating:desc',
  curated = 'channelables.order:asc',
  name = 'name:asc',
  birthdayDesc = 'birth_date:desc',
  birthdayAsc = 'birth_date:asc',
  budget = 'budget:desc',
  revenue = 'revenue:desc',
}
export enum Layout {
  grid = 'grid',
  landscapeGrid = 'landscapeGrid',
  list = 'list',
  news = 'news',
  carousel = 'carousel',
  landscapeCarousel = 'landscapeCarousel',
  slider = 'slider',
}
enum Auto {
  latestVideos = 'latestVideos',
  mostPopular = 'mostPopular',
  topRated = 'topRated',
  upcoming = 'upcoming',
  nowPlaying = 'nowPlaying',
  airingToday = 'airingToday',
  airingThisWeek = 'airingThisWeek',
  trendingPeople = 'trendingPeople',
  discover = 'discover',
}

const contentModels: ChannelContentConfig['models'] = {
  [MOVIE_MODEL]: {
    label: message('Movies'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.rating,
      Sort.budget,
      Sort.revenue,
    ],
    layoutMethods: [
      Layout.grid,
      Layout.landscapeGrid,
      Layout.list,
      Layout.carousel,
      Layout.landscapeCarousel,
      Layout.slider,
    ],
    autoUpdateMethods: [
      Auto.latestVideos,
      Auto.mostPopular,
      Auto.topRated,
      Auto.upcoming,
      Auto.nowPlaying,
      Auto.discover,
    ],
  },
  [SERIES_MODEL]: {
    label: message('TV series'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.rating,
      Sort.budget,
      Sort.revenue,
    ],
    layoutMethods: [
      Layout.grid,
      Layout.landscapeGrid,
      Layout.list,
      Layout.carousel,
      Layout.landscapeCarousel,
      Layout.slider,
    ],
    autoUpdateMethods: [
      Auto.latestVideos,
      Auto.mostPopular,
      Auto.topRated,
      Auto.airingThisWeek,
      Auto.airingToday,
      Auto.discover,
    ],
  },
  [TITLE_MODEL]: {
    label: message('Titles (movies and series)'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.rating,
      Sort.budget,
      Sort.revenue,
    ],
    layoutMethods: [
      Layout.grid,
      Layout.landscapeGrid,
      Layout.list,
      Layout.carousel,
      Layout.landscapeCarousel,
      Layout.slider,
    ],
    autoUpdateMethods: [Auto.latestVideos],
  },
  [NEWS_ARTICLE_MODEL]: {
    label: message('News articles'),
    sortMethods: [Sort.recent],
    layoutMethods: [Layout.news, Layout.landscapeCarousel, Layout.list],
  },
  [PERSON_MODEL]: {
    label: message('People'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.name,
      Sort.birthdayDesc,
      Sort.birthdayAsc,
    ],
    layoutMethods: [Layout.grid, Layout.list, Layout.carousel],
    autoUpdateMethods: [Auto.trendingPeople],
  },
  [CHANNEL_MODEL]: {
    label: message('Channels'),
    sortMethods: [],
    layoutMethods: [Layout.list],
  },
};

const contentSortingMethods: Record<
  Sort,
  ChannelContentConfig['sortingMethods']['any']
> = {
  [Sort.popular]: {
    label: message('Most popular first'),
  },
  [Sort.recent]: {
    label: message('Recently added first'),
  },
  [Sort.rating]: {
    label: message('Highest rated first'),
  },
  [Sort.curated]: {
    label: message('Curated (reorder below)'),
    contentTypes: ['manual'],
  },
  [Sort.name]: {
    label: message('Name (A-Z)'),
    contentTypes: ['manual'],
  },
  [Sort.birthdayDesc]: {
    label: message('Youngest first'),
  },
  [Sort.birthdayAsc]: {
    label: message('Oldest first'),
  },
  [Sort.budget]: {
    label: message('Biggest budget first'),
  },
  [Sort.revenue]: {
    label: message('Biggest revenue first'),
  },
};

const contentLayoutMethods: Record<
  Layout,
  ChannelContentConfig['layoutMethods']['any']
> = {
  [Layout.grid]: {
    label: message('Grid'),
    icon: <GridViewIcon />,
  },
  [Layout.landscapeGrid]: {
    label: message('Landscape'),
    icon: <ViewWeekIcon />,
  },
  [Layout.list]: {
    label: message('List'),
    icon: <ViewListIcon />,
  },
  [Layout.carousel]: {
    label: message('Carousel (portrait)'),
  },
  [Layout.landscapeCarousel]: {
    label: message('Carousel (landscape)'),
  },
  [Layout.slider]: {
    label: message('Slider'),
  },
  [Layout.news]: {
    label: message('News'),
  },
};

const contentAutoUpdateMethods: Record<
  Auto,
  ChannelContentConfig['autoUpdateMethods']['any']
> = {
  [Auto.discover]: {
    label: message('Discover (TMDB only)'),
    provider: 'tmdb',
  },
  [Auto.mostPopular]: {
    label: message('Most popular'),
  },
  [Auto.topRated]: {
    label: message('Top rated'),
  },
  [Auto.upcoming]: {
    label: message('Upcoming'),
  },
  [Auto.nowPlaying]: {
    label: message('In theaters'),
  },
  [Auto.airingToday]: {
    label: message('Airing today'),
  },
  [Auto.airingThisWeek]: {
    label: message('Airing this week'),
  },
  [Auto.trendingPeople]: {
    label: message('Trending people'),
  },
  [Auto.latestVideos]: {
    label: message('Most recently published videos'),
    provider: 'local',
  },
};
export const channelContentConfig: ChannelContentConfig = {
  models: contentModels,
  sortingMethods: contentSortingMethods,
  layoutMethods: contentLayoutMethods,
  autoUpdateMethods: contentAutoUpdateMethods,
  userSelectableLayouts: [Layout.grid, Layout.landscapeGrid, Layout.list],
};

export type ChannelContentModel = (Title | NewsArticle | Person | Channel) & {
  channelable_id?: number;
  channelable_order?: number;
};
