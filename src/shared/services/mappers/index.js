/**
 * returns search query from route object
 * @param {Object} routeObject YT response
 * @returns {String} Search param
 */
export const getSearchParam = (routeObject) => routeObject.query.query;

/**
 * maps YT search response to UI structure
 * @param {Object} response YT response
 * @returns {{items: Array, resultsCount: Number}} Mapped Response
 */
export const mapSearchResponse = (response) => ({
  resultsCount: response.pageInfo.totalResults,
  items: response.items.map((item) => ({
    type: item.id.kind.split('#')[1],
    id: item.id.videoId || item.id.channelId || item.id.playlistId,
    channelTitle: item.snippet.channelTitle,
    title: item.snippet.title,
    date: new Date(item.snippet.publishedAt),
    description: item.snippet.description,
    thumbnailURL: item.snippet.thumbnails.medium.url,
  })),
});

/**
 * maps YT channel details response to UI structure
 * @param {Object} response YT response
 * @returns {{items: Array, resultsCount: Number}} Mapped Response
 */
export const mapChannelResponse = (response) => {
  const [channelDetails] = response.items;
  return {
    id: channelDetails.id,
    subscribeCount: channelDetails.statistics.subscriberCount,
    videosCount: channelDetails.statistics.videoCount,
    title: channelDetails.snippet.title,
    description: channelDetails.snippet.description,
    thumbnailURL: channelDetails.snippet.thumbnails.medium.url,
  };
};
