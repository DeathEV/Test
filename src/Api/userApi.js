import axiosClient from "./AxiosConfig/axiosClient";

const userApi = {
    userLogin: (query) => {
        const url = "/login";
        return axiosClient.post(url, query);
    },
    userLoginToken: (token) => {
        const url = "/login";
        return axiosClient.post(url, {
            headers: {"Authorization": `Bearer ${token}`}
        });
    },
}

export default userApi;
