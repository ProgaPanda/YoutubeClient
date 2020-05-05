import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3/';

const api = axios.create({
  baseURL,
});

export default {
  /**
   * Returns matching items for the search parameter from YT API
   * @param {string} searchParam
   * @param {Object} searchOptions
   * @returns {Promise}
   */
  search: (searchParam, searchOptions = {}) => {
    const {
      maxResults = 25,
      order = 'relevance',
      type,
      publishedAfter,
      pageToken,
      relatedToVideoId,
    } = searchOptions;
    return api.get(`search?part=snippet&key=${process.env.VUE_APP_YT_KEY}`, {
      params: {
        q: searchParam,
        maxResults,
        pageToken,
        type,
        order,
        publishedAfter,
        relatedToVideoId,
      },
    });
  },

  /**
   * Returns matching channel details for given channel ID from YT API
   * @param {string} channelId
   * @returns {Promise}
   */
  getChannelDetails: (channelId) =>
    api.get(`channels?part=snippet,contentDetails,statistics&key=${process.env.VUE_APP_YT_KEY}`, {
      params: {
        id: channelId,
      },
    }),

  /**
   * Returns matching playlist items list for given channel ID from YT API
   * @param {string} channelId
   * @returns {Promise}
   */
  getChannelPlaylists: (channelId, options = {}) => {
    const { maxResults = 25, pageToken } = options;
    return api.get(`playlists?part=snippet&key=${process.env.VUE_APP_YT_KEY}`, {
      params: {
        channelId,
        maxResults,
        pageToken,
      },
    });
  },

  /**
   * Returns matching playlist details for given playlist ID from YT API
   * @param {string} playlistId
   * @returns {Promise}
   */
  getPlaylistData: (playlistId, options = {}) => {
    const { maxResults = 25, pageToken } = options;
    return api.get(`playlistItems?part=snippet&key=${process.env.VUE_APP_YT_KEY}`, {
      params: {
        playlistId,
        maxResults,
        pageToken,
      },
    });
  },

  /**
   * Returns matching video item for given video ID from YT API
   * @param {string} videoId
   * @returns {Promise}
   */
  getVideoById: (videoId) =>
    api.get(`videos?part=snippet,statistics&key=${process.env.VUE_APP_YT_KEY}`, {
      params: {
        id: videoId,
      },
    }),
};
