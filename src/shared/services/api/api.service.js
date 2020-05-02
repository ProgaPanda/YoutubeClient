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
    const { maxResults = 10, order = 'relevance', pageToken } = searchOptions;
    return api.get(`search?part=snippet&key=${process.env.VUE_APP_YT_KEY}`, {
      params: {
        q: searchParam,
        maxResults,
        order,
        pageToken,
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
};
