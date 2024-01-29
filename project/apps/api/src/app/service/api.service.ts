import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { AxiosRequestConfig } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'postForm';
type ReqOptions = {
  method: HttpMethod;
  endpoint: string;
  data?: any;
  options?: AxiosRequestConfig;
};

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  private async request<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ) {
    if (method === 'get' || method === 'delete') {
      const response = await this.httpService.axiosRef[method]<T>(url, options);

      return response.data;
    }

    const response = await this.httpService.axiosRef[method]<T>(
      url,
      data,
      options
    );

    return response.data;
  }

  users<T>({ method, endpoint, data = {}, options }: ReqOptions) {
    const url = `${ApplicationServiceURL.Users}/${endpoint}`;

    return this.request<T>(method, url, data, options);
  }

  blog<T>({ method, endpoint, data = {}, options }: ReqOptions) {
    const url = `${ApplicationServiceURL.Blog}/${endpoint}`;

    return this.request<T>(method, url, data, options);
  }

  fileVault<T>({ method, endpoint, data = {}, options }: ReqOptions) {
    const url = `${ApplicationServiceURL.FileVault}/${endpoint}`;

    return this.request<T>(method, url, data, options);
  }

  getAuthorizationHeader(req: Request): AxiosRequestConfig {
    return {
      headers: {
        Authorization: req.headers['authorization'],
      },
    };
  }
}
