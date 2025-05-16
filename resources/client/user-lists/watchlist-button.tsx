import {Button, ButtonProps} from '@common/ui/buttons/button';
import {AddIcon} from '@common/icons/material/Add';
import {Trans} from '@common/i18n/trans';
import {Title} from '@app/titles/models/title';
import {CheckIcon} from '@common/icons/material/Check';
import {useAddToWatchlist} from '@app/user-lists/requests/use-add-to-watchlist';
import {useRemoveFromWatchlist} from '@app/user-lists/requests/use-remove-from-watchlist';
import {useIsItemWatchlisted} from '@app/user-lists/requests/use-current-user-watchlist';
import {useAuthClickCapture} from '@app/use-auth-click-capture';

interface Props {
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  item: Title;
}
export function WatchlistButton({
  item,
  variant = 'flat',
  color = 'primary',
}: Props) {
  const {isLoading, isWatchlisted} = useIsItemWatchlisted(item);
  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const authHandler = useAuthClickCapture();

  return (
    <Button
      variant={variant}
      color={color}
      startIcon={isWatchlisted ? <CheckIcon /> : <AddIcon />}
      className="mt-14 min-h-40 w-full"
      disabled={
        addToWatchlist.isPending || removeFromWatchlist.isPending || isLoading
      }
      onClickCapture={authHandler}
      onClick={() => {
        if (isWatchlisted) {
          removeFromWatchlist.mutate(item);
        } else {
          addToWatchlist.mutate(item);
        }
      }}
    >
      {isWatchlisted ? (
        <Trans message="In watchlist" />
      ) : (
        <Trans message="Add to watchlist" />
      )}
    </Button>
  );
}
