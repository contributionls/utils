import axios from "axios";

export function api(url, config) {
  return axios(url, config);
}
