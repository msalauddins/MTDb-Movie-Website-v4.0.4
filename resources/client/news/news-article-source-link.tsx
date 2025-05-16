import {NewsArticle} from '@app/titles/models/news-article';
import clsx from 'clsx';
import {OpenInNewIcon} from '@common/icons/material/OpenInNew';
import {LinkStyle} from '@common/ui/buttons/external-link';
import React from 'react';

interface SourceLinkProps {
  article: NewsArticle;
  className?: string;
}
export function NewsArticleSourceLink({article, className}: SourceLinkProps) {
  return (
    <div className={clsx('flex items-center gap-4 text-primary', className)}>
      <OpenInNewIcon size="xs" className="flex-shrink-0" />
      <a
        href={article.source_url}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          LinkStyle,
          'whitespace-nowrap overflow-hidden overflow-ellipsis'
        )}
      >
        {article.source}
      </a>
    </div>
  );
}
