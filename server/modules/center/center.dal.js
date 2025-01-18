import { executeQuery } from "../../config/db.js";

class CenterDal {
  getAllCenters = async () => {
    try {
      let sql = `SELECT center_name, center_id FROM center WHERE center_is_deleted = 0`;
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new CenterDal();