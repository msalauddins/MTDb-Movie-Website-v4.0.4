import {RouteObject} from 'react-router-dom';
import {VideoSettings} from '@app/admin/settings/video-settings';
import {ContentSettings} from '@app/admin/settings/content-settings/content-settings';
import {SearchSettings} from '@common/admin/settings/pages/search-settings/search-settings';

export const AppSettingsRoutes: RouteObject[] = [
  {
    path: 'search',
    element: <SearchSettings />,
  },
  {
    path: 'videos',
    element: <VideoSettings />,
  },
  {
    path: 'content',
    element: <ContentSettings />,
  },
];
