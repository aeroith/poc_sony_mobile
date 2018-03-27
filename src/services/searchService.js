import ApiClient from '../utils/api-client';
import TMDBClient from '../utils/tmdb-client';
import utils from '../utils/utils';

export default class SearchService {
  static getAutocompleteResults(query, channelId) {
    const lowerCaseQuery = query.toLowerCase();
    return ApiClient.get(`/channels/${channelId}/programs?q=${lowerCaseQuery}`)
      // TODO: w92 should be taken from tmdb configuration
      .then(response => SearchService.getTMDBImages(response.data.data))
      .catch(err => console.log(err));
  }

  static getTMDBImages(data) {
    const promiseAllData = data.map(item => TMDBClient.get(
      'Details',
      item.type || '',
      item.tmdb_id || ''
    ));
    return Promise.all(promiseAllData)
      .then(items => items.map((item, index) => {
        const tmdbImagePath = TMDBClient.generatePosterPath(item, 'w92');
        return {
          ...data[index],
          tmdbImagePath,
          dateRange: TMDBClient.getDateRange(item),
        };
      }))
      .catch(err => console.log(err));
  }
}
