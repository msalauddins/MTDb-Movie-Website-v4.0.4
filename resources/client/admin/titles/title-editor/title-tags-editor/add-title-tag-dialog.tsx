import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Form} from '@common/ui/forms/form';
import {useForm} from 'react-hook-form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {TitleTag} from '@app/admin/titles/requests/use-detach-title-tag';
import React, {useState} from 'react';
import {Item} from '@common/ui/forms/listbox/item';
import {FormComboBox} from '@common/ui/forms/combobox/form-combobox';
import {useNormalizedModels} from '@common/users/queries/use-normalized-models';
import {
  AttachTitleTagPayload,
  useAttachTitleTag,
} from '@app/admin/titles/requests/use-attach-title-tag';

interface Props {
  type: TitleTag['model_type'];
}
export function AddTitleTagDialog({type}: Props) {
  const {formId, close} = useDialogContext();
  const form = useForm<AttachTitleTagPayload>();
  const attachTag = useAttachTitleTag(form, type);
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add :name" values={{name: type.replace('_', ' ')}} />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            attachTag.mutate(values, {onSuccess: () => close()});
          }}
        >
          <NameField type={type} />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          type="submit"
          variant="flat"
          color="primary"
          disabled={attachTag.isPending}
        >
          <Trans message="Add" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface NameFieldProps {
  type: TitleTag['model_type'];
}
function NameField({type}: NameFieldProps) {
  const [query, setQuery] = useState('');
  const {isFetching, data} = useNormalizedModels(`normalized-models/${type}`, {
    query,
  });
  return (
    <FormComboBox
      isAsync
      name="tag_name"
      isLoading={isFetching}
      inputValue={query}
      onInputValueChange={setQuery}
      items={data?.results}
      allowCustomValue
      autoFocus
    >
      {item => (
        <Item key={item.id} value={item.name} textLabel={item.name}>
          <Trans message={item.description || item.name} />
        </Item>
      )}
    </FormComboBox>
  );
}
