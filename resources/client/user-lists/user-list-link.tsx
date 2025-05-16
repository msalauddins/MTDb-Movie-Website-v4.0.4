import React, {useMemo} from 'react';
import {
  BaseMediaLink,
  BaseMediaLinkProps,
  getBaseMediaLink,
} from '@app/base-media-link';
import {Channel} from '@common/channels/channel';
import {Trans} from '@common/i18n/trans';

interface Props extends Omit<BaseMediaLinkProps, 'link'> {
  list: Channel;
}
export function UserListLink({list, children, ...linkProps}: Props) {
  const link = useMemo(() => {
    return getUserListLink(list);
  }, [list]);

  let content;

  if (children) {
    content = children;
  } else if (list.internal && list.name === 'watchlist') {
    return <Trans message="Watchlist" />;
  } else {
    content = list.name;
  }

  return (
    <BaseMediaLink {...linkProps} link={link}>
      {content}
    </BaseMediaLink>
  );
}

interface Options {
  absolute?: boolean;
  season?: number | string;
  episode?: number | string;
}

export function getUserListLink(
  list: Channel,
  {absolute}: Options = {}
): string {
  return getBaseMediaLink(`/lists/${list.id}`, {
    absolute,
  });
}
