import { AxiosResponse } from 'axios';
import $api, { API_URL } from '../api/axios';
import { IUserData } from '../types/user';

const BASE_URL = API_URL + '/users';

export default class UserService {
  static async getUserById(id: string): Promise<AxiosResponse<IUserData>> {
    return await $api.get<IUserData>(`${BASE_URL}/${id}`);
  }
}
