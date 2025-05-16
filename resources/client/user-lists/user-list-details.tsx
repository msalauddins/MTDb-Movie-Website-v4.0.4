import {Trans} from '@common/i18n/trans';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {LockIcon} from '@common/icons/material/Lock';
import React, {Fragment} from 'react';
import {LockOpenIcon} from '@common/icons/material/LockOpen';
import clsx from 'clsx';
import {Channel} from '@common/channels/channel';
import {Button} from '@common/ui/buttons/button';
import {ShareIcon} from '@common/icons/material/Share';
import {ShareMenuTrigger} from '@app/sharing/share-menu-trigger';
import {getUserListLink} from '@app/user-lists/user-list-link';

interface Props {
  list: Channel;
  className?: string;
  showShareButton?: boolean;
  showVisibility?: boolean;
}
export function UserListDetails({
  list,
  className,
  showShareButton,
  showVisibility = true,
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-shrink-0 items-center gap-4 whitespace-nowrap text-muted',
        className,
      )}
    >
      {showShareButton && (
        <Fragment>
          <ShareButton list={list} />
          <Divider marginLeft="ml-2" />
        </Fragment>
      )}
      {list.items_count ? (
        <Fragment>
          <Trans message=":count items" values={{count: list.items_count}} />
          <Divider />
        </Fragment>
      ) : null}
      <span>
        <Trans
          message="Updated :date"
          values={{
            date: <FormattedRelativeTime date={list.updated_at} />,
          }}
        />
      </span>
      {showVisibility && (
        <Fragment>
          <Divider />
          {list.public ? <LockOpenIcon size="sm" /> : <LockIcon size="sm" />}
          <div>
            {list.public ? (
              <Trans message="Public" />
            ) : (
              <Trans message="Private" />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

interface ShareButtonProps {
  list: Channel;
}
function ShareButton({list}: ShareButtonProps) {
  const link = getUserListLink(list, {absolute: true});
  return (
    <ShareMenuTrigger link={link}>
      <Button startIcon={<ShareIcon />} sizeClassName="px-10 py-6">
        <Trans message="Share" />
      </Button>
    </ShareMenuTrigger>
  );
}

interface DividerProps {
  marginLeft?: string;
}
function Divider({marginLeft = 'ml-12'}: DividerProps) {
  return <div className={clsx('mr-10 h-20 w-1 bg-divider', marginLeft)} />;
}
