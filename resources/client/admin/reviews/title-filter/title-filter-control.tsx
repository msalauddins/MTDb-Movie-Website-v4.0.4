import {CustomFilterControl} from '@common/datatable/filters/backend-filter';
import {Fragment} from 'react';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {Avatar} from '@common/ui/images/avatar';
import {FilterListItemDialogTrigger} from '@common/datatable/filters/filter-list/filter-list-item-dialog-trigger';
import {FilterListControlProps} from '@common/datatable/filters/filter-list/filter-list-control';
import {useNormalizedModel} from '@common/users/queries/use-normalized-model';

export function TitleFilterControl(
  props: FilterListControlProps<number, CustomFilterControl>,
) {
  const {value, filter} = props;
  const {isLoading, data} = useNormalizedModel(
    `normalized-models/title/${value}`,
  );

  const skeleton = (
    <Fragment>
      <Skeleton variant="avatar" size="w-18 h-18 mr-6" />
      <Skeleton variant="rect" size="w-50" />
    </Fragment>
  );
  const modelPreview = (
    <Fragment>
      <Avatar size="xs" src={data?.model.image} className="mr-6" />
      {data?.model.name}
    </Fragment>
  );

  const label = isLoading || !data ? skeleton : modelPreview;

  const Panel = filter.control.panel;
  return (
    <FilterListItemDialogTrigger
      {...props}
      label={label}
      panel={<Panel filter={filter} />}
    />
  );
}
