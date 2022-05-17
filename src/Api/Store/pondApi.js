import axiosClient from "../AxiosConfig/axiosClient";

const pondApi = {
    getAllPonds: ()=>{
        const url = "/ponds/";
        return axiosClient.get(url);
    },
    getPondsType: ()=>{
        const url = "/ponds/types";
        return axiosClient.get(url);
    },
    getPondsCategorizes: ()=>{
        const url = "/ponds/categorizes";
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
        const url = "/ponds/" + id + "/status";
        return axiosClient.patch(url, payload);
    },
    updatePond: (id, payload) => {
        const url = "/ponds/" + id;
        return axiosClient.patch(url, payload);
    },
    addPond: (params) => {
        const url = "/ponds/?" + params;
        return axiosClient.post(url, params);
    },
    getImagePond: (id)=>{
        const url = "/ponds/"+id+"/medias";
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