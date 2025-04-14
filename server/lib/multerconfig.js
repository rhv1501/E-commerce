import multer from "multer";
import path from "path";
import fs from "fs";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const multerconfig = (prodcutName) => {
  console.log(prodcutName);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(
        __dirname,
        `../public/uploads/${prodcutName}`
      );
      fs.mkdirSync(uploadDir, { recursive: true });

      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return storage;
};

export { multerconfig };
