import {comparePassword, hashPassword} from '../../utils/hashUtils.js';
// import {generateToken,getIdFromToken} from '../../utils/tokenUtils.js';
import userDal from './user.dal.js';

class UserController {
  register = async (req, res) =>{
    try {
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
    } catch (error) {           
        console.log(error);
         
        res.status(400).json(error.message)
    }
}
}

export default new UserController();