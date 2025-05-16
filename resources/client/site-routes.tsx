import {RouteObject, useRoutes} from 'react-router-dom';
import React from 'react';
import {ChannelPage} from '@app/channels/channel-page';
import {TitlePage} from '@app/titles/pages/title-page/title-page';
import {SeasonPage} from '@app/seasons/season-page';
import {EpisodePage} from '@app/episodes/episode-page';
import {useSettings} from '@common/core/settings/use-settings';
import {WatchPage} from '@app/videos/watch-page/watch-page';
import {TitleVideosPage} from '@app/titles/pages/title-videos-page';
import {TitleImagesPage} from '@app/titles/pages/title-images-page';
import {PersonPage} from '@app/people/person-page/person-page';
import {TitleFullCreditsPage} from '@app/titles/pages/title-full-credits-page';
import {EpisodeFullCreditsPage} from '@app/episodes/epispde-full-credits-page';
import {NewsArticlePage} from '@app/news/news-article-page';
import {UserListsIndexPage} from '@app/user-lists/pages/user-lists-index-page/user-lists-index-page';
import {EditUserListPage} from '@app/user-lists/pages/edit-user-list-page';
import {CreateUserListPage} from '@app/user-lists/pages/create-user-list-page';
import {SitePageLayout} from '@app/site-page-layout';
import {UserProfilePage} from '@app/profile/user-profile-page';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {ProfileListsPanel} from '@app/profile/panels/profile-lists-panel';
import {ProfileRatingsPanel} from '@app/profile/panels/profile-ratings-panel';
import {ProfileReviewsPanel} from '@app/profile/panels/profile-reviews-panel';
import {ProfileCommentsPanel} from '@app/profile/panels/profile-comments-panel';
import {ProfileFollowersPanel} from '@app/profile/panels/profile-followers-panel';
import {ProfileFollowedUsersPanel} from '@app/profile/panels/profile-followed-users-panel';
import {SearchPage} from '@app/search/search-page';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';

const RouteConfig: RouteObject[] = [
  {
    index: true,
    element: <HomepageChannelPage />,
  },
  {
    path: 'search',
    element: <SearchPage />,
  },
  {
    path: 'search/:query',
    element: <SearchPage />,
  },
  // Watch
  {
    path: 'watch/:videoId',
    element: <WatchPage />,
  },
  // Titles
  {
    path: '/titles/:titleId/:titleSlug',
    element: <TitlePage />,
  },
  {
    path: '/titles/:titleId/:titleSlug/videos',
    element: <TitleVideosPage />,
  },
  {
    path: '/titles/:titleId/:titleSlug/images',
    element: <TitleImagesPage />,
  },
  {
    path: '/titles/:titleId/:titleSlug/full-credits',
    element: <TitleFullCreditsPage />,
  },
  {
    path: '/titles/:titleId/:titleSlug/season/:season',
    element: <SeasonPage />,
  },
  {
    path: '/titles/:titleId/:titleSlug/season/:season/episode/:episode',
    element: <EpisodePage />,
  },
  {
    path: '/titles/:titleId/:titleSlug/season/:season/episode/:episode/full-credits',
    element: <EpisodeFullCreditsPage />,
  },
  // People
  {
    path: '/people/:personId',
    element: <PersonPage />,
  },
  {
    path: '/people/:personId/:personSlug',
    element: <PersonPage />,
  },
  // News
  {
    path: '/news/:articleId',
    element: <NewsArticlePage />,
  },
  // Profile page
  {
    path: 'user/:userId/:slug',
    element: <UserProfilePage />,
    children: [
      {
        index: true,
        element: <ProfileListsPanel />,
      },
      {
        path: 'lists',
        element: <ProfileListsPanel />,
      },
      {
        path: 'ratings',
        element: <ProfileRatingsPanel />,
      },
      {
        path: 'reviews',
        element: <ProfileReviewsPanel />,
      },
      {
        path: 'comments',
        element: <ProfileCommentsPanel />,
      },
      {
        path: 'followers',
        element: <ProfileFollowersPanel />,
      },
      {
        path: 'followed-users',
        element: <ProfileFollowedUsersPanel />,
      },
    ],
  },
  {
    path: 'user/:userId/:slug/:tab',
    element: <UserProfilePage />,
  },
  // User Lists
  {
    path: '/lists',
    element: (
      <AuthRoute>
        <UserListsIndexPage />
      </AuthRoute>
    ),
  },
  {
    path: '/lists/new',
    element: (
      <AuthRoute>
        <SitePageLayout>
          <CreateUserListPage />
        </SitePageLayout>
      </AuthRoute>
    ),
  },
  {
    path: '/lists/:slugOrId',
    element: <ChannelPage type="list" />,
  },
  {
    path: '/lists/:slugOrId/edit',
    element: (
      <SitePageLayout>
        <EditUserListPage />
      </SitePageLayout>
    ),
  },

  // Channels
  {
    path: ':slugOrId',
    element: <ChannelPage />,
  },
  {
    path: 'channel/:slugOrId',
    element: <ChannelPage />,
  },
  {
    path: ':slugOrId/:restriction',
    element: <ChannelPage />,
  },
  {
    path: 'channel/:slugOrId/:restriction',
    element: <ChannelPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

function HomepageChannelPage() {
  const {homepage} = useSettings();
  let slugOrId = 'homepage';
  if (homepage?.type === 'channel' && homepage.value) {
    slugOrId = homepage.value;
  }
  return <ChannelPage slugOrId={slugOrId} />;
}

export default function SiteRoutes() {
  return useRoutes(RouteConfig);
}
