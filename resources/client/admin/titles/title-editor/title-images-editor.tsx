import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ImageZoomDialog} from '@common/ui/overlays/dialog/image-zoom-dialog';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ZoomOutMapIcon} from '@common/icons/material/ZoomOutMap';
import {useDeleteImage} from '@app/admin/titles/requests/use-delete-image';
import {UploadInputType} from '@common/uploads/types/upload-input-config';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {openUploadWindow} from '@common/uploads/utils/open-upload-window';
import {useUploadImage} from '@app/admin/titles/requests/use-upload-image';
import {useOutletContext, useParams} from 'react-router-dom';
import {AddIcon} from '@common/icons/material/Add';
import {validateUpload} from '@common/uploads/uploader/validate-upload';
import {toast} from '@common/ui/toast/toast';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {Title} from '@app/titles/models/title';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import React from 'react';
import {ImageIcon} from '@common/icons/material/Image';

export function TitleImagesEditor() {
  const title = useOutletContext<Title>();
  return (
    <TitleEditorLayout>
      <FileUploadProvider>
        <UploadButton />
      </FileUploadProvider>
      <div className="mt-24 grid grid-cols-2 gap-24 md:grid-cols-3">
        {title.images.map((image, index) => (
          <div key={image.id}>
            <TitleBackdrop src={image.url} srcSize="md" className="rounded" />
            <div className="mt-6 flex items-center justify-between gap-14">
              <DeleteButton imageId={image.id} />
              <DialogTrigger type="modal">
                <IconButton variant="outline" size="xs">
                  <ZoomOutMapIcon />
                </IconButton>
                <ImageZoomDialog
                  images={title.images.map(img => img.url)}
                  defaultActiveIndex={index}
                />
              </DialogTrigger>
            </div>
          </div>
        ))}
      </div>
      {!title.images.length && <NoImagesMessage />}
    </TitleEditorLayout>
  );
}

function NoImagesMessage() {
  return (
    <IllustratedMessage
      className="mt-40"
      imageMargin="mb-8"
      image={
        <div className="text-muted">
          <ImageIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={<Trans message="No images have been added yet" />}
    />
  );
}

const MAX_IMAGE_SIZE = 5000000;
function UploadButton() {
  const {titleId} = useParams();
  const uploadImage = useUploadImage();

  const selectAndUploadFile = async () => {
    const files = await openUploadWindow({
      types: [UploadInputType.image],
    });
    const errorMessage = validateUpload(files[0], {
      maxFileSize: MAX_IMAGE_SIZE,
    });
    if (errorMessage) {
      toast.danger(errorMessage);
      return;
    }

    uploadImage.mutate({
      file: files[0].native,
      titleId: titleId!,
    });
  };

  return (
    <Button
      variant="outline"
      color="primary"
      startIcon={<AddIcon />}
      disabled={uploadImage.isPending}
      onClick={() => selectAndUploadFile()}
    >
      <Trans message="Upload image" />
    </Button>
  );
}

interface ImageItemProps {
  imageId: number;
}
function DeleteButton({imageId}: ImageItemProps) {
  const deleteImage = useDeleteImage(imageId);
  return (
    <Button
      variant="outline"
      size="xs"
      disabled={deleteImage.isPending}
      onClick={() => deleteImage.mutate()}
    >
      <Trans message="Delete" />
    </Button>
  );
}
