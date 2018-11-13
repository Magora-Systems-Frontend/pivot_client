import axios, { AxiosInstance } from "axios";
import { getFromLocalState } from "../localstorage";
import { AUTH_USER_INFO } from "../auth/constants";

const { API_URL, API_VERSION } = process.env;

class AxiosClient {
  private readonly client?: AxiosInstance = null;
  private readonly mockedClient?: AxiosInstance = null;

  constructor() {
    const localAxios: AxiosInstance = axios.create({
      baseURL: `${API_URL}/v${API_VERSION}`,
      timeout: 5000
    });

    const mockedAxios: AxiosInstance = axios.create();

    [localAxios, mockedAxios].forEach(client => {
      client.interceptors.request.use((config) => {
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: null
        };
        const userInfo = getFromLocalState(AUTH_USER_INFO);
        if (userInfo && userInfo.accessToken) {
          headers.Authorization = `Bearer ${userInfo.accessToken}`;
        }
        return {
          ...config,
          headers
        };
      });
      client.interceptors.response.use(
        response => Promise.resolve((response && response.data) ? response.data.data : null),
        error => Promise.reject(error.response)
      );
    });

    this.client = localAxios;
    this.mockedClient = mockedAxios;
  }

  getAxios() {
    return this.client;
  }
  getMockedAxios() {
    return this.mockedClient;
  }
}

export default new AxiosClient().getAxios();
export const mockedAxios = new AxiosClient().getMockedAxios();
