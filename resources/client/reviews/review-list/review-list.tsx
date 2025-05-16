import {useReviews} from '@app/reviews/requests/use-reviews';
import {Reviewable} from '@app/reviews/reviewable';
import {
  NewReviewForm,
  NewReviewFormActions,
} from '@app/reviews/review-list/new-review-form';
import React, {ReactNode, useRef} from 'react';
import {ReviewListItem} from '@app/reviews/review-list/review-list-item';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {Review} from '@app/titles/models/review';
import {AccountRequiredCard} from '@common/comments/comment-list/account-required-card';
import {useAuth} from '@common/auth/use-auth';
import {message} from '@common/i18n/message';

const accountRequiredMessage = message(
  'Please <l>login</l> or <r>create account</r> to add a review',
);

interface Props {
  reviewable: Reviewable;
  disabled?: boolean;
  noResultsMessage?: ReactNode;
  showAccountRequiredMessage?: boolean;
}
export function ReviewList({
  reviewable,
  disabled,
  noResultsMessage,
  showAccountRequiredMessage,
}: Props) {
  const query = useReviews(reviewable);
  const actionsRef = useRef<NewReviewFormActions>(null);
  const {user} = useAuth();

  const currentUserReview = query.data?.pages[0].current_user_review;
  const sharedReview = query.data?.pages[0].shared_review;

  return (
    <div>
      <NewReviewForm
        className="mb-14 md:-mx-14"
        reviewable={reviewable}
        currentReview={currentUserReview}
        ref={actionsRef}
        disabled={disabled}
      />
      <div>
        {showAccountRequiredMessage && (
          <AccountRequiredCard message={accountRequiredMessage} />
        )}
        <AnimatePresence initial={false} mode="wait">
          {query.isLoading ? (
            <ReviewListSkeletons count={4} />
          ) : (
            <ReviewListItems
              reviews={query.items}
              sharedReview={sharedReview}
              noResultsMessage={noResultsMessage}
            />
          )}
        </AnimatePresence>
        <div className="ml-84">
          <InfiniteScrollSentinel
            query={query}
            variant="loadMore"
            loaderMarginTop="mt-14"
            loadMoreExtraContent={
              <Button
                variant="flat"
                color="primary"
                disabled={!user}
                onClick={() => {
                  actionsRef.current?.openReviewPanel();
                }}
              >
                <Trans message="Add a review" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

interface ReviewListItemsProps {
  reviews: Review[];
  sharedReview?: Review;
  noResultsMessage?: ReactNode;
}
function ReviewListItems({
  reviews,
  sharedReview,
  noResultsMessage,
}: ReviewListItemsProps) {
  const {user} = useAuth();

  let content: ReactNode;

  if (!reviews.length) {
    content = user
      ? noResultsMessage || (
          <IllustratedMessage
            className="mt-24"
            size="sm"
            title={<Trans message="Seems a little quiet over here" />}
            description={<Trans message="Be the first to leave a review" />}
          />
        )
      : null;
  } else {
    content = reviews.map(review => (
      <ReviewListItem key={review.id} review={review} />
    ));
  }

  return (
    <m.div key="reviews" {...opacityAnimation}>
      {sharedReview && <ReviewListItem review={sharedReview} isShared />}
      {content}
    </m.div>
  );
}

interface ReviewListSkeletonsProps {
  count: number;
}
export function ReviewListSkeletons({count}: ReviewListSkeletonsProps) {
  return (
    <m.div key="loading-skeleton" {...opacityAnimation}>
      {[...new Array(count).keys()].map(index => (
        <div
          key={index}
          className="flex items-start gap-24 py-18 min-h-[212px] group"
        >
          <Skeleton variant="avatar" radius="rounded-full" size="w-60 h-60" />
          <div className="flex-auto text-sm">
            <Skeleton
              className="text-base font-medium max-w-200 mb-4"
              variant="text"
            />
            <Skeleton variant="text" className="max-w-60 mb-8 mt-10 text-lg" />
            <Skeleton variant="text" className="mb-8 text-base max-w-240" />
            <Skeleton className="text-sm" variant="text" />
            <Skeleton className="text-sm" variant="text" />
            <Skeleton className="text-xs mt-16" variant="text" />
          </div>
        </div>
      ))}
    </m.div>
  );
}
