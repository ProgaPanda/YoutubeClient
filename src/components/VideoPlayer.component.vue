<template>
  <div class="video-player">
    <div v-if="isLoading" class="video-player__loading">
      <LoadingIcon />
    </div>
    <div class="video-player__video-container">
      <iframe class="video" :src="`https://www.youtube.com/embed/${id}`" allowfullscreen></iframe>
    </div>

    <div v-if="!isLoading" class="video-player__info">
      <h3 class="video-player__info__title">{{ title }}</h3>
      <div class="video-player__info__meta">
        <p class="video-player__info__meta__stats">
          {{ views | formatNumber }} views • {{ date | formatDate }}
        </p>
        <p class="video-player__info__meta__reactions">
          {{ reactions.likes | formatNumber }} <span class="likes-wording">likes</span> •
          {{ reactions.dislikes | formatNumber }}
          <span class="dislikes-wording">dislikes</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber, formatDate } from '@/shared/services/helpers';
import LoadingIcon from '../../public/img/icons/svg/loading.icon.svg';

export default {
  props: {
    isLoading: Boolean,
    id: String,
    title: String,
    views: String,
    date: Date,
    reactions: {
      likes: Number,
      dislikes: Number,
    },
  },
  filters: {
    formatNumber,
    formatDate,
  },

  components: {
    LoadingIcon,
  },
};
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;

  &__loading {
    margin-top: 3em;
  }

  &__video-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

    .video {
      position: absolute;
      border: 0;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    margin-top: 1em;
    padding-bottom: 2em;

    &__title {
      font-weight: normal;
      margin-bottom: 0.5em;
    }

    &__meta {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      text-transform: uppercase;
      letter-spacing: 1px;

      &__reactions {
        .likes-wording {
          color: #59917b;
        }
        .dislikes-wording {
          color: #db9292;
        }
      }
    }
  }
}
</style>
