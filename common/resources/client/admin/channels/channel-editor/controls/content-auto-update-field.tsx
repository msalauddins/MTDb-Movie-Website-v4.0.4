import {useFormContext} from 'react-hook-form';
import {FormSelect, Option} from '@common/ui/forms/select/select';
import {Trans} from '@common/i18n/trans';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {Fragment, ReactNode} from 'react';
import {UpdateChannelPayload} from '@common/admin/channels/requests/use-update-channel';
import {ChannelContentConfig} from '@common/admin/channels/channel-editor/channel-content-config';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import clsx from 'clsx';
import {ChannelsDocsLink} from '@common/admin/channels/channels-docs-link';

interface Props {
  children?: ReactNode;
  config: ChannelContentConfig;
  className?: string;
}
export function ContentAutoUpdateField({children, config, className}: Props) {
  const {watch, setValue} = useFormContext<UpdateChannelPayload>();
  const modelConfig = config.models[watch('config.contentModel')];
  const selectedMethodConfig =
    config.autoUpdateMethods[watch('config.autoUpdateMethod')!];

  if (
    watch('config.contentType') !== 'autoUpdate' ||
    !modelConfig.autoUpdateMethods?.length
  ) {
    return null;
  }

  return (
    <div className={clsx('items-end gap-14 md:flex', className)}>
      <FormSelect
        required
        className="flex-auto"
        selectionMode="single"
        name="config.autoUpdateMethod"
        onSelectionChange={value => {
          if (config.autoUpdateMethods[value].provider) {
            setValue(
              'config.autoUpdateProvider',
              config.autoUpdateMethods[value].provider,
            );
          }
        }}
        label={
          <Fragment>
            <Trans message="Auto update method" />
            <InfoDialogTrigger
              body={
                <Fragment>
                  <div className="mb-20">
                    <Trans message="This option will automatically update channel content every 24 hours using the specified method." />
                  </div>
                  <ChannelsDocsLink hash="automatically-update-content-with-specified-method" />
                </Fragment>
              }
            />
          </Fragment>
        }
      >
        {modelConfig.autoUpdateMethods.map(method => (
          <Option value={method} key={method}>
            <Trans {...config.autoUpdateMethods[method].label} />
          </Option>
        ))}
      </FormSelect>
      {selectedMethodConfig?.value ? (
        <FormTextField
          name="config.autoUpdateValue"
          required
          className="flex-auto"
          label={<Trans {...selectedMethodConfig?.value.label} />}
          type={selectedMethodConfig?.value.inputType}
        />
      ) : null}
      {children}
    </div>
  );
}
