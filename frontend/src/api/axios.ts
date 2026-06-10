import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { makeUseAxios } from "axios-hooks";
// import { apiConfig } from "./config";

const API_URL = import.meta.env.VITE_API_URL;

export const apiConfig = {
  baseUrl: API_URL,
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
  defaultOptions: {
    manual: true,
    useCache: false,
    ssr: false,
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const customConfig = config as AxiosCustomeRequestConfig;
    const accessToken = "asdfjkanl"; // Replace with a function to fetch a real token in production

    if (!config.headers) {
      config.headers = {};
    }

    if (!customConfig.custom?.excludeTokenIdFromHeader) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response, "hit response");
    return response;
  },

  (error) => {
    if (error?.response?.status === 500) {
      alert("Server is down, Please try after some time.");
    }
    return Promise.reject(error);
  },
);

export interface AxiosCustomeConfig {
  excludeTokenIdFromHeader?: boolean;
}

export interface AxiosCustomeRequestConfig extends AxiosRequestConfig {
  custom?: AxiosCustomeConfig;
}

export async function apiGet<T = any>(
  resource: string,
  config?: AxiosCustomeRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosInstance.get<T>(resource, config);
}

export async function apiPost<T = any>(
  resource: string,
  data?: any,
  config?: AxiosCustomeRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosInstance.post<T>(resource, data, config);
}

export async function apiDelete<T = any>(
  resource: string,
  config?: AxiosCustomeRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosInstance.delete<T>(resource, config);
}

export async function apiPatch<T = any>(
  resource: string,
  data?: any,
  config?: AxiosCustomeRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosInstance.patch<T>(resource, data, config);
}

export async function apiPut<T = any>(
  resource: string,
  data?: any,
  config?: AxiosCustomeRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosInstance.put<T>(resource, data, config);
}

// Uncomment and use for file uploads
// export async function apiUpload<T = any>(
//   resource: string,
//   data: any,
//   config?: AxiosCustomeRequestConfig,
//   progressCallback?: (progress: number) => void
// ): Promise<AxiosResponse<T>> {
//   return axiosInstance.post<T>(
//     resource,
//     data,
//     {
//       ...config,
//       headers: {
//         ...config?.headers,
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         if (progressEvent.total) {
//           const uploadPercentage = Math.round(
//             (progressEvent.loaded / progressEvent.total) * 100
//           );
//           progressCallback && progressCallback(uploadPercentage);
//         }
//       },
//     }
//   );
// }
