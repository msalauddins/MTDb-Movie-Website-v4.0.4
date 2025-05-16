import './app.css';
import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {CommonProvider} from '@common/core/common-provider';
import * as Sentry from '@sentry/react';
import {rootEl} from '@common/core/root-el';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {ignoredSentryErrors} from '@common/errors/ignored-sentry-errors';
import {UserLink} from '@app/profile/user-link';
import {UserProfile} from '@app/profile/user-profile';
import {LandingPageContent} from '@app/landing-page/landing-page-content';
import {Title} from '@app/titles/models/title';
import {GetTitleResponse} from '@app/titles/requests/use-title';
import {BrowserRouter} from 'react-router-dom';
import {AppRoutes} from '@app/app-routes';
import {GetSeasonResponse} from '@app/seasons/requests/use-season';
import {GetChannelResponse} from '@common/channels/requests/use-channel';
import {Product} from '@common/billing/product';
import {GetEpisodeResponse} from '@app/episodes/requests/use-episode';
import {GetPersonResponse} from '@app/people/requests/use-person';
import {SearchResponse} from '@app/search/requests/use-search-results';
import {GetNewsArticleResponse} from '@app/admin/news/requests/use-news-article';
import {UseWatchPageVideoResponse} from '@app/videos/requests/use-watch-page-video';
import {FetchCustomPageResponse} from '@common/custom-page/use-custom-page';
import {TitlePageSections} from '@app/titles/pages/title-page/sections/title-page-sections';

declare module '@common/http/value-lists' {
  interface FetchValueListsResponse {
    titleFilterLanguages: {value: string; name: string}[];
    productionCountries: {value: string; name: string}[];
    genres: {value: string; name: string}[];
    keywords: {value: string; name: string}[];
    titleFilterAgeRatings: {value: string; name: string}[];
    tmdbLanguages: {name: string; code: string}[];
    tmdbDepartments: {department: string; jobs: string[]}[];
  }
}

declare module '@common/core/bootstrap-data/bootstrap-data' {
  interface BootstrapData {
    loaders?: {
      titlePage?: GetTitleResponse;
      titleCreditsPage?: GetTitleResponse;
      title?: GetTitleResponse;
      editTitlePage?: GetTitleResponse;
      seasonPage?: GetSeasonResponse;
      season?: GetSeasonResponse;
      editSeasonPage?: GetSeasonResponse;
      episode?: GetEpisodeResponse;
      episodePage?: GetEpisodeResponse;
      episodeCreditsPage?: GetEpisodeResponse;
      channelPage?: GetChannelResponse;
      editChannelPage?: GetChannelResponse;
      editUserListPage?: GetChannelResponse;
      personPage?: GetPersonResponse;
      editPersonPage?: GetPersonResponse;
      searchPage?: SearchResponse;
      searchAutocomplete?: SearchResponse;
      newsArticlePage?: GetNewsArticleResponse;
      watchPage?: UseWatchPageVideoResponse;
      customPage?: FetchCustomPageResponse;
      landingPage?: {
        products: Product[];
        trendingTitles: Title[];
      };
    };
  }
}

declare module '@common/core/settings/settings' {
  interface Settings {
    homepage?: {
      type?: string;
      value?: string;
      pricing?: boolean;
      appearance: LandingPageContent;
      trending?: boolean;
    };
    ads?: {
      general_top?: string;
      general_bottom?: string;
      title_top?: string;
      person_top?: string;
      watch_top?: string;
      disable?: boolean;
    };
    tmdb_is_setup: boolean;
    streaming: {
      default_sort: string;
      show_header_play: boolean;
      prefer_full: boolean;
      qualities: string[];
      show_video_selector: boolean;
    };
    comments?: {
      per_video: boolean;
    };
    titles: {
      video_panel_mode?: 'hide' | 'carousel' | 'table';
      enable_reviews?: boolean;
      enable_comments?: boolean;
    };
    title_page?: {
      sections: (typeof TitlePageSections)[number][];
    };
    content: {
      title_provider?: 'tmdb';
      people_provider?: 'tmdb';
      search_provider: 'local' | 'tmdb' | 'all';
    };
  }
}

declare module '@common/auth/user' {
  interface User {
    profile?: UserProfile;
    links?: UserLink[];
    lists_count?: number;
    is_pro?: boolean;
  }
}

const data = getBootstrapData();
const sentryDsn = data.settings.logging.sentry_public;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.2,
    ignoreErrors: ignoredSentryErrors,
    release: data.sentry_release,
  });
}

const app = (
  <BrowserRouter basename={data.settings.html_base_uri}>
    <CommonProvider>
      <AppRoutes />
    </CommonProvider>
  </BrowserRouter>
);

if (data.rendered_ssr) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
