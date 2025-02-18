import { AxiosResponse } from 'axios';
import $api, { API_URL } from '../api/axios';
import { IAuthResponse } from '../types/user';

const BASE_URL = API_URL + '/users';

export default class UserService {
  /**
   * Naudotojo registracija
   * @param first_name
   * @param email
   * @param password
   * @returns tokenai ir naudotojo duomenys
   */
  static async register(
    first_name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return await $api.post<IAuthResponse>(`${BASE_URL}/registration`, {
      first_name,
      email,
      password,
    });
  }

  /**
   * Naudotojo prisijungimas
   * @param email
   * @param password
   * @returns tokenai ir naudotojo duomenys
   */
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return await $api.post<IAuthResponse>(`${BASE_URL}/login`, {
      email,
      password,
    });
  }

  async logout(): Promise<void> {
    return await $api.post(`${BASE_URL}/logout`);
  }
}
