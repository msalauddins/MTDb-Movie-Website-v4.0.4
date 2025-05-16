import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Video} from '@app/titles/models/video';

export function getWatchLink(
  video: Video,
  {absolute}: {absolute?: boolean} = {}
): string {
  let link = `/watch/${video.id}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
