<template>
  <div class="media-card">
    <VideoCard
      v-if="item.type === 'video'"
      :title="item.title"
      :channel="item.channelTitle"
      :thumbnail="item.thumbnailURL"
      :description="item.description"
      :publishedAt="item.date | getYearsAgo"
    />
    <ChannelCard
      v-else-if="item.type === 'channel'"
      :id="item.id"
      :title="item.title"
      :thumbnail="item.thumbnailURL"
      :description="item.description"
    />
    <PlaylistCard
      v-else-if="item.type === 'playlist'"
      :id="item.id"
      :title="item.title"
      :channel="item.channelTitle"
      :thumbnail="item.thumbnailURL"
      :description="item.description"
    />
  </div>
</template>

<script>
import VideoCard from './VideoCard.component.vue';
import ChannelCard from './ChannelCard.component.vue';
import PlaylistCard from './PlaylistCard.component.vue';
import { getYearsAgo } from '../shared/services/helpers';

export default {
  components: {
    VideoCard,
    ChannelCard,
    PlaylistCard,
  },

  props: {
    item: Object,
  },

  filters: {
    getYearsAgo,
  },
};
</script>
