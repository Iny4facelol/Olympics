import { executeQuery } from '../../config/db.js';

class UserDal {
  
  getCenterByName = async (center_name) => {
    try {
      const sql = `SELECT center_id FROM center WHERE center_name = ? AND center_is_deleted = 0`;
      const [result] = await executeQuery(sql, [center_name]);
      return result;
      
    } catch (error) {
      throw error;
    }
  };

  
  register = async (values) => {
    try {
      const sql = `
        INSERT INTO user (
          user_name,
          user_lastname,
          user_tutor_name,
          user_tutor_lastname,
          user_dni,
          user_city,
          user_address,
          user_phone,
          user_birth_date,
          user_email,
          user_password,
          user_permission_file,
          user_center_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
      await executeQuery(sql, values);
      
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();