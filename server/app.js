import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors';
import adminRoutes from './modules/admin/admin.routes.js';
import userRoutes from './modules/user/user.routes.js';
import centerRoutes from './modules/center/center.routes.js';
import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccount.json' assert { type: 'json' };


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://olympics-8a544.firebaseio.com' // Cambia por tu URL de base de datos Firebase
  });
} else {
  admin.app(); // Usa la app ya inicializada
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/admin', adminRoutes);
app.use('/api/user',userRoutes)
app.use('/api/center', centerRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

export default app;

