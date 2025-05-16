import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useValueLists} from '@common/http/value-lists';
import {FormSelect, Option} from '@common/ui/forms/select/select';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {VideoCaption} from '@app/titles/models/video';
import {FormFileEntryField} from '@common/ui/forms/input-field/file-entry-field';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {Disk} from '@common/uploads/types/backend-metadata';

interface Props {
  caption?: VideoCaption;
}
export function CrupdateCaptionDialog({caption}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm({
    defaultValues: {
      language: 'en',
      ...caption,
    },
  });
  return (
    <Dialog>
      <DialogHeader>
        {caption ? (
          <Trans message="Update caption" />
        ) : (
          <Trans message="Add caption" />
        )}
      </DialogHeader>
      <DialogBody>
        <Form id={formId} form={form} onSubmit={newValues => close(newValues)}>
          <FormTextField
            name="name"
            label={<Trans message="Name" />}
            className="mb-24"
            required
            autoFocus
          />
          <LanguageSelect />
          <FileUploadProvider>
            <FormFileEntryField
              required={!caption}
              name="url"
              diskPrefix="captions"
              disk={Disk.public}
              allowedFileTypes={['.vtt']}
              maxFileSize={1024 * 1024}
              label={<Trans message="Caption file" />}
              onChange={() => {
                form.clearErrors();
              }}
            />
          </FileUploadProvider>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button form={formId} variant="flat" color="primary" type="submit">
          {caption ? <Trans message="Update" /> : <Trans message="Add" />}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function LanguageSelect() {
  const {trans} = useTrans();
  const {data} = useValueLists(['languages']);
  return (
    <FormSelect
      name="language"
      selectionMode="single"
      showSearchField
      searchPlaceholder={trans(message('Search languages'))}
      label={<Trans message="Language" />}
      className="mb-24"
    >
      {data?.languages?.map(language => (
        <Option value={language.code} key={language.code} capitalizeFirst>
          <Trans message={language.name} />
        </Option>
      ))}
    </FormSelect>
  );
}
