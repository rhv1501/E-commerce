import { Router } from "express";
const router = Router();
import verifyjwt from "../middlewares/verifyjwt.js";
import authVerify from "../middlewares/authVerify.js";
import { placeordeerofproduct, placeorderfromcart } from "../controllers/ordercontroller.js";

router.post("/", verifyjwt, authVerify, placeorderfromcart);
router.post("/:id",verifyjwt,authVerify,placeordeerofproduct)

// router.get("/",verifyjwt,authVerify,)
export default router;
