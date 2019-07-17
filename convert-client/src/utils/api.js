import axios from "axios";

export function api(url, config) {
  return axios(url, config).then(result => {
    if (typeof result.data === "object") {
      return JSON.stringify(result.data, null, 2);
    } else {
      return result.data;
    }
  });
}
