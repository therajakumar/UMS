import { Router } from "express";
import upload from "../config/multer";
import { getImages, uploadImage } from "../controller/image.controller";

const imageRouter = Router();

imageRouter.post("/upload", upload.single("image"), (req, res) => {
  uploadImage(req, res);
});

imageRouter.get("/get-images", (req, res) => {
  getImages(req, res);
});

export default imageRouter;
