<template>
  <router-link :to="{ name: 'channel', params: { id } }">
    <div class="channel-card">
      <div class="channel-card__thumbnail">
        <img :src="thumbnail" alt="channel-thumbnail" />
      </div>
      <div class="channel-card__details">
        <h4 class="channel-card__details__title">{{ title }}</h4>
        <p class="channel-card__details__sub-count">
          {{ subscribeCount | formatNumber }} subscribers • <span>{{ videosCount }} videos</span>
        </p>
        <p class="channel-card__details__description">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import api from '@/shared/services/api/api.service';
import { mapChannelResponse } from '@/shared/services/mappers';
import { formatNumber } from '@/shared/services/helpers';

export default {
  props: {
    id: String,
    title: String,
    thumbnail: String,
    description: String,
  },

  mounted() {
    api.getChannelDetails(this.id).then((response) => {
      const { subscribeCount, videosCount } = mapChannelResponse(response.data);
      this.subscribeCount = subscribeCount;
      this.videosCount = videosCount;
    });
  },

  data() {
    return {
      subscribeCount: 0,
      videosCount: 0,
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
  margin-bottom: 2em;
  color: $color-accent-800;

  &__thumbnail {
    img {
      width: 100%;
      @media screen and (max-width: $mobile-break-point) {
        width: 5em;
      }
    }
  }

  &__details {
    margin-left: 1em;
    display: flex;
    flex-direction: column;

    &__title {
      font-weight: normal;
      color: #000;
      color: $color-primary-200;
    }

    &__sub-count {
      color: $color-primary;
      font-size: 0.85em;

      span {
        color: $color-primary;
      }
    }

    &__description {
      color: $color-accent-800;
      font-size: 0.85em;

      @media screen and (max-width: $mobile-break-point) {
        display: none;
      }
    }
  }
}
</style>
