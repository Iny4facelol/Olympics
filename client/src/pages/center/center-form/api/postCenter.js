import { fetchData } from "../../../../utils/axios/axiosHelper"

export const postCenter = async (formData) => {
  return fetchData(`api/admin/addCenter`, "POST", formData);
}
