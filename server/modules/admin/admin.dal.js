import { executeQuery } from '../../config/db.js';

export const createCenter = async (centerData) => {
  const {
    center_name,
    center_city,
    center_province,
    center_address,
    center_phone,
    center_email,
    center_auth_doc
  } = centerData;

  try {
    const result = await executeQuery(
      `INSERT INTO center (center_name, center_city, center_province, center_address, center_phone, center_email, center_auth_doc)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [center_name, center_city, center_province, center_address, center_phone, center_email, center_auth_doc]
    );

    return result;
  } catch (err) {
    console.log("Error al crear el centro:", err);
    throw new Error("Error al crear el centro");
  }
};