import axios from 'axios';
import { APP_KEYS } from '../common/consts';

interface ConfigData {
  url: string;
  headers?: any;
}

type ConfigWithoutDataAndUrl = Omit<any, keyof ConfigData>;

class HttpService {
  baseUrl: string;

  fetchingService: any;

  apiVersion: string;

  constructor(
    baseUrl = APP_KEYS.BACKEND_KEYS.SERVER_URL || '',
    fetchingService = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  populateTokenToHeaderConfig() {
    const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCESSTOKEN);
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      };
    }
    return {};
  }

  extractUrlAndDataFromConfig({
    data,
    url,
    ...configWithoutDataAndUrl
  }: ConfigData & ConfigWithoutDataAndUrl) {
    return configWithoutDataAndUrl;
  }

  get(config: { [x: string]: any; headers?: any; url: any; data?: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config))
      .then((res: any) => res.data);
  }

  post(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  put(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.put(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  delete(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}

export default HttpService;
