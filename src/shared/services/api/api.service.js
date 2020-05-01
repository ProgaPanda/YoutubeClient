import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3/';

const api = axios.create({
  baseURL,
});

export default {
  /**
   * Returns matching items for the search parameter from YT API
   * @param {string} searchParam
   */
  search: (searchParam) =>
    api
      .get(
        `search?type=video&part=snippet&order=viewCount&q=${searchParam}+tutorial&maxResults=3&key=AIzaSyBT4Pe1v-xPdTqYBc8FJy5THAtUg90C4-0`,
      )
      .then((d) => console.log(d)),
};
