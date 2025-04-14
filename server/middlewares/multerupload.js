import multer from "multer";
import { multerconfig } from "../lib/multerconfig.js";
const upload = (req, res, next) => {
  console.log(req.body);
  const { name } = req.body;
  console.log(name);
  const storage = multerconfig(name);
  const upload = multer({ storage }).array("images", 10);
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ message: "internal server error" });
      console.log(err);
      return;
    } else {
      const serverBaseURL = `${req.protocol}://${req.get("host")}`;
      req.images = req.files.map((file) => {
        const relativePath = file.path.split("public")[1].replace(/\\/g, "/");
        return `${serverBaseURL}/public${relativePath}`;
      });
      console.log(req.iamges);
      next();
    }
  });
};
export default upload;
