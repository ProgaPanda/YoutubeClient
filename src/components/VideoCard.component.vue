<template>
  <router-link :to="{ name: 'video', params: { id } }">
    <div class="video-card">
      <div class="video-card__thumbnail">
        <img :src="thumbnail" alt="video-thumbnail" />
      </div>
      <div class="video-card__details">
        <h4 class="video-card__details__title">{{ title }}</h4>
        <p class="video-card__details__meta">
          {{ channel }} <span v-if="channel && publishedAt">•</span> {{ publishedAt }}
        </p>
        <p class="video-card__details__description">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    channel: String,
    thumbnail: String,
    description: String,
    publishedAt: String,
  },
};
</script>

<style lang="scss" scoped>
.video-card {
  display: flex;
  margin-bottom: 2em;
  &__thumbnail {
    img {
      @media screen and (max-width: $mobile-break-point) {
        width: 12em;
      }
    }
  }
  &__details {
    margin-left: 1em;
    display: flex;
    flex-direction: column;

    &__title {
      font-weight: normal;
    }

    &__meta {
      color: $color-primary;
      font-size: 0.85em;
      margin-bottom: 0.5em;
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
