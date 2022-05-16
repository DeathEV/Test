import axiosClient from "../AxiosConfig/axiosClient";

const adoptFishApi = {
    getAdoptFishType:() =>{
        const url = "/adopt-types/";
        return axiosClient.get(url);
    },
    getAdoptFish: () => {
        const url = "/adopt-areas/";
        return axiosClient.get(url);
    },
    addAdoptFish: (params) => {
        const url = "/adopt-areas/?" + params;
        return axiosClient.post(url, params);
    },
    updateAdoptFish: (id, payload) => {
        const url = "/adopt-areas/" + id;
        return axiosClient.patch(url, payload);
    },
    deleteAdoptFish: (id) => {
        const url = "/adopt-areas/" + id;
        return axiosClient.delete(url, id);
    },
}
export default adoptFishApi