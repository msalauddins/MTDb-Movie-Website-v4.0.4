import {InteractableRating} from '@app/reviews/interactable-rating';
import {Title} from '@app/titles/models/title';
import {TitlePageHeaderLayout} from '@app/titles/pages/title-page/title-page-header-layout';
import {FormattedDate} from '@common/i18n/formatted-date';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleLink} from '@app/titles/title-link';
import React from 'react';

interface Props {
  title: Title;
  showPoster?: boolean;
}
export function TitlePageHeader({title, showPoster = false}: Props) {
  return (
    <TitlePageHeaderLayout
      name={<TitleLink title={title} />}
      poster={
        showPoster ? (
          <TitlePoster title={title} size="w-80" srcSize="sm" />
        ) : null
      }
      description={
        <div>
          <BulletSeparatedItems>
            <FormattedDate date={title.release_date} />
            {title.certification && (
              <div className="uppercase">{title.certification}</div>
            )}
            {title.runtime && (
              <FormattedDuration minutes={title.runtime} verbose />
            )}
          </BulletSeparatedItems>
        </div>
      }
      right={<InteractableRating title={title} />}
    />
  );
}
