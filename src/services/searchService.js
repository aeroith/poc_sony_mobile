import ApiClient from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';
import utils from '../utils/utils';

export default class SearchService {
  static getAutocompleteResults(query, channelId) {
    const lowerCaseQuery = query.toLowerCase();
    return ApiClient.get(`/channels/${channelId}/programs?q=${lowerCaseQuery}`)
      // TODO: w92 should be taken from tmdb configuration
      .then(response => SearchService.getTMDBImages(response.data.data, 'w92'))
      .catch(err => console.log(err));
  }

  static getTMDBImages(data, imageSize) {
    const promiseAllData = data.map(item => TMDBClient.get(
      'Details',
      item.type || '',
      item.tmdb_id || ''
    ));
    return Promise.all(promiseAllData)
      .then(items => items.map((item, index) => {
        const imagePath = item.poster_path || item.backdrop_path;
        const tmdbImagePath = imagePath ? `${TMDBClient.configuration.images.secure_base_url}${imageSize || 'w92'}${imagePath}` : null;
        return {
          ...data[index],
          tmdbImagePath,
          dateRange: utils.getTMDBDateRange(item),
        };
      }))
      .catch(err => console.log(err));
  }
}
