<template>
  <div class="video-page">
    <VideoPlayer
      :isLoading="isVideoLoading"
      :id="id"
      :title="title"
      :views="views"
      :date="date"
      :reactions="reactions"
    />

    <div v-if="isChannelDataLoading" class="video-page__loading">
      <LoadingIcon />
    </div>
    <div v-else class="video-page__channel-info">
      <img class="thumbnail" :src="channelThumbnailURL" alt="channel-thumbnail" />
      <div class="details">
        <router-link :to="{ name: 'channel', params: { id: channelId } }">
          <p class="name">{{ channelTitle }}</p>
        </router-link>
        <p class="subscribers">{{ subscribeCount | formatNumber }} subscribers</p>
        <p class="video-describtion">{{ description }}</p>
      </div>
    </div>

    <div v-if="isPlaylist" class="video-page__videos-list ">
      <h4 class="video-page__videos-list__title">Playlist videos</h4>
      <div class="video-page__videos-list__list video-page__videos-list--playlist">
        <VideoCard
          v-for="({ id, title, thumbnailURL, date }, index) in playlistVideos"
          :key="id + index"
          :id="id"
          :title="title"
          :thumbnail="thumbnailURL"
          :publishedAt="date | getRelativeDate"
        />
      </div>
    </div>

    <div v-if="!isRelatedVideosLoading" class="video-page__videos-list">
      <h4 class="video-page__videos-list__title">Related Videos</h4>
      <div class="video-page__videos-list__list">
        <VideoCard
          v-for="({ id, title, thumbnailURL, date }, index) in relatedVideos"
          :key="id + index"
          :id="id"
          :title="title"
          :thumbnail="thumbnailURL"
          :publishedAt="date | getRelativeDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/shared/services/api/api.service';
import {
  mapVideoResponse,
  mapChannelResponse,
  mapSearchResponse,
  mapVideosFromPlaylistResponse,
} from '@/shared/services/mappers';
import { formatNumber, formatDate, getRelativeDate } from '@/shared/services/helpers';
import VideoPlayer from '@/components/VideoPlayer.component.vue';
import VideoCard from '@/components/VideoCard.component.vue';
import LoadingIcon from '../../public/img/icons/svg/loading.icon.svg';

export default {
  mounted() {
    if (this.isPlaylist) {
      this.fetchPlaylistData();
    } else {
      this.fetchContent();
    }
  },

  beforeRouteUpdate(to, from, next) {
    const newId = to.params.id;
    this.id = newId;

    // check if playlist before changing route
    const isPlaylist = to.query.playlist ?? false;
    this.isPlaylist = isPlaylist;
    if (this.isPlaylist) {
      this.fetchPlaylistData();
    } else {
      this.fetchContent();
    }

    next();
  },

  data() {
    return {
      // video data
      isVideoLoading: false,
      id: this.$route.params.id,
      title: '',
      description: '',
      date: null,
      views: null,
      reactions: {},
      // channel data
      isChannelDataLoading: false,
      channelId: null,
      channelTitle: '',
      channelThumbnailURL: '',
      subscribeCount: 0,
      // related videos data
      isRelatedVideosLoading: false,
      relatedVideos: [],
      // playlist data
      isPlaylist: this.$route.query.playlist ?? false,
      playlistVideos: [],
    };
  },

  methods: {
    fetchContent() {
      this.isVideoLoading = true;
      this.isChannelDataLoading = true;
      this.isRelatedVideosLoading = true;

      // getting information about the video & the owner channel
      api
        .getVideoById(this.id)
        .then((response) => {
          const { channelId, ...videoData } = mapVideoResponse(response.data);
          this.setData(videoData);
          this.isVideoLoading = false;
          return channelId;
        })
        .then((channelId) => {
          api
            .getChannelDetails(channelId)
            .then((response) => {
              const { title, id, thumbnailURL, subscribeCount } = mapChannelResponse(response.data);
              this.channelId = id;
              this.channelTitle = title;
              this.channelThumbnailURL = thumbnailURL;
              this.subscribeCount = subscribeCount;
            })
            .finally(() => {
              this.isChannelDataLoading = false;
            });
        });

      // getting related videos list
      api
        .search(null, { relatedToVideoId: this.id, type: 'video' })
        .then((response) => {
          const { items } = mapSearchResponse(response.data);
          this.relatedVideos = items;
        })
        .finally(() => {
          this.isRelatedVideosLoading = false;
        });
    },

    fetchPlaylistData() {
      api.getPlaylistData(this.id).then((response) => {
        const { items } = mapVideosFromPlaylistResponse(response.data);
        const [firstVideo, ...restVideos] = items;

        this.id = firstVideo?.id;
        this.playlistVideos = restVideos;
        this.fetchContent();
      });
    },

    setData({ title, date, description, views, reactions }) {
      this.title = title;
      this.date = date;
      this.description = description;
      this.views = views;
      this.reactions = reactions;
    },
  },

  filters: {
    formatNumber,
    formatDate,
    getRelativeDate,
  },

  components: {
    VideoPlayer,
    VideoCard,
    LoadingIcon,
  },
};
</script>

<style lang="scss" scoped>
.video-page {
  width: 100%;

  &__loading {
    margin-top: 3em;
  }

  &__channel-info {
    display: flex;
    align-items: flex-start;
    margin-top: 2em;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 2em;
    border-bottom: 1px solid $color-accent;

    .thumbnail {
      width: 12%;
      border-radius: 50%;
    }

    .details {
      margin-left: 0.5em;
      .subscribers {
        color: $color-primary;
      }
      .video-describtion {
        margin-top: 0.5em;
        text-transform: none;
        color: $color-accent-800;
      }
    }
  }

  &__videos-list {
    margin-top: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid $color-accent;

    &--playlist {
      background: $color-accent;
      height: 20em;
      padding: 1em;
      overflow-y: auto;
    }

    &__title {
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 2em 0;
    }
  }
}
</style>
