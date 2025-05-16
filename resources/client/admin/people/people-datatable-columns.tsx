import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Link} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import React from 'react';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {Person} from '@app/titles/models/person';
import {PersonLink} from '@app/people/person-link';
import {KnownForCompact} from '@app/people/known-for-compact';

export const PeopleDatatableColumns: ColumnConfig<Person>[] = [
  {
    key: 'name',
    allowsSorting: true,
    width: 'flex-3',
    visibleInMode: 'all',
    header: () => <Trans message="Person" />,
    body: person => (
      <div className="flex items-center gap-12">
        <PersonPoster person={person} srcSize="sm" size="w-32" rounded />
        <div className="overflow-hidden min-w-0">
          <div className="overflow-hidden overflow-ellipsis">
            <PersonLink person={person} target="_blank" />
          </div>
          <div className="text-muted text-xs overflow-hidden overflow-ellipsis">
            <KnownForCompact
              person={person}
              linkTarget="_blank"
              linkColor="inherit"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'birth_date',
    allowsSorting: true,
    header: () => <Trans message="Birth date" />,
    body: person => <FormattedDate date={person.birth_date} />,
  },
  {
    key: 'views',
    allowsSorting: true,
    header: () => <Trans message="Page views" />,
    body: person =>
      person.views ? <FormattedNumber value={person.views} /> : null,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'popularity',
    allowsSorting: true,
    header: () => <Trans message="Popularity" />,
    body: person =>
      person.popularity ? <FormattedNumber value={person.popularity} /> : null,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-124 flex-shrink-0',
    header: () => <Trans message="Last updated" />,
    body: person =>
      person.updated_at ? <FormattedDate date={person.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-42 flex-shrink-0',
    body: video => (
      <Link to={`${video.id}/edit/primary-facts`} className="text-muted">
        <Tooltip label={<Trans message="Edit" />}>
          <IconButton size="md">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    ),
  },
];
