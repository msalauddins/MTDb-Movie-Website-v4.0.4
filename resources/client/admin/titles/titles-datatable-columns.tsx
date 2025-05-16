import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Link} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import React, {Fragment} from 'react';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {Title} from '@app/titles/models/title';
import {TitleRating} from '@app/reviews/title-rating';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {TitleLink} from '@app/titles/title-link';
import {BarChartIcon} from '@common/icons/material/BarChart';

export const TitlesDatatableColumns: ColumnConfig<Title>[] = [
  {
    key: 'name',
    allowsSorting: true,
    width: 'flex-3',
    visibleInMode: 'all',
    header: () => <Trans message="Title" />,
    body: title => (
      <div className="flex items-center gap-12">
        <TitlePoster
          title={title}
          srcSize="sm"
          size="w-32"
          aspect="aspect-square"
        />
        <div className="overflow-hidden min-w-0">
          <div className="overflow-hidden overflow-ellipsis">
            <TitleLink title={title} target="_blank" />
          </div>
          <div className="text-muted text-xs overflow-hidden overflow-ellipsis">
            {title.is_series ? (
              <Trans message="Series" />
            ) : (
              <Trans message="Movie" />
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'release_date',
    allowsSorting: true,
    header: () => <Trans message="Release date" />,
    body: title => <FormattedDate date={title.release_date} />,
  },
  {
    key: 'rating',
    allowsSorting: true,
    header: () => <Trans message="Rating" />,
    body: title => <TitleRating score={title.rating} />,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'views',
    allowsSorting: true,
    header: () => <Trans message="Page views" />,
    body: title => <FormattedNumber value={title.views} />,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'popularity',
    allowsSorting: true,
    header: () => <Trans message="Popularity" />,
    body: title =>
      title.popularity ? <FormattedNumber value={title.popularity} /> : null,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-124 flex-shrink-0',
    header: () => <Trans message="Last updated" />,
    body: title =>
      title.updated_at ? <FormattedDate date={title.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-84 flex-shrink-0',
    body: title => (
      <Fragment>
        <IconButton
          size="md"
          className="text-muted"
          elementType={Link}
          to={`${title.id}/insights`}
        >
          <BarChartIcon />
        </IconButton>
        <Link to={`${title.id}/edit/primary-facts`} className="text-muted">
          <Tooltip label={<Trans message="Edit" />}>
            <IconButton size="md">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Fragment>
    ),
  },
];
