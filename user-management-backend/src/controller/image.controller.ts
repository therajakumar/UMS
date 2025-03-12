import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/response";
import Image from "../modals/image.modal";

export async function uploadImage(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json(new ErrorResponse(400, "Please fill all details"));
    }

    if (!req.file) {
      {
        return res
          .status(400)
          .json(new ErrorResponse(400, "Please fill all details"));
      }
    }

    const key = req.file?.filename;
    const user = req.user;

    const newImage = new Image({
      name,
      key,
      uploadedBy: user?.id,
    });

    await newImage.save();
    res.status(200).json(
      new SuccessResponse(200, {
        id: newImage._id,
        name,
        key,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
  }
}

export async function getImages(req: Request, res: Response) {
  try {
    const user = req.user;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    if (!user) {
      return res
        .status(400)
        .json(new ErrorResponse(400, "Please fill all details"));
    }

    // Fetch only the images uploaded by the logged-in user
    const images = await Image.find({ uploadedBy: user.id })
      .skip(skip)
      .limit(pageSize);

    const totalImages = await Image.countDocuments({ uploadedBy: user.id });
    const totalPages = Math.ceil(totalImages / pageSize);

    res.status(200).json(
      new SuccessResponse(200, {
        success: true,
        page,
        pageSize,
        totalImages,
        totalPages,
        images,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
  }
}
