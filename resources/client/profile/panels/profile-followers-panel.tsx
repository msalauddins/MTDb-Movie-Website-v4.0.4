import {Trans} from '@common/i18n/trans';
import React, {Fragment} from 'react';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {BookmarkBorderIcon} from '@common/icons/material/BookmarkBorder';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useUserProfile} from '@app/profile/requests/use-user-profile';
import {useProfileFollowers} from '@app/profile/requests/use-profile-followers';
import {FollowerListItem} from '@app/profile/follower-list-item';
import {PageStatus} from '@common/http/page-status';

export function ProfileFollowersPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data!.user;
  const followersQuery = useProfileFollowers();

  if (followersQuery.noResults) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<BookmarkBorderIcon className="text-muted" />}
        size="sm"
        title={<Trans message="No followers yet" />}
        description={
          <Trans
            message="Be the first to follow :name."
            values={{name: user.display_name}}
          />
        }
      />
    );
  }

  if (followersQuery.data) {
    return (
      <Fragment>
        {followersQuery.items.map(follower => (
          <FollowerListItem key={follower.id} follower={follower} />
        ))}
        <InfiniteScrollSentinel query={followersQuery} />
      </Fragment>
    );
  }

  return <PageStatus query={followersQuery} />;
}
