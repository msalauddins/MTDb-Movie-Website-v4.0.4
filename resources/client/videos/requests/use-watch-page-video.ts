import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {Title} from '@app/titles/models/title';
import {Video} from '@app/titles/models/video';
import {Episode} from '@app/titles/models/episode';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export interface UseWatchPageVideoResponse extends BackendResponse {
  title: Title;
  episode?: Episode;
  video: Video;
  related_videos: Video[];
  alternative_videos: Video[];
}

export function useWatchPageVideo() {
  const {videoId} = useParams();
  return useQuery<UseWatchPageVideoResponse>({
    queryKey: ['video', 'watch-page', videoId],
    queryFn: () => fetchVideo(videoId),
    placeholderData: keepPreviousData,
    initialData: () => {
      const data = getBootstrapData().loaders?.watchPage;
      if (data && `${data.video.id}` === videoId) {
        return data;
      }
    },
  });
}

function fetchVideo(videoId?: string) {
  return apiClient
    .get<UseWatchPageVideoResponse>(`watch/${videoId}`)
    .then(response => response.data);
}
