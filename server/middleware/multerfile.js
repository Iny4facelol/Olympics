import multer from 'multer'
import path from 'path';

function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: `./public/files/${folder}`,
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, callback) => {
    const filetypes = /pdf|doc|txt|otd/; //archivos que queramos permitir que se puedan subir
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      callback(new Error('Solo se permiten archivos de tipo PDF, DOC, TXT o OTD')); 
    }
  };

  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
  }).single("file");

  return upload;
}

export default uploadImage;
