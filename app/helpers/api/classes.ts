import axios from './axiosClient';
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios, { delayResponse: 1500 });
mock.onGet('/classes').reply(200, require('../mocks/classes.json'));
mock.onPost('/classes').reply(200, require('../mocks/class.json'));

mock.onGet('/classCollections').reply(200, require('../mocks/classCollections.json'));
mock.onPost('/classCollections').reply(200, require('../mocks/classCollection.json'));

export function getClasses() {
  return axios.get('/classes');
}

export function createClass(data) {
  return axios.post('/classes');
}

export function getClassCollections() {
  return axios.get('/classCollections');
}

export function createClassCollection(data) {
  return axios.post('/classCollections');
}
