import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {ContentModelField} from '@common/admin/channels/channel-editor/controls/content-model-field';
import {
  channelContentConfig,
  Layout,
} from '@app/admin/channels/channel-content-config';
import {NEWS_ARTICLE_MODEL} from '@app/titles/models/news-article';
import {CHANNEL_MODEL} from '@common/channels/channel';
import {MOVIE_MODEL, SERIES_MODEL} from '@app/titles/models/title';
import {ContentOrderField} from '@common/admin/channels/channel-editor/controls/content-order-field';
import {FormSelect, Option} from '@common/ui/forms/select/select';
import {ChannelContentEditor} from '@common/admin/channels/channel-editor/channel-content-editor';
import React from 'react';
import {
  ChannelContentSearchField,
  ChannelContentSearchFieldProps,
} from '@common/admin/channels/channel-editor/channel-content-search-field';
import {ChannelContentItemImage} from '@app/admin/channels/channel-content-item-image';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import playlist from '@common/admin/channels/playlist.svg';
import {FormSwitch} from '@common/ui/forms/toggle/switch';

export function CrupdateUserListForm() {
  return (
    <div>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        required
        autoFocus
        className="mb-24"
      />
      <FormTextField
        name="description"
        label={<Trans message="Description" />}
        inputElementType="textarea"
        rows={2}
        className="mb-24"
      />
      <ContentModelField
        config={channelContentConfig}
        className="mb-24"
        exclude={[NEWS_ARTICLE_MODEL, CHANNEL_MODEL, MOVIE_MODEL, SERIES_MODEL]}
      />
      <ContentOrderField config={channelContentConfig} />
      <FormSelect
        className="flex-auto w-full"
        selectionMode="single"
        name="config.layout"
        label={<Trans message="Layout" />}
      >
        <Option value={Layout.grid}>
          <Trans {...channelContentConfig.layoutMethods[Layout.grid].label} />
        </Option>
        <Option value={Layout.list}>
          <Trans {...channelContentConfig.layoutMethods[Layout.list].label} />
        </Option>
        <Option value={Layout.landscapeGrid}>
          <Trans
            {...channelContentConfig.layoutMethods[Layout.landscapeGrid].label}
          />
        </Option>
      </FormSelect>
      <FormSwitch name="public" className="mt-24">
        <Trans message="Public" />
      </FormSwitch>
      <ChannelContentEditor
        title={<Trans message="List content" />}
        searchField={<SearchField />}
        noResultsMessage={<NoResultsMessage />}
      />
    </div>
  );
}

function SearchField(props: ChannelContentSearchFieldProps) {
  return (
    <ChannelContentSearchField
      {...props}
      imgRenderer={item => <ChannelContentItemImage item={item} />}
    />
  );
}

function NoResultsMessage() {
  return (
    <IllustratedMessage
      title={<Trans message="List is empty" />}
      description={<Trans message="No content is attached to this list yet." />}
      image={<SvgImage src={playlist} />}
    />
  );
}
