import { UploadApiErrorResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Types } from 'mongoose';

import User from '../../Models/Auth';
import Image from '../../Models/Image';
import Project from '../../Models/Project';
import cloudinary from '../../Provider/Cloudinary';
import Locals from '../../Provider/Locals';

const imageDict: { [key: string]: string } = {
  project: 'Portfolio/Projects',
  article: 'Portfolio/Articles',
  experience: 'Portfolio/Experiences',
};

class FileController {
  public static async getImageList(req: Request, res: Response) {
    try {
      const { folder, page, size } = req.query;

      const { _id } = req.body.user;

      const filter: any = { user: _id };
      let field: any = { __v: 0, user: 0, folder: 0 };

      // const limit = parseInt(size as string) || 20;
      // const skip = (parseInt(page as string) - 1) * limit || 0;

      if (folder) filter.folder = folder;
      if (folder === 'avatar') field = { ...field, of: 0 };

      const result = await Image.find(filter, field).sort({
        createdAt: -1,
      });
      // .skip(skip)
      // .limit(limit);

      return res.status(200).send({
        success: true,
        total: result.length,
        data: result,
      });
    } catch (error) {
      const cloudinaryError = error as UploadApiErrorResponse;
      return res
        .status(cloudinaryError.error.http_code)
        .send({ message: 'Internal Server Error', error });
    }
  }

  public static async uploadImage(req: Request, res: Response) {
    const { user } = req.body;

    try {
      if (!req.files)
        return res
          .status(400)
          .send({ success: false, message: 'No files were uploaded.' });

      const image = req.files.image as UploadedFile;

      if (!image.mimetype.includes('image'))
        return res.status(400).send({ message: '請上傳正確格式' });

      const { folder } = req.query;
      if (!folder)
        return res.status(400).send({ message: 'folder is required' });
      const folderName =
        process.env.NODE_ENV === 'development'
          ? 'test'
          : (imageDict[folder.toString()] as string);

      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: folderName,
        upload_preset: Locals.config().cloudinaryUploadPreset,
        unique_filename: true,
        tags: [folder],
      });

      const imageData = {
        public_id: result.public_id,
        url: result.secure_url,
        createdAt: result.created_at,
        user: user._id,
        folder,
      };

      const resImage = await Image.create(imageData);

      return res.status(200).send({
        success: true,
        message: '圖片上傳成功',
        data: resImage.toObject(),
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async uploadAvatarImage(req: Request, res: Response) {
    try {
      const { user, publicId } = req.body;

      if (!req.files)
        return res
          .status(400)
          .send({ success: false, message: 'No files were uploaded.' });

      const file = req.files.file as UploadedFile;

      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'Portfolio/Avatar',
        upload_preset: Locals.config().cloudinaryUploadPreset,
      });

      if (publicId) {
        await cloudinary.v2.uploader.destroy(publicId);
        await Image.deleteOne({ public_id: publicId });
      }

      await User.findByIdAndUpdate(user._id, { avatar: result.secure_url });

      const data = await Image.create({
        public_id: result.public_id,
        url: result.secure_url,
        createdAt: result.created_at,
        user: user._id,
        folder: 'avatar',
      })

      return res.status(200).send({
        success: true,
        message: '圖片上傳成功',
        data: data.toObject({
          versionKey: false,
          transform: (doc, ret) => {
            delete ret._id;
            delete ret.of;
            return ret;
          },
        }),
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateImage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .send({ success: false, message: 'public_id is required' });

      const image = await Image.findById(id);

      if (!image)
        return res
          .status(404)
          .send({ success: false, message: 'Image not found' });

      const project: Types.ObjectId[] = [...(image.of as Types.ObjectId[])];

      if (req.body.project) {
        const objectId = new Types.ObjectId(req.body.project);
        project.push(objectId);
      }

      await image.updateOne({
        ...req.body,
        of: project,
        updatedAt: new Date(),
      });

      return res.status(200).send({
        success: true,
        message: '圖片更新成功',
        // data: result.toObject(),
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async destroyImage(req: Request, res: Response) {
    try {
      const { publicId } = req.body;
      const { folder } = req.query;
      if (!publicId)
        return res
          .status(400)
          .send({ success: false, message: 'public_id is required' });

      await cloudinary.v2.uploader.destroy(publicId.toString());

      if (folder === 'project') await Project.updateOne({});

      return res.status(200).send({ success: true, message: '圖片刪除成功' });
    } catch (error) {
      const cloudinaryError = error as UploadApiErrorResponse;
      return res
        .status(cloudinaryError.error.http_code)
        .send({ message: 'Internal Server Error', error });
    }
  }
}

export default FileController;
