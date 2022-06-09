import axiosClient from "./AxiosConfig/axiosClient";

const userApi = {
  userLogin: (query) => {
    const url = "/auth/login";
    const formData = new FormData();
    formData.append("username", query.email);
    formData.append("password", query.password);
    return axiosClient.post(url, formData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      }
    });
  },
  checkTokenUser: () => {
    const url = "/users/me"
    return axiosClient.get(url)
  },
}

export default userApi;
