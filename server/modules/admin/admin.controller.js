import adminDal from "./admin.dal.js";



class AdminController {
  addOlympics = async (req, res) => {
    try {
      const {
        olympics_name,
        olympics_host_name,
        olympics_host_city,
        olympics_host_address,
        olympics_start_date,
        olympics_end_date,
        olimpics_description
      } = req.body;


      const dataToDal = {
        olympics_name,
        olympics_host_name,
        olympics_host_city,
        olympics_host_address,
        olympics_start_date,
        olympics_end_date,
        olimpics_description
      };

      const olympics_id = await adminDal.addOlympics(dataToDal);

      res.status(200).json({ olympics_id });
    } catch (error) {
      res.status(500).json({msg: "Error al crear las olimpiadas"});
    }
  };

  addCenter = async (req, res) => {
    const centerData = req.body;
  
    try {
      const result = await adminDal.createCenter(centerData);
      
      return res.status(201).json({
        message: 'Centro creado con éxito',
        centerId: result.insertId
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al crear el centro' });
    }
  };
}

export default new AdminController();
