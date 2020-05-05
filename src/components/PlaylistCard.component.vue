<template>
  <router-link :to="{ name: 'video', params: { id }, query: { playlist: true } }">
    <div class="playlist-card">
      <div class="playlist-card__thumbnail">
        <img :src="thumbnail" alt="video-thumbnail" />
        <PlaylistIcon class="playlist-card__thumbnail__icon" />
      </div>
      <div class="playlist-card__details">
        <h4 class="playlist-card__details__title">{{ title }}</h4>
        <p class="playlist-card__details__meta">{{ channel }}</p>
        <p class="playlist-card__details__description">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import PlaylistIcon from '../../public/img/icons/svg/playlist.icon.svg';

export default {
  props: {
    id: String,
    title: String,
    thumbnail: String,
    channel: String,
    description: String,
  },
  components: {
    PlaylistIcon,
  },
};
</script>

<style lang="scss" scoped>
.playlist-card {
  display: flex;
  margin-bottom: 2em;
  position: relative;

  &__thumbnail {
    position: relative;

    img {
      @media screen and (max-width: $mobile-break-point) {
        width: 12em;
      }
    }

    &__icon {
      position: absolute;
      right: 15%;
      top: 50%;
      transform: translateY(-50%) translateX(50%);
      width: 2.5em;
      fill: rgb(235, 235, 235);
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 30%;
      height: calc(100% - 0.25em);
      background: rgba($color: #000, $alpha: 0.5);
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
      margin-bottom: 0.5em;
    }

    &__description {
      color: $color-accent-800;

      @media screen and (max-width: $mobile-break-point) {
        display: none;
      }
    }
  }
}
</style>
