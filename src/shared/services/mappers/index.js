import { getDateXHoursAgo } from '../helpers';

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
  nextPageToken: response.nextPageToken,
  items: response.items.map((item) => ({
    type: item.id.kind.split('#')[1],
    id: item.id.videoId || item.id.channelId || item.id.playlistId,
    channelTitle: item.snippet.channelTitle,
    title: item.snippet.title,
    date: new Date(item.snippet.publishedAt),
    description: item.snippet.description,
    thumbnailURL: item.snippet.thumbnails?.medium?.url,
  })),
});

/**
 * maps YT video item response to UI structure
 * @param {Object} response YT response
 * @returns {{item: Object}} Mapped Response
 */
export const mapVideoResponse = (response) => {
  const [videoDetails] = response.items;
  return {
    id: videoDetails.id,
    channelId: videoDetails.snippet.channelId,
    title: videoDetails.snippet.title,
    date: new Date(videoDetails.snippet.publishedAt),
    description: `${videoDetails.snippet.description.substring(0, 240)}...`,
    views: videoDetails.statistics.viewCount,
    reactions: {
      likes: videoDetails.statistics.likeCount,
      dislikes: videoDetails.statistics.dislikeCount,
    },
  };
};

/**
 * maps YT playlist items response to UI structure
 * @param {Object} response YT response
 * @returns {{items: Array, nextPageToken:string}} Mapped Response
 */
export const mapPlaylistResponse = (response) => ({
  nextPageToken: response.nextPageToken,
  items: response.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    thumbnailURL: item.snippet.thumbnails.medium.url,
    date: new Date(item.snippet.publishedAt),
    description: `${item.snippet.description.substring(0, 140)}...`,
  })),
});

/**
 * maps YT Videos items from YT playlist API to UI structure
 * @param {Object} response YT response
 * @returns {items: Array, nextPageToken:string}} Mapped Response
 */
export const mapVideosFromPlaylistResponse = (response) => ({
  nextPageToken: response.nextPageToken,
  items: response.items.map((item) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnailURL: item.snippet.thumbnails.medium.url,
    date: new Date(item.snippet.publishedAt),
    description: `${item.snippet.description.substring(0, 140)}...`,
  })),
});

/**
 * maps YT channel details response to UI structure
 * @param {Object} response YT response
 * @returns {Object} Mapped Response
 */
export const mapChannelResponse = (response) => {
  const [channelDetails] = response.items;
  return {
    id: channelDetails.id,
    subscribeCount: channelDetails.statistics.subscriberCount,
    videosCount: channelDetails.statistics.videoCount,
    title: channelDetails.snippet.title,
    uploadsPlaylist: channelDetails.contentDetails.relatedPlaylists.uploads,
    description: channelDetails.snippet.description,
    thumbnailURL: channelDetails.snippet.thumbnails.medium.url,
  };
};

/**
 * maps UI filter options model to YT API filters entity
 * @param {Object} filtersObject filters object
 * @returns {Object} YT Options entity
 */
export const mapToFilterOptions = (filtersObject) => {
  const filterNamesLookupTable = {
    Type: 'type',
    'Upload date': 'publishedAfter',
    'Sort by': 'order',
  };

  const filterValuesLookupTable = {
    Type: {
      Video: 'video',
      Channel: 'channel',
      Playlist: 'playlist',
    },
    'Upload date': {
      'Last hour': getDateXHoursAgo(1).toISOString(),
      Today: getDateXHoursAgo(24).toISOString(),
      'This week': getDateXHoursAgo(24 * 7).toISOString(),
      'This month': getDateXHoursAgo(24 * 30).toISOString(),
    },
    'Sort by': {
      Relevance: 'relevance',
      'Upload date': 'date',
      'View count': 'viewCount',
      Rating: 'rating',
    },
  };

  const options = {};
  Object.entries(filtersObject).forEach(([name, value]) => {
    options[[filterNamesLookupTable[name]]] = filterValuesLookupTable[name][value];
  });

  return options;
};
