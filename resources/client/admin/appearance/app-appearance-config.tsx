import {
  IAppearanceConfig,
  MenuSectionConfig,
  SeoSettingsSectionConfig,
} from '@common/admin/appearance/types/appearance-editor-config';
import {message} from '@common/i18n/message';
import {LandingPageSectionGeneral} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-general';
import {LandingPageSectionActionButtons} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-action-buttons';
import {LandingPageSectionPrimaryFeatures} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-primary-features';
import {LandingPageSecondaryFeatures} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-secondary-features';
import {AppearanceEditorBreadcrumbItem} from '@common/admin/appearance/types/appearance-editor-section';

export const AppAppearanceConfig: IAppearanceConfig = {
  preview: {
    defaultRoute: 'dashboard',
    navigationRoutes: ['dashboard'],
  },
  sections: {
    'landing-page': {
      label: message('Landing Page'),
      position: 1,
      previewRoute: '/',
      routes: [
        {path: 'landing-page', element: <LandingPageSectionGeneral />},
        {
          path: 'landing-page/action-buttons',
          element: <LandingPageSectionActionButtons />,
        },
        {
          path: 'landing-page/primary-features',
          element: <LandingPageSectionPrimaryFeatures />,
        },
        {
          path: 'landing-page/secondary-features',
          element: <LandingPageSecondaryFeatures />,
        },
      ],
      buildBreadcrumb: pathname => {
        const parts = pathname.split('/').filter(p => !!p);
        const sectionName = parts.pop();
        // admin/appearance
        const breadcrumb: AppearanceEditorBreadcrumbItem[] = [
          {
            label: message('Landing page'),
            location: 'landing-page',
          },
        ];
        if (sectionName === 'action-buttons') {
          breadcrumb.push({
            label: message('Action buttons'),
            location: 'landing-page/action-buttons',
          });
        }

        if (sectionName === 'primary-features') {
          breadcrumb.push({
            label: message('Primary features'),
            location: 'landing-page/primary-features',
          });
        }

        if (sectionName === 'secondary-features') {
          breadcrumb.push({
            label: message('Secondary features'),
            location: 'landing-page/secondary-features',
          });
        }

        return breadcrumb;
      },
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          'sidebar-primary',
          'sidebar-secondary',
          'mobile-bottom',
          'landing-page-navbar',
          'landing-page-footer',
        ],
        availableRoutes: [
          '/lists',
          '/watchlist',
          '/admin/channels',
          '/admin/comments',
        ],
      } as MenuSectionConfig,
    },
    // @ts-ignore
    'seo-settings': {
      config: {
        pages: [
          {
            key: 'title-page',
            label: message('Title page'),
          },
          {
            key: 'season-page',
            label: message('Season page'),
          },
          {
            key: 'episode-page',
            label: message('Episode page'),
          },
          {
            key: 'watch-page',
            label: message('Watch page'),
          },
          {
            key: 'person-page',
            label: message('Person page'),
          },
          {
            key: 'landing-page',
            label: message('Landing page'),
          },
          {
            key: 'news-article-page',
            label: message('News article page'),
          },
          {
            key: 'channel-page',
            label: message('Channel page'),
          },
        ],
      } as SeoSettingsSectionConfig,
    },
  },
};
