/**
 * maps YT search response to UI structure
 * @param {Object} response YT response
 * @returns {{items: Array}} Mapped Response
 */
export const mapSearchResponse = (response) => ({
  items: response.items.map((item) => ({
    id: item.id.videoId,
    channelTitle: item.snippet.channelTitle,
    title: item.snippet.title,
    thumbnailURL: item.snippet.thumbnails.high.url,
  })),
});
