import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {ReactNode, useMemo} from 'react';
import {slugifyString} from '@common/utils/string/slugify-string';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Person} from '@app/titles/models/person';

interface Props extends Omit<LinkProps, 'to'> {
  person: Person;
  className?: string;
  children?: ReactNode;
  color?: 'primary' | 'inherit';
}
export function PersonLink({
  person,
  className,
  children,
  color = 'inherit',
  ...linkProps
}: Props) {
  const finalUri = useMemo(() => {
    return getPersonLink(person);
  }, [person]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        color === 'primary'
          ? 'text-primary hover:text-primary-dark'
          : 'text-inherit',
        'hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors',
        className
      )}
      to={finalUri}
    >
      {children ?? person.name}
    </Link>
  );
}

export function getPersonLink(
  person: Person,
  {absolute}: {absolute?: boolean} = {}
): string {
  let link = `/people/${person.id}/${slugifyString(person.name)}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
