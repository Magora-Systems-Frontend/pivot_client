import { mockedAxios as axios} from './axiosClient';
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios, { delayResponse: 500 }); // imitate request
mock.onGet('/classes').reply(200, require('../mocks/classes.json'));
mock.onPost('/classes').reply((config) => {
  const response = require('../mocks/class.json');
  return [200, {...response, data: {...response.data, ...JSON.parse(config.data)}}];
});
mock.onPut(/\/classes\/\d+/).reply((config) => {
  const response = require('../mocks/class.json');
  return [200, {...response, data: {...response.data, ...JSON.parse(config.data)}}];
});
mock.onPut(/\/classes\/\d+\/move/).reply(200, require('../mocks/success.json'));

mock.onGet('/classCollections').reply(200, require('../mocks/classCollections.json'));
mock.onPost('/classCollections').reply((config) => {
  const response = require('../mocks/classCollection.json');
  return [200, {...response, data: {...response.data, ...JSON.parse(config.data)}}];
});
mock.onPut(/\/classCollections\/\d+/).reply((config) => {
  const response = require('../mocks/classCollection.json');
  return [200, {...response, data: {...response.data, ...JSON.parse(config.data)}}];
});

export function getClasses() {
  return axios.get('/classes');
}

export function createClass(data) {
  return axios.post('/classes', data);
}

export function updateClass(id, data) {
  return axios.put(`/classes/${id}`, data);
}

export function moveClass(id, collectionId) {
  return axios.put(`/classes/${id}/move`, { collectionId });
}

export function getClassCollections() {
  return axios.get('/classCollections');
}

export function createClassCollection(data) {
  return axios.post('/classCollections', data);
}

export function updateClassCollection(id, data) {
  return axios.put(`/classCollections/${id}`, data);
}
