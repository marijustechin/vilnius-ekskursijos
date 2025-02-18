import $api, { API_URL } from "../api/axios";

const BASE_URL = API_URL + "/users";

export default class UserService {
  async register(first_name: string, email: string, password: string) {
    return await $api.post(`${BASE_URL}/registration`, {
      first_name,
      email,
      password,
    });
  }
  async login(email: string, password: string) {
    return await $api.post(`${BASE_URL}/login`, { email, password });
  }
  async logout() {
    return await $api.post(`${BASE_URL}/logout`);
  }
}
