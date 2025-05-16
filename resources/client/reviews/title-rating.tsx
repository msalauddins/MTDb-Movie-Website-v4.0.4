import {StarIcon} from '@common/icons/material/Star';
import clsx from 'clsx';

interface Props {
  score: number | null;
  className?: string;
}
export function TitleRating({score, className}: Props) {
  if (!score) return null;
  return (
    <div
      className={clsx(
        'flex items-center gap-4 flex-shrink-0 whitespace-nowrap',
        className
      )}
    >
      <StarIcon className="text-primary" />
      <span>{score} / 10</span>
    </div>
  );
}
