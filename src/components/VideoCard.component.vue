<template>
  <div class="video-card">
    <div class="video-card__thumbnail">
      <img :src="thumbnail" alt="video-thumbnail" />
    </div>
    <div class="video-card__details">
      <h4 class="video-card__details__title">{{ title }}</h4>
      <p class="video-card__details__meta">{{ channel }} • {{ publishedAt }}</p>
      <p class="video-card__details__description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      @media screen and (max-width: 950px) {
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
      color: #8b8b8b;
      margin-bottom: 0.5em;
    }

    &__description {
      color: #8b8b8b;
      @media screen and (max-width: 950px) {
        display: none;
      }
    }
  }
}
</style>
