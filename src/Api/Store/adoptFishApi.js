import axiosClient from "../AxiosConfig/axiosClient";

const adoptFishApi = {
  getAdoptFishType:() =>{
    const url = "/adopt-types/";
    return axiosClient.get(url);
  },
  getAdoptFish: () => {
    const url = "/adopts/";
    return axiosClient.get(url);
  },
  addAdoptFish: (params) => {
    const url = "/adopts/";
    return axiosClient.post(url, params);
  },
  updateAdoptFish: (id, payload) => {
    const url = "/adopts/" + id;
    return axiosClient.patch(url, payload);
  },
  deleteAdoptFish: (id) => {
    const url = "/adopts/" + id;
    return axiosClient.delete(url, id);
  },
}
export default adoptFishApi
