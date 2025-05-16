import {ReviewsDatatablePage} from '@app/admin/reviews/reviews-datatable-page';
import {useOutletContext} from 'react-router-dom';
import {Title} from '@app/titles/models/title';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';

export function TitleReviewsEditor() {
  const title = useOutletContext<Title>();
  return (
    <TitleEditorLayout>
      <ReviewsDatatablePage hideTitle reviewable={title} />
    </TitleEditorLayout>
  );
}
