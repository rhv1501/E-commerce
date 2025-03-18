import multer from "multer";
import path from "path";
const multerconfig = (prodcutName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, `../public/uploads/${prodcutName}`));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  return storage;
};
export { multerconfig };
