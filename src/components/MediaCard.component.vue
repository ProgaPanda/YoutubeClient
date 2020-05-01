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
      v-if="item.type === 'channel'"
      :id="item.id"
      :title="item.title"
      :channel="item.channelTitle"
      :thumbnail="item.thumbnailURL"
      :description="item.description"
      :publishedAt="item.date | getYearsAgo"
    />
  </div>
</template>

<script>
import VideoCard from './VideoCard.component.vue';
import ChannelCard from './ChannelCard.component.vue';
import { getYearsAgo } from '../shared/services/helpers';

export default {
  components: {
    VideoCard,
    ChannelCard,
  },

  props: {
    item: Object,
  },

  filters: {
    getYearsAgo,
  },
};
</script>

<style lang="scss" scoped>
.media-card {
  display: flex;
  margin-bottom: 1em;
  &__thumbnail {
  }
  &__details {
    margin-left: 1em;
    display: flex;
    flex-direction: column;

    &__title {
      font-weight: normal;
    }

    &__meta {
      color: #8b8b8b;
      margin-bottom: 0.5em;
    }

    &__description {
      color: #8b8b8b;
    }
  }
}
</style>
