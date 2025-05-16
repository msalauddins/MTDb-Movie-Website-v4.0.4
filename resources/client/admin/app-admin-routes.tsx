import {Navigate, RouteObject} from 'react-router-dom';
import React from 'react';
import {ChannelsDatatablePage} from '@common/admin/channels/channels-datatable-page';
import {EditChannelPage} from '@app/admin/channels/edit-channel-page';
import {CreateChannelPage} from '@app/admin/channels/create-channel-page';
import {NewsDatatablePage} from '@app/admin/news/news-datatable-page';
import {CommentsDatatablePage} from '@common/comments/comments-datatable-page/comments-datatable-page';
import {ReviewsDatatablePage} from '@app/admin/reviews/reviews-datatable-page';
import {VideosDatatablePage} from '@app/admin/videos/videos-datatable-page';
import {CreateVideoPage} from '@app/admin/videos/crupdate/create-video-page';
import {EditVideoPage} from '@app/admin/videos/crupdate/edit-video-page';
import {TitlesDatatablePage} from '@app/admin/titles/titles-datatable-page';
import {EditTitlePage} from '@app/admin/titles/title-editor/edit-title-page';
import {SeasonEditorEpisodeList} from '@app/admin/titles/title-editor/seasons-editor/season-editor-episode-list';
import {TitleSeasonsEditor} from '@app/admin/titles/title-editor/seasons-editor/title-seasons-editor';
import {TitlePrimaryFactsForm} from '@app/admin/titles/title-editor/title-primary-facts-form';
import {TitleReviewsEditor} from '@app/admin/titles/title-editor/title-reviews-editor';
import {TitleImagesEditor} from '@app/admin/titles/title-editor/title-images-editor';
import {TitleVideosEditor} from '@app/admin/titles/title-editor/videos-editor/title-videos-editor';
import {EpisodePrimaryFactsForm} from '@app/admin/titles/title-editor/episode-editor/episode-primary-facts-form';
import {EpisodeCastEditor} from '@app/admin/titles/title-editor/episode-editor/episode-cast-editor';
import {TitleCastEditor} from '@app/admin/titles/title-editor/credits-editor/title-cast-editor';
import {TitleCrewEditor} from '@app/admin/titles/title-editor/credits-editor/title-crew-editor';
import {SeasonCastEditor} from '@app/admin/titles/title-editor/seasons-editor/season-cast-editor';
import {SeasonCrewEditor} from '@app/admin/titles/title-editor/seasons-editor/season-crew-editor';
import {EpisodeCrewEditor} from '@app/admin/titles/title-editor/episode-editor/episode-crew-editor';
import {TitleTagsEditor} from '@app/admin/titles/title-editor/title-tags-editor/title-tags-editor';
import {GENRE_MODEL} from '@app/titles/models/genre';
import {KEYWORD_MODEL} from '@app/titles/models/keyword';
import {PRODUCTION_COUNTRY_MODEL} from '@app/titles/models/production-country';
import {TitleCommentsEditor} from '@app/admin/titles/title-editor/title-comments-editor';
import {PeopleDatatablePage} from '@app/admin/people/people-datatable-page';
import {CreatePersonPage} from '@app/admin/people/crupdate/create-person-page';
import {UpdatePersonPage} from '@app/admin/people/crupdate/update-person-page';
import {PersonPrimaryFactsForm} from '@app/admin/people/crupdate/person-primary-facts-form';
import {PersonCreditsEditor} from '@app/admin/people/crupdate/person-credits-editor';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {EditNewsArticlePage} from '@app/admin/news/edit-news-article-page';
import {CreateNewsArticlePage} from '@app/admin/news/create-news-article-page';
import {TitleTagsDatatablePage} from '@app/admin/title-tags/title-tags-editor/title-tags-datatable-page';
import {ListsDatatablePage} from '@app/admin/lists/lists-datatable-page';
import {CreateUserListPage} from '@app/user-lists/pages/create-user-list-page';
import {EditUserListPage} from '@app/user-lists/pages/edit-user-list-page';
import {MtdbAdminReportPage} from '@app/admin/reports/mtdb-admin-report-page';
import {AdminInsightsReport} from '@app/admin/reports/admin-insights-report';
import {AdminVisitorsReport} from '@app/admin/reports/admin-visitors-report';
import {TitleInsightsPage} from '@app/admin/reports/pages/title-insights-page';
import {EpisodeInsightsPage} from '@app/admin/reports/pages/episode-insights-page';
import {SeasonInsightsPage} from '@app/admin/reports/pages/season-insights-page';
import {VideoInsightsPage} from '@app/admin/reports/pages/video-insights-page';

export const AppAdminRoutes: RouteObject[] = [
  // Reports
  {
    path: '/',
    element: <MtdbAdminReportPage />,
    children: [
      {index: true, element: <AdminInsightsReport />},
      {path: 'plays', element: <AdminInsightsReport />},
      {path: 'visitors', element: <AdminVisitorsReport />},
    ],
  },
  // Channels
  {
    path: 'channels',
    element: <ChannelsDatatablePage />,
  },
  {
    path: 'channels/new',
    element: <CreateChannelPage />,
  },
  {
    path: 'channels/:slugOrId/edit',
    element: <EditChannelPage />,
  },

  // User lists
  {
    path: 'lists',
    element: <ListsDatatablePage />,
  },
  {
    path: 'lists/new',
    element: <CreateUserListPage />,
  },
  {
    path: 'lists/:slugOrId/edit',
    element: <EditUserListPage />,
  },

  // People
  {
    path: 'people',
    element: <PeopleDatatablePage />,
  },
  {
    path: 'people/new',
    element: <CreatePersonPage />,
  },
  {
    path: 'people/:personId/edit',
    element: <UpdatePersonPage />,
    children: [
      {
        index: true,
        element: <Navigate to="primary-facts" replace />,
      },
      {
        path: 'primary-facts',
        element: <PersonPrimaryFactsForm />,
      },
      {
        path: 'credits',
        element: <PersonCreditsEditor />,
      },
    ],
  },

  // Titles
  {
    path: 'titles',
    element: <TitlesDatatablePage />,
  },
  {
    path: 'titles/new',
    element: <TitlePrimaryFactsForm />,
  },
  {
    path: 'videos/:videoId/insights',
    element: <VideoInsightsPage />,
  },
  {
    path: 'titles/:titleId/insights',
    element: <TitleInsightsPage />,
  },
  {
    path: 'titles/:titleId/insights/seasons/:season',
    element: <SeasonInsightsPage />,
  },
  {
    path: 'titles/:titleId/insights/seasons/:season/episodes/:episode',
    element: <EpisodeInsightsPage />,
  },
  {
    path: 'titles/:titleId/edit',
    element: <Navigate to="primary-facts" replace={true} />,
  },
  {
    path: 'titles/:titleId/edit',
    element: <EditTitlePage />,
    children: [
      {
        index: true,
        element: <TitlePrimaryFactsForm />,
      },
      {
        path: 'primary-facts',
        element: <TitlePrimaryFactsForm />,
      },
      {
        path: 'reviews',
        element: <TitleReviewsEditor />,
      },
      {
        path: 'comments',
        element: <TitleCommentsEditor />,
      },
      {
        path: 'images',
        element: <TitleImagesEditor />,
      },
      {
        path: 'genres',
        element: <TitleTagsEditor type={GENRE_MODEL} />,
      },
      {
        path: 'keywords',
        element: <TitleTagsEditor type={KEYWORD_MODEL} />,
      },
      {
        path: 'countries',
        element: <TitleTagsEditor type={PRODUCTION_COUNTRY_MODEL} />,
      },
      {
        path: 'cast',
        element: <TitleCastEditor />,
      },
      {
        path: 'crew',
        element: <TitleCrewEditor />,
      },
      {
        path: 'videos',
        element: <TitleVideosEditor />,
      },
      {
        path: 'videos/seasons/:season',
        element: <TitleVideosEditor />,
      },
      {
        path: 'videos/seasons/:season/episodes/:episode',
        element: <TitleVideosEditor />,
      },

      // SEASONS
      {
        path: 'seasons',
        element: <TitleSeasonsEditor />,
      },
      {
        path: 'seasons/:season',
        children: [
          {
            index: true,
            element: <Navigate to="episodes" replace />,
          },
          {
            path: 'Episodes',
            element: <SeasonEditorEpisodeList />,
          },
          {
            path: 'cast',
            element: <SeasonCastEditor />,
          },
          {
            path: 'crew',
            element: <SeasonCrewEditor />,
          },
        ],
      },

      // EPISODES
      {
        path: 'seasons/:season/episodes/new',
        element: <EpisodePrimaryFactsForm />,
      },
      {
        path: 'seasons/:season/episodes/:episode',
        children: [
          {
            index: true,
            element: <Navigate to="primary-facts" replace />,
          },
          {
            path: 'primary-facts',
            element: <EpisodePrimaryFactsForm />,
          },
          {
            path: 'cast',
            element: <EpisodeCastEditor />,
          },
          {
            path: 'crew',
            element: <EpisodeCrewEditor />,
          },
        ],
      },
    ],
  },

  // Video editor with no season or episode selected
  {
    path: 'titles/:titleId/edit/videos/new',
    element: <CreateVideoPage />,
  },

  {
    path: 'titles/:titleId/edit/videos/edit/:videoId',
    element: <EditVideoPage />,
  },

  // Video editor with season selected
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/new',
    element: <CreateVideoPage />,
  },
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/edit/:videoId',
    element: <EditVideoPage />,
  },

  // Video editor with season and episode selected
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/episodes/:episode/new',
    element: <CreateVideoPage />,
  },
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/episodes/:episode/edit/:videoId',
    element: <EditVideoPage />,
  },

  // News articles
  {
    path: 'news',
    element: <NewsDatatablePage />,
  },
  {
    path: 'news/add',
    element: (
      <AuthRoute permission="news.update">
        <CreateNewsArticlePage />
      </AuthRoute>
    ),
  },
  {
    path: 'news/:articleId/edit',
    element: (
      <AuthRoute permission="news.update">
        <EditNewsArticlePage />
      </AuthRoute>
    ),
  },

  // Comments
  {
    path: 'comments',
    element: <CommentsDatatablePage />,
  },

  // Reviews
  {
    path: 'reviews',
    element: <ReviewsDatatablePage />,
  },

  // Videos
  {
    path: 'videos',
    element: <VideosDatatablePage />,
  },
  {
    path: 'videos/new',
    element: <CreateVideoPage />,
  },
  {
    path: 'videos/:videoId/edit',
    element: <EditVideoPage />,
  },

  // Title tags
  {
    path: 'keywords',
    element: <TitleTagsDatatablePage type={KEYWORD_MODEL} />,
  },
  {
    path: 'genres',
    element: <TitleTagsDatatablePage type={GENRE_MODEL} />,
  },
];
