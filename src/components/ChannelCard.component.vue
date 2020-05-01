<template>
  <div class="channel-card">
    <img class="channel-card__thumbnail" :src="thumbnail" alt="video-thumbnail" />
    <div class="channel-card__details">
      <h4 class="channel-card__details__title">{{ title }}</h4>
      <p class="channel-card__details__sub-count">
        {{ subscribeCount | formatNumber }} subscribers
      </p>
      <p class="channel-card__details__description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import api from '@/shared/services/api/api.service';
import { mapChannelResponse } from '@/shared/services/mappers';
import { formatNumber } from '@/shared/services/helpers';

export default {
  props: {
    id: String,
    title: String,
    channel: String,
    thumbnail: String,
    description: String,
    publishedAt: String,
  },

  mounted() {
    api.getChannelDetails(this.id).then((response) => {
      const { subscribeCount } = mapChannelResponse(response.data);
      this.subscribeCount = subscribeCount;
    });
  },

  data() {
    return {
      subscribeCount: 0,
    };
  },

  filters: {
    formatNumber,
  },
};
</script>

<style lang="scss" scoped>
.channel-card {
  display: flex;
  margin-bottom: 1em;
  &__thumbnail {
    width: 25%;
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
