import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { configDotenv } from "dotenv";

import type { Headers, FileToUpload } from "./types.d.ts";

const BASIC_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const YA_DISK_API = "https://cloud-api.yandex.net/";
const DOG_CEO_API = "https://dog.ceo/";

abstract class ApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly headers: Headers,
    private readonly authToken: string = "",
  ) {}

  public async get(endpoint: string = "", params?: any, signal?: AbortSignal): Promise<any> {
    try {
      const client = this.createClient(params);
      const response = await client.get(endpoint, { signal });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async post(endpoint: string = "", params?: any, data?: any, signal?: AbortSignal): Promise<any> {
    try {
      const client = this.createClient(params);
      const response = await client.post(endpoint, data, { signal });
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async put(endpoint: string = "", params?: any): Promise<any> {
    try {
      const client = this.createClient(params);
      const response = await client.put(endpoint);
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private createClient(params: object = {}): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      headers: this.headers,
      params: params,
    };
    if (this.authToken) {
      config.headers = {
        ...this.headers,
        Authorization: `OAuth ${this.authToken}`,
      };
    }
    return axios.create(config);
  }

  private handleError(error: any): never {
    throw new Error(error.message);
  }
}

export class YaDiskClient extends ApiClient {
  constructor() {
    configDotenv();
    super(YA_DISK_API, BASIC_HEADERS, process.env.YA_DISK_TOKEN || "");
  }

  public async createFolder(name: string) {
    const endpoint = "/v1/disk/resources/";
    await this.put(endpoint, { path: name });
  }

  public async uploadFile(file: FileToUpload) {
    const endpoint = "/v1/disk/resources/upload/";
    await this.post(endpoint, { path: `${file.path}/${file.name}`, url: file.source });
  }
}

export class DogCeoClient extends ApiClient {
  constructor() {
    super(DOG_CEO_API, BASIC_HEADERS);
  }

  public async getSubBreeds(breed: string): Promise<string[]> {
    const endpoint = `/api/breed/${breed}/list`;
    const response = await this.get(endpoint);
    return response.message;
  }

  public async getRandomImageUrl(breed: string, subBreed?: string): Promise<string> {
    const breedEndpoint = `/api/breed/${breed}/images/random`;
    const subBreedEndpoint = `/api/breed/${breed}/${subBreed}/images/random`;

    const endpoint = subBreed ? subBreedEndpoint : breedEndpoint;
    const response = await this.get(endpoint);
    return response.message;
  }
}
