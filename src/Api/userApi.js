import axiosClient from "./AxiosConfig/axiosClient";

const userApi = {
    userLogin: (query) => {
      const url = "/users/login";
      return axiosClient.post(url, {
        "user": query
      });
    },
    userLoginToken: (token) => {
        const url = "/login";
        return axiosClient.post(url, {
            headers: {"Authorization": `Bearer ${token}`}
        });
    },
}

export default userApi;
