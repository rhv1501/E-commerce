import multer from "multer";
import { multerconfig } from "../lib/multerconfig.js";
const upload = (req, res, next) => {
  const { productname } = req.body;
  const storage = multerconfig(productname);
  const upload = multer({ storage }).array("images", 10);
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ message: "internal server error" });
      return;
    } else {
      req.images = req.files.map((file) => file.path);
      next();
    }
  });
};
export default upload;
