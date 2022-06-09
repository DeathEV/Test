import axiosClient from "../AxiosConfig/axiosClient";

const pondApi = {
  getAllPonds: ()=>{
    const url = "/ponds/";
    return axiosClient.get(url);
  },
  getPondsType: ()=>{
    const url = "/pond-type/";
    return axiosClient.get(url);
  },
  getPondsCategorizes: ()=>{
    const url = "/pond-category/";
    return axiosClient.get(url);
  },
  deletePond: (id) => {
    const url = "/ponds/" + id;
    return axiosClient.delete(url, id);
  },
  getPondDetail: (id)=>{
    const url = "/ponds/"+id;
    return axiosClient.get(url,id);
  },
  updatePondStatus: (id, payload) => {
    const url = "/ponds/status/" +id;
    return axiosClient.patch(url, payload);
  },
  updatePond: (id, payload) => {
    const url = "/ponds/" + id;
    return axiosClient.patch(url, payload);
  },
  addPond: (params) => {
    const url = "/ponds/";
    return axiosClient.post(url, params);
  },
  getPond: (id, param) => {
    const query = param ? param : ""
    const url = "/ponds/" + id + "/adopt-area" + query;
    return axiosClient.get(url);
  },
  getImagePond: (id)=>{
    const url = "/ponds/"+id+"/photos";
    return axiosClient.get(url, {
      'id': id,
    });
  },
  uploadImagePond: (id, payload) => {
    const url = "/ponds/"+id+"/photos";
    return axiosClient.post(url , payload);
  },
}
export default pondApi
