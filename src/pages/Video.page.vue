<template>
  <div class="video-page">
    <div v-if="isVideoLoading" class="video-page__loading">
      <LoadingIcon />
    </div>
    <div class="video-page__video-container">
      <iframe
        class="video"
        :src="`https://www.youtube.com/embed/${id}?autoplay=1`"
        allowfullscreen
      ></iframe>
    </div>

    <div v-if="!isVideoLoading" class="video-page__info">
      <h3 class="video-page__info__title">{{ title }}</h3>
      <div class="video-page__info__meta">
        <p class="video-page__info__meta__stats">
          {{ views | formatNumber }} views • {{ date | formatDate }}
        </p>
        <p class="video-page__info__meta__reactions">
          {{ reactions.likes }} <span class="likes-wording">likes</span> • {{ reactions.dislikes }}
          <span class="dislikes-wording">dislikes</span>
        </p>
      </div>
    </div>

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

    <div v-if="!isRelatedVideosLoading" class="video-page__related-vids">
      <h4 class="video-page__related-vids__title">Latest uploads</h4>
      <div class="video-page__related-vids__list">
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
import { mapVideoResponse, mapChannelResponse, mapSearchResponse } from '@/shared/services/mappers';
import { formatNumber, formatDate, getRelativeDate } from '@/shared/services/helpers';
import VideoCard from '@/components/VideoCard.component.vue';
import LoadingIcon from '../../public/img/icons/svg/loading.icon.svg';

export default {
  mounted() {
    this.fetchContent();
  },

  beforeRouteUpdate(to, from, next) {
    const newId = to.params.id;
    this.id = newId;
    this.fetchContent();
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
      views: 0,
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
    border-bottom: 1px solid #eee;

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
      color: #757575;

      &__reactions {
        .likes-wording {
          color: #249b6d;
        }
        .dislikes-wording {
          color: #c07070;
        }
      }
    }
  }

  &__channel-info {
    display: flex;
    align-items: flex-start;
    margin-top: 2em;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 2em;
    border-bottom: 1px solid #eee;

    .thumbnail {
      width: 12%;
      border-radius: 50%;
    }

    .details {
      margin-left: 0.5em;
      .subscribers {
        color: #757575;
      }
      .video-describtion {
        margin-top: 1em;
        color: #757575;
      }
    }
  }

  &__related-vids {
    margin-top: 2em;

    &__title {
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 2em 0;
    }
  }
}
</style>
