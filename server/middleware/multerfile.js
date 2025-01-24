import multer from 'multer';
import path from 'path';

function uploadImage() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/files/authorization');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = /pdf|doc|docx|txt/;
    const mimetypes = [
      'application/pdf',           // PDF
      'application/msword',        // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'text/plain'                 // TXT
    ];

    const mimetype = mimetypes.includes(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Solo se permiten archivos PDF, DOC o TXT'), false);
    }
  };

  const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter
  }).single('file');

  return upload;
}

export default uploadImage;
