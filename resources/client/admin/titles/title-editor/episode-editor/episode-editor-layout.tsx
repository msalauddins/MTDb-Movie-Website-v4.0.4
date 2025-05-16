import {Trans} from '@common/i18n/trans';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import React, {ReactNode} from 'react';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {Link, useLocation, useParams} from 'react-router-dom';
import {message} from '@common/i18n/message';

const PageTabs = [
  {uri: 'primary-facts', label: message('Primary facts')},
  {uri: 'cast', label: message('Cast')},
  {uri: 'crew', label: message('Crew')},
];

interface Props {
  children: ReactNode;
  actions?: ReactNode;
}
export function EpisodeEditorLayout({children, actions}: Props) {
  const {episode, season} = useParams();
  const navigate = useNavigate();

  const {pathname} = useLocation();
  const tabName = pathname.split('/').pop();

  // only "primary facts" tab will be enabled when creating new episode
  const selectedTab = episode
    ? PageTabs.findIndex(tab => tab.uri === tabName)
    : 0;

  return (
    <TitleEditorLayout actions={actions}>
      <Breadcrumb className="mb-24">
        <BreadcrumbItem
          onSelected={() => navigate('../..', {relative: 'path'})}
        >
          <Trans message="Season :number" values={{number: season}} />
        </BreadcrumbItem>
        <BreadcrumbItem>
          {episode ? (
            <Trans message="Episode :number" values={{number: episode}} />
          ) : (
            <Trans message="New episode" />
          )}
        </BreadcrumbItem>
      </Breadcrumb>
      <FileUploadProvider>
        <Tabs selectedTab={selectedTab}>
          <TabList>
            {PageTabs.map(tab => (
              <Tab
                isDisabled={!episode && tab.uri !== 'primary-facts'}
                key={tab.uri}
                width="min-w-132"
                elementType={Link}
                to={`../${tab.uri}`}
                relative="path"
                replace
              >
                <Trans {...tab.label} />
              </Tab>
            ))}
          </TabList>
          <div className="pt-24">{children}</div>
        </Tabs>
      </FileUploadProvider>
    </TitleEditorLayout>
  );
}
