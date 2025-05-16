import {User} from '@common/auth/user';
import React, {useContext} from 'react';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {UserAvatar} from '@common/ui/images/user-avatar';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';

interface Props {
  user: User;
}
export function UserListByline({user}: Props) {
  const {auth} = useContext(SiteConfigContext);
  return (
    <div className="flex-shrink-0 flex items-center gap-8 mr-24">
      <UserAvatar user={user} circle size="sm" />
      <div>
        <Trans
          message="List by <a>:name</a>"
          values={{
            a: () => (
              <Link
                to={auth.getUserProfileLink!(user)}
                className="font-bold hover:underline"
              >
                {user.display_name}
              </Link>
            ),
          }}
        />
      </div>
    </div>
  );
}
