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
   */
  search: (searchParam, searchOptions = {}) => {
    const { maxResults = 10, order = 'relevance' } = searchOptions;
    return api.get(
      'search?part=snippet&order=viewCount&key=AIzaSyBT4Pe1v-xPdTqYBc8FJy5THAtUg90C4-0',
      {
        params: {
          q: searchParam,
          maxResults,
          order,
          type: 'video',
        },
      },
    );
  },
};
