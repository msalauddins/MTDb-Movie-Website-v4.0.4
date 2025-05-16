import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router-dom';
import {User} from '@common/auth/user';

export function useProfileFollowedUsers() {
  const {userId = 'me'} = useParams();
  return useInfiniteData<User>({
    endpoint: `users/${userId}/followed-users`,
    queryKey: ['users', 'profile-page-followed-users', userId],
    paginate: 'simple',
  });
}
