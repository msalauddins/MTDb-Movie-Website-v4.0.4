import {PageErrorMessage} from '@common/errors/page-error-message';
import React from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {ProgressCircle} from '@common/ui/progress/progress-circle';

interface Props {
  query: UseQueryResult;
}
export function TitleEditorPageStatus({query}: Props) {
  if (query.isLoading) {
    return (
      <div className="h-full min-h-120 flex items-center justify-center">
        <ProgressCircle isIndeterminate aria-label="Loading page..." />
      </div>
    );
  }

  return <PageErrorMessage />;
}
