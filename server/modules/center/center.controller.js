import centerDal from "./center.dal.js";

class CenterController {
  getAllCenters = async (req, res) => {
    try {
      const result = await centerDal.getAllCenters();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new CenterController();