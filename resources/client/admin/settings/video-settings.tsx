import {Trans} from '@common/i18n/trans';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {SettingsPanel} from '@common/admin/settings/settings-panel';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {JsonChipField} from '@common/admin/settings/json-chip-field';
import {useTrans} from '@common/i18n/use-trans';

export function VideoSettings() {
  const {trans} = useTrans();
  return (
    <SettingsPanel
      title={<Trans message="Video and streaming" />}
      description={
        <Trans message="Control how videos are played and displayed on the site." />
      }
    >
      <ShownVideoTypeSelect />
      <SortingMethodSelect />
      <FormSwitch
        className="mb-24"
        name="client.streaming.prefer_full"
        description={
          <Trans
            message={
              'When user clicks on "play" buttons across the site play full movie or episode instead of trailers and clips.'
            }
          />
        }
      >
        <Trans message="Prefer full videos" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.streaming.show_video_selector"
        description={
          <Trans message="Show alternative videos on the watch page." />
        }
      >
        <Trans message="Alternative videos" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.streaming.show_header_play"
        description={
          <Trans message="Whether play button should be shown on main title header." />
        }
      >
        <Trans message="Header play button" />
      </FormSwitch>
      <JsonChipField
        className="mb-24"
        label={<Trans message="Possible video qualities" />}
        name="client.streaming.qualities"
        placeholder={trans({message: 'Add another...'})}
      />
    </SettingsPanel>
  );
}

function SortingMethodSelect() {
  return (
    <FormSelect
      className="mb-24"
      name="client.streaming.default_sort"
      label={<Trans message="Video sorting" />}
      selectionMode="single"
      description={
        <Trans message="When multiple videos are shown on the page, how should they be sorted by default." />
      }
    >
      <Item value="order:asc">
        <Trans message="Manual (order assigned manually in admin area)" />
      </Item>
      <Item value="created_at:desc">
        <Trans message="Date added" />
      </Item>
      <Item value="name:asc">
        <Trans message="Name (a-z)" />
      </Item>
      <Item value="Language:asc">
        <Trans message="Language (a-z)" />
      </Item>
      <Item value="reports:asc">
        <Trans message="Reports (videos with less reports first)" />
      </Item>
      <Item value="score:desc">
        <Trans message="Score (most liked videos first)" />
      </Item>
    </FormSelect>
  );
}

function ShownVideoTypeSelect() {
  return (
    <FormSelect
      className="mb-24"
      name="client.streaming.video_panel_content"
      label={<Trans message="Shown videos" />}
      selectionMode="single"
      description={
        <Trans message="What type of videos should be shown in title and episode pages (if there is more then one video attached)." />
      }
    >
      <Item value="all">
        <Trans message="All videos" />
      </Item>
      <Item value="full">
        <Trans message="Full movies and episodes" />
      </Item>
      <Item value="short">
        <Trans message="Short videos (everything except full movies & episodes)" />
      </Item>
      <Item value="trailer">
        <Trans message="Trailers" />
      </Item>
      <Item value="clip">
        <Trans message="Clips" />
      </Item>
    </FormSelect>
  );
}
