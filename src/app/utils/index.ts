import {environment} from '../../environments/environment';

const APICore: string = environment.urlApi;

export const buildURL = (serviceUrl: string): string => `${APICore + serviceUrl}`;
