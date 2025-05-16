import {useSettings} from '@common/core/settings/use-settings';
import {useFormContext} from 'react-hook-form';
import {UpdateChannelPayload} from '@common/admin/channels/requests/use-update-channel';
import {channelContentConfig} from '@app/admin/channels/channel-content-config';
import {ContentAutoUpdateField} from '@common/admin/channels/channel-editor/controls/content-auto-update-field';
import {FormSelect, Option} from '@common/ui/forms/select/select';
import {Trans} from '@common/i18n/trans';
import React from 'react';

interface Props {
  className?: string;
}
export function ChannelAutoUpdateField({className}: Props) {
  const {tmdb_is_setup} = useSettings();
  const {watch} = useFormContext<UpdateChannelPayload>();
  const methodConfig =
    channelContentConfig.autoUpdateMethods[watch('config.autoUpdateMethod')!];
  return (
    <ContentAutoUpdateField config={channelContentConfig} className={className}>
      {!methodConfig?.provider && tmdb_is_setup && (
        <FormSelect
          selectionMode="single"
          className="mt-24 flex-auto md:mt-0"
          name="config.autoUpdateProvider"
          label={<Trans message="Fetch content from" />}
          required
        >
          <Option value="tmdb">
            <Trans message="TheMovieDB" />
          </Option>
          <Option value="local">
            <Trans message="Local database" />
          </Option>
        </FormSelect>
      )}
    </ContentAutoUpdateField>
  );
}
