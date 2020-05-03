<template>
  <div
    class="channel-page"
    v-infinite-scroll="loadMore"
    infinite-scroll-immediate-check="false"
    :infinite-scroll-disabled="isLoadingMore || !uploadsPlaylistId"
    :infinite-scroll-throttle-delay="800"
  >
    <header class="channel-page__header" :style="{ background: headerBackgroundColor }">
      <img
        class="channel-page__header__thumbnail"
        :src="thumbnailURL"
        alt="channel thumbnail"
        v-if="!isLoading"
      />
    </header>

    <div class="channel-page__info" v-if="!isLoading">
      <h3 class="channel-page__info__title">
        {{ title }}
      </h3>
      <p class="channel-page__info__subscribers">{{ subscribeCount | formatNumber }} Subscribers</p>
    </div>

    <div class="channel-page__content" v-if="!isLoading">
      <div class="channel-page__content__uploads">
        <h4 class="channel-page__content__uploads__title">Latest uploads</h4>
        <VideoCard
          v-for="({ id, title, thumbnailURL, description, date }, index) in uploads"
          :key="id + index"
          :title="title"
          :thumbnail="thumbnailURL"
          :description="description"
          :publishedAt="date | getRelativeDate"
        />
      </div>
    </div>

    <div class="channel-page__loading" v-if="isLoading">
      <LoadingIcon />
    </div>

    <div v-if="isLoadingMore" class="channel-page__loading--loading-more"><LoadingIcon /></div>
  </div>
</template>

<script>
import VideoCard from '@/components/VideoCard.component.vue';
import api from '@/shared/services/api/api.service';
import infiniteScroll from 'vue-infinite-scroll';
import { mapChannelResponse, mapPlaylistResponse } from '@/shared/services/mappers';
import { formatNumber, getRelativeDate, getRandomColor } from '@/shared/services/helpers';
import LoadingIcon from '../../public/img/icons/svg/loading.icon.svg';

export default {
  components: {
    VideoCard,
    LoadingIcon,
  },
  directives: {
    infiniteScroll,
  },
  mounted() {
    this.isLoading = true;
    api
      .getChannelDetails(this.id)
      .then((response) => {
        const { uploadsPlaylist, ...dataObject } = mapChannelResponse(response.data);
        this.setData(dataObject);
        return uploadsPlaylist;
      })
      .then((uploadsPlaylist) => {
        this.uploadsPlaylistId = uploadsPlaylist;
        api.getPlaylistData(uploadsPlaylist).then((response) => {
          const { items, nextPageToken } = mapPlaylistResponse(response.data);
          this.uploads = items;
          this.nextPageToken = nextPageToken;
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  data() {
    return {
      isLoading: false,
      isLoadingMore: false,
      id: this.$route.params.id,
      title: '',
      thumbnailURL: '',
      subscribeCount: 0,
      uploads: [],
      uploadsPlaylistId: null,
      nextPageToken: null,
    };
  },
  methods: {
    setData({ title, subscribeCount, thumbnailURL }) {
      this.title = title;
      this.subscribeCount = subscribeCount;
      this.thumbnailURL = thumbnailURL;
    },
    loadMore() {
      this.isLoadingMore = true;
      api
        .getPlaylistData(this.uploadsPlaylistId, { pageToken: this.nextPageToken })
        .then((res) => {
          const { items, nextPageToken } = mapPlaylistResponse(res.data);
          if (items.length) {
            this.uploads = [...this.uploads, ...items];
            this.nextPageToken = nextPageToken;
          }
        })
        .finally(() => {
          this.isLoadingMore = false;
        });
    },
  },
  filters: {
    formatNumber,
    getRelativeDate,
  },
  computed: {
    headerBackgroundColor: () => getRandomColor(),
  },
};
</script>

<style lang="scss" scoped>
.channel-page {
  width: 100%;

  &__header {
    position: relative;
    height: 10em;
    width: 100%;
    background: #888;
    padding: 1em;

    &__thumbnail {
      position: absolute;
      bottom: 0;
      transform: translateY(50%);
      width: 6em;
      border-radius: 50%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin-top: 3em;
    padding: 1em;

    &__title {
      font-size: 2em;
      font-weight: 400;
    }

    &__subscribers {
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  &__content {
    margin-top: 1em;
    padding: 1em;

    &__uploads {
      &__title {
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 1em;
      }
    }
  }

  &__loading {
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%, -50%);

    &--loading-more {
      margin: 2em 0;
    }
  }
}

// Transition classes
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 200px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
