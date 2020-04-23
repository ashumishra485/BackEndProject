import * as multer from 'multer';
import * as crypto from 'crypto';
import * as path from 'path';

export const MULTER_STORAGE = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/')
    },
    filename: function (req, file, callback) {
        crypto.randomBytes(16, (err, buf) => {
            callback(err, buf.toString('hex') + path.extname(file.originalname))
        });
    }
});
