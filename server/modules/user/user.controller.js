import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import userDal from "./user.dal.js";

class UserController {
  register = async (req, res) => {
    try {
      const {
        name,
        lastname,
        email,
        tutor_name,
        tutor_lastname,
        dni,
        address,
        city,
        phone,
        password,
        repPassword,
        bdate,
        auth,
        center_name,
      } = req.body;
      // Validación de campos
      if (
        !name ||
        !lastname ||
        !email ||
        !tutor_name ||
        !tutor_lastname ||
        !dni ||
        !address ||
        !city ||
        !phone ||
        !password ||
        !repPassword ||
        !bdate ||
        !auth ||
        !center_name
      ) {
        throw new Error("Debes rellenar todos los campos");
      }

      if (password !== repPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      const hash = await hashPassword(password);

      const values = [
        name,
        lastname,
        tutor_name,
        tutor_lastname,
        dni,
        city,
        address,
        phone,
        bdate,
        email,
        hash,
        auth,
        center_name,
      ];

      await userDal.register(values);

      res.status(200).json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await userDal.getUserByEmail(email);
      if (result.length === 0) {
        res.status(401).json({ message: "datos incorrectos" });
      } else {
        const user = result[0];
        const match = await comparePassword(password, user.user_password);
        if (match) {
          const token = generateToken(user.user_id);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "datos incorrectos" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  completeCenter = async (req, res) => {
    try {
      const {
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
      } = req.body;

      const { center_id } = req.params;
      console.log("EL CENTER ID EN EL CONTROLLER",center_id);
      
      if (
        !center_city ||
        !center_province ||
        !center_address ||
        !center_phone ||
        !center_auth_doc
      ) {
        throw new Error(
          "Todos los campos son requeridos para completar el centro."
        );
      }

      const result = await userDal.completeCenter({
        center_id,
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
      });

      return res.status(200).json({ message: "Centro completado con éxito." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  };

  completeResponsible = async (req, res) => {
    try {
      const {
        user_id,
        user_name,
        user_lastname,
        user_dni,
        user_phone,
        user_password,
      } = req.body;

      if (
        !user_id ||
        !user_name ||
        !user_lastname ||
        !user_dni ||
        !user_phone ||
        !user_password
      ) {
        throw new Error(
          "Todos los campos son requeridos para completar  responsable."
        );
      }

    const result = await userDal.completeResponsible({
      user_id,
      user_name,
      user_lastname,
      user_dni,
      user_phone,
      user_password
    });

    return res.status(200).json({ message: "Responsable completado con éxito." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

editResponsible = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_name, user_lastname, user_phone, user_dni } = req.body;


    console.log("Body:", req.body);
    console.log("Params:", user_id);

    const result = await userDal.updateResponsible(user_id, {
      user_name,
      user_lastname,
      user_phone,
      user_dni,
    });

    return res.status(200).json({
      message: "Responsable actualizado con éxito.",
      result,
    });
  } catch (error) {
    console.error("Error en editResponsible:", error);
    return res.status(500).json({ message: "Error al actualizar responsable.", error: error.message });
  }
};


}

export default new UserController();
