import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {Item} from '@common/ui/forms/listbox/item';
import {Trans} from '@common/i18n/trans';
import {FacebookIcon} from '@common/icons/social/facebook';
import {TwitterIcon} from '@common/icons/social/twitter';
import useClipboard from 'react-use-clipboard';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {shareLinkSocially} from '@common/utils/urls/share-link-socially';
import {useTrans} from '@common/i18n/use-trans';
import {ReactElement} from 'react';
import {CopyLinkIcon} from '@app/sharing/copy-link-icon';

interface Props {
  link: string;
  children: ReactElement;
}
export function ShareMenuTrigger({link, children}: Props) {
  const {trans} = useTrans();
  const [, setUrlCopied] = useClipboard(link);

  return (
    <MenuTrigger>
      {children}
      <Menu>
        <Item
          value="clipboard"
          startIcon={<CopyLinkIcon />}
          onSelected={() => {
            setUrlCopied();
            toast.positive(message('Copied link to clipboard'));
          }}
        >
          <Trans message="Copy to clipboard" />
        </Item>
        <Item
          value="facebook"
          startIcon={<FacebookIcon />}
          onClick={() => {
            shareLinkSocially(
              'facebook',
              link,
              trans(message('Check out this link')),
            );
          }}
        >
          <Trans message="Share to facebook" />
        </Item>
        <Item
          value="twitter"
          startIcon={<TwitterIcon />}
          onClick={() => {
            shareLinkSocially(
              'twitter',
              link,
              trans(message('Check out this link')),
            );
          }}
        >
          <Trans message="Share to twitter" />
        </Item>
      </Menu>
    </MenuTrigger>
  );
}
