import {comparePassword, hashPassword} from '../../utils/hashUtils.js';
// import {generateToken,getIdFromToken} from '../../utils/tokenUtils.js';
import userDal from './user.dal.js';

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

login = async (req, res) =>{
    const {email,password} = req.body;
    try {

        const result = await userDal.getUserByEmail(email)
        if(result.length === 0){
            res.status(401).json({message:"datos incorrectos"})
        }else{
            const user = result[0];
            const match = await comparePassword(password, user.user_password);
            if(match){
                const token = generateToken(user.user_id);
                res.status(200).json({token})
        }else{
            res.status(401).json({message:"datos incorrectos"})

        const {name,lastname,email,tutor_name,tutor_lastname,dni,address,phone,password,repPassword,bdate,auth,center_name,perm_file} = req.body;
        const values = [name,lastname,tutor_name,tutor_lastname,dni,auth,address,phone,bdate,email,password,perm_file,center_name]
        // Validaciones con ZOD 
        if(!email||!password||!repPassword || !name || !lastname || !tutor_name || !tutor_lastname || !dni || !address || !phone || !bdate || !auth || !center_name || !perm_file){
            throw new Error("Debes rellenar todo") 
        }else if(password !== repPassword){
            throw new Error("Las password no coinciden")
        }else{
            
            const hash = await hashPassword(password)
            const result = await userDal.register(values)                
            res.status(200).json({msg:"ok"})

        }
    }
        
    } catch (error) {
        res.status(500).json({message:"Error en el servidor"})
    }
}
}

export default new UserController();