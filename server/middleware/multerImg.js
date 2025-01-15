import multer from 'multer'
import path from 'path';

function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      callback(new Error('Solo se permiten imágenes de tipo JPEG, JPG, PNG o GIF'));
    }
  };

  const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter  
  }).single("img");

  return upload;
}

export default uploadImage;