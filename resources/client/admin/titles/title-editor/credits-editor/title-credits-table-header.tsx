import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Button} from '@common/ui/buttons/button';
import {AddIcon} from '@common/icons/material/Add';
import {Trans} from '@common/i18n/trans';
import {AddCreditDialog} from '@app/admin/titles/title-editor/credits-editor/add-credit-dialog';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {TitleCredit} from '@app/titles/models/title';
import {SearchIcon} from '@common/icons/material/Search';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';

interface Props {
  query: UseInfiniteDataResult<TitleCredit>;
  isCrew: boolean;
}
export function TitleCreditsTableHeader({query, isCrew}: Props) {
  const {trans} = useTrans();
  return (
    <div className="flex items-center gap-24 justify-between mb-14">
      <DialogTrigger type="modal">
        <Button variant="outline" color="primary" startIcon={<AddIcon />}>
          <Trans message="Add credit" />
        </Button>
        <AddCreditDialog isCrew={isCrew} />
      </DialogTrigger>
      <TextField
        size="sm"
        value={query.searchQuery}
        onChange={e => query.setSearchQuery(e.target.value)}
        placeholder={trans(message('Search'))}
        startAdornment={<SearchIcon />}
      />
    </div>
  );
}
