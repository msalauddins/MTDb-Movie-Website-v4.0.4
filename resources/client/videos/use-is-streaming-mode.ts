import {useSettings} from '@common/core/settings/use-settings';

export function useIsStreamingMode() {
  const {streaming} = useSettings();
  return streaming?.prefer_full || false;
}
