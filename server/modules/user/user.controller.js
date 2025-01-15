import {comparePassword, hashPassword} from '../../utils/hashUtils.js';
import {generateToken,getIdFromToken} from '../../utils/tokenUtils.js';
import userDal from './user.dal.js';

class UserController {
  register = async (req, res) =>{
    try {
        const {name,lastname,email,tutor_name,tutor_lastname,dni,address,phone,password,repPassword,bdate,auth,center_name} = req.body;
        if(!email||!password||!repPassword || !name || !lastname || !tutor_name || !tutor_lastname || !dni || !address || !phone || !bdate || !auth || !center_name){
            throw new Error("Debes rellenar todo") 
        }else if(password !== repPassword){
            throw new Error("Las password no coinciden")
        }else{
            
            const hash = await hashPassword(password)
            const result = await userDal.register([email, hash])                
            res.status(200).json({msg:"ok"})
        }
    } catch (error) {           
        console.log(error);
         
        res.status(400).json(error.message)
    }
}
}

export default new UserController();