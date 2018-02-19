import * as axios from "axios";

export default class SearchService {
  static getAutocompleteResults(query) {
    console.log('query: ', query);
    const lowerCaseQuery = query.toLowerCase();
    return axios.get(`http://localhost:3005/content?q=${lowerCaseQuery}`)
      .then(response => response.data)
      .catch(err => console.log(err));
  }
}
