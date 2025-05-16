import {User} from '@common/auth/user';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {UserProfileLink} from '@common/users/user-profile-link';
import {UserAvatar} from '@common/ui/images/user-avatar';
import {FollowButton} from '@common/users/follow-button';

interface Props {
  follower: User;
}
export function FollowerListItem({follower}: Props) {
  return (
    <div
      key={follower.id}
      className="flex items-center gap-16 mb-16 pb-16 border-b"
    >
      <UserAvatar user={follower} size="lg" />
      <div className="text-sm">
        <UserProfileLink user={follower} />
        {follower.followers_count && follower.followers_count > 0 ? (
          <div className="text-xs text-muted">
            <Trans
              message="[one 1 followers|other :count followers]"
              values={{count: follower.followers_count}}
            />
          </div>
        ) : null}
      </div>
      <FollowButton
        variant="outline"
        size="xs"
        className="ml-auto"
        user={follower}
      />
    </div>
  );
}
