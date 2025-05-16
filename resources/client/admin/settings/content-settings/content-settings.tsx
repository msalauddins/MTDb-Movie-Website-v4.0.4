import {Trans} from '@common/i18n/trans';
import {SettingsPanel} from '@common/admin/settings/settings-panel';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {ContentSettingsGeneralPanel} from '@app/admin/settings/content-settings/content-settings-general-panel';
import {ContentSettingsAutomationPanel} from '@app/admin/settings/content-settings/content-settings-automation-panel';
import {ContentSettingsTitlePagePanel} from '@app/admin/settings/content-settings/content-settings-title-page-panel';

export function ContentSettings() {
  return (
    <SettingsPanel
      title={<Trans message="Content" />}
      description={
        <Trans message="Control how content is displayed across the site." />
      }
    >
      <Tabs>
        <TabList>
          <Tab width="min-w-132">
            <Trans message="General" />
          </Tab>
          <Tab width="min-w-132">
            <Trans message="Automation" />
          </Tab>
          <Tab width="min-w-132">
            <Trans message="Title page" />
          </Tab>
        </TabList>
        <TabPanels className="pt-24">
          <TabPanel>
            <ContentSettingsGeneralPanel />
          </TabPanel>
          <TabPanel>
            <ContentSettingsAutomationPanel />
          </TabPanel>
          <TabPanel>
            <ContentSettingsTitlePagePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SettingsPanel>
  );
}
