import {UserLink} from '@app/profile/user-link';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import clsx from 'clsx';
import {ButtonBase} from '@common/ui/buttons/button-base';
import {OpenInNewIcon} from '@common/icons/material/OpenInNew';

interface Props {
  links?: UserLink[];
  className?: string;
}
export function ProfileLinks({links, className}: Props) {
  if (!links?.length) return null;

  if (links.length === 1) {
    return (
      <a
        className="flex items-center max-md:justify-center gap-6 mt-24 md:mt-12 hover:text-primary transition-colors"
        href={links[0].url}
      >
        <OpenInNewIcon className="text-muted" size="sm" />
        <span className="capitalize">{links[0].title}</span>
      </a>
    );
  }

  return (
    <div className={clsx('flex items-center', className)}>
      {links.map(link => (
        <Tooltip label={link.title} key={link.url}>
          <ButtonBase
            elementType="a"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            <RemoteFavicon url={link.url} alt={link.title} size="w-20 h-20" />
          </ButtonBase>
        </Tooltip>
      ))}
    </div>
  );
}
