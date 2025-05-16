import {TITLE_MODEL} from '@app/titles/models/title';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleLink} from '@app/titles/title-link';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {NEWS_ARTICLE_MODEL} from '@app/titles/models/news-article';
import {NewsArticleImage} from '@app/news/news-article-image';
import {NewsArticleLink} from '@app/news/news-article-link';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {FormattedDate} from '@common/i18n/formatted-date';
import {NewsArticleSourceLink} from '@app/news/news-article-source-link';
import {PERSON_MODEL} from '@app/titles/models/person';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {PersonLink} from '@app/people/person-link';
import {KnownForCompact} from '@app/people/known-for-compact';
import React from 'react';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {InteractableRating} from '@app/reviews/interactable-rating';

interface Props {
  item: ChannelContentModel;
}
export function ChannelContentListItem({item}: Props) {
  switch (item.model_type) {
    case TITLE_MODEL:
      return (
        <div className="flex items-start gap-24 mb-24">
          <TitlePoster title={item} srcSize="md" size="w-128" showPlayButton />
          <div className="flex-auto min-w-0 pt-12">
            <TitleLink title={item} className="font-medium" />
            <BulletSeparatedItems className="text-sm mt-4">
              {item.runtime ? (
                <FormattedDuration minutes={item.runtime} verbose />
              ) : null}
              {item.certification && (
                <span className="uppercase">{item.certification}</span>
              )}
            </BulletSeparatedItems>
            {item.rating && item.status !== 'upcoming' ? (
              <InteractableRating size="md" title={item} className="my-12" />
            ) : (
              <div className="my-12">
                <FormattedDate date={item.release_date} />
              </div>
            )}
            {item.description ? (
              <p className="text-sm">{item.description}</p>
            ) : null}
          </div>
        </div>
      );
    case PERSON_MODEL:
      return (
        <div className="flex items-start gap-24 mb-24">
          <PersonPoster person={item} srcSize="md" size="w-128" />
          <div className="flex-auto min-w-0 pt-12">
            <PersonLink person={item} className="block font-medium text-lg" />
            {item.primary_credit ? (
              <div className="text-sm mt-4">
                <KnownForCompact person={item} />
              </div>
            ) : null}
            <p className="text-sm mt-12">{item.description}</p>
          </div>
        </div>
      );
    case NEWS_ARTICLE_MODEL:
      return (
        <div className="flex items-start gap-14 mb-44">
          <NewsArticleImage article={item} className="aspect-poster max-w-90" />
          <div className="mt-6 text-base">
            <NewsArticleLink article={item} className="font-medium" />
            <p className="text-sm mt-10">{item.body}</p>
            <BulletSeparatedItems className="text-xs mt-10">
              <FormattedDate date={item.created_at} />
              <NewsArticleSourceLink article={item} />
            </BulletSeparatedItems>
          </div>
        </div>
      );
    default:
      return null;
  }
}
