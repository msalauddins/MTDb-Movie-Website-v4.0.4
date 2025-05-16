import {EditChannelPageLayout} from '@common/admin/channels/channel-editor/edit-channel-page-layout';
import React, {Fragment} from 'react';
import {Accordion, AccordionItem} from '@common/ui/accordion/accordion';
import {Trans} from '@common/i18n/trans';
import {DescriptionIcon} from '@common/icons/material/Description';
import {ChannelNameField} from '@common/admin/channels/channel-editor/controls/channel-name-field';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {SettingsIcon} from '@common/icons/material/Settings';
import {ContentTypeField} from '@common/admin/channels/channel-editor/controls/content-type-field';
import {channelContentConfig} from '@app/admin/channels/channel-content-config';
import {ChannelAutoUpdateField} from '@app/admin/channels/channel-auto-update-field';
import {ContentModelField} from '@common/admin/channels/channel-editor/controls/content-model-field';
import {ChannelRestrictionField} from '@app/admin/channels/channel-restriction-field';
import {ContentOrderField} from '@common/admin/channels/channel-editor/controls/content-order-field';
import {DashboardIcon} from '@common/icons/material/Dashboard';
import {ContentLayoutFields} from '@common/admin/channels/channel-editor/controls/content-layout-fields';
import {ChannelPaginationTypeField} from '@common/admin/channels/channel-editor/controls/channel-pagination-type-field';
import {PublicIcon} from '@common/icons/material/Public';
import {ChannelSeoFields} from '@app/admin/channels/channel-seo-fields';
import {ChannelContentEditor} from '@common/admin/channels/channel-editor/channel-content-editor';
import {
  ChannelContentSearchField,
  ChannelContentSearchFieldProps,
} from '@common/admin/channels/channel-editor/channel-content-search-field';
import {ChannelContentItemImage} from '@app/admin/channels/channel-content-item-image';

export function EditChannelPage() {
  return (
    <EditChannelPageLayout>
      <Fragment>
        <Accordion variant="outline">
          <AccordionItem
            label={<Trans message="Title & description" />}
            startIcon={<DescriptionIcon />}
          >
            <ChannelNameField />
            <FormSwitch
              className="mt-24"
              name="config.hideTitle"
              description={
                <Trans message="Whether title should be shown when displaying this channel on the site." />
              }
            >
              <Trans message="Hide title" />
            </FormSwitch>
            <FormTextField
              name="description"
              label={<Trans message="Description" />}
              inputElementType="textarea"
              rows={1}
              className="mt-24"
            />
            <FormTextField
              name="config.adminDescription"
              label={
                <Fragment>
                  <Trans message="Internal description" />
                  <InfoDialogTrigger
                    body={
                      <Trans message="This describes the purpose of the channel and is only visible in admin area." />
                    }
                  />
                </Fragment>
              }
              inputElementType="textarea"
              rows={1}
              className="mt-24"
            />
          </AccordionItem>
          <AccordionItem
            label={<Trans message="Content settings" />}
            startIcon={<SettingsIcon />}
          >
            <ContentTypeField config={channelContentConfig} className="mb-24" />
            <ChannelAutoUpdateField className="mb-24" />
            <ContentModelField
              config={channelContentConfig}
              className="mb-24"
            />
            <ChannelRestrictionField className="mb-24" />
            <ContentOrderField config={channelContentConfig} />
          </AccordionItem>
          <AccordionItem
            label={<Trans message="Layout" />}
            startIcon={<DashboardIcon />}
          >
            <ContentLayoutFields
              config={channelContentConfig}
              className="mb-24"
            />
            <ChannelPaginationTypeField config={channelContentConfig} />
          </AccordionItem>
          <AccordionItem
            label={<Trans message="SEO" />}
            startIcon={<PublicIcon />}
          >
            <ChannelSeoFields />
          </AccordionItem>
        </Accordion>
        <ChannelContentEditor searchField={<SearchField />} />
      </Fragment>
    </EditChannelPageLayout>
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
