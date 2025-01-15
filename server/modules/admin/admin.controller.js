import { createCenter } from './admin.dal.js';

export const addCenter = async (req, res) => {
  const centerData = req.body;

  try {
    const result = await createCenter(centerData);
    
    return res.status(201).json({
      message: 'Centro creado con éxito',
      centerId: result.insertId
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al crear el centro' });
  }
};