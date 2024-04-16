import { Request, Response } from 'express';

import Project from '../../Models/Project';
import Tag from '../../Models/Tag';

class TagController {
  public static async getAllTags(req: Request, res: Response) {
    try {
      const tags = await Tag.find({}, { __v: 0 }).sort({
        createdAt: -1,
      });
      return res.status(200).send({ success: true, data: tags });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async createTag(req: Request, res: Response) {
    try {
      const { label, type } = req.body;

      if (!label || !type)
        return res
          .status(400)
          .send({ success: false, message: '請填入必要參數。' });

      const tag = await Tag.create(req.body);
      return res
        .status(200)
        .send({ success: true, data: tag.toObject(), message: '建立成功。' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateTag(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { label } = req.body;
      const tag = await Tag.findById(id);
      if (!tag) {
        return res
          .status(404)
          .send({ success: false, message: '沒有找到此標籤。' });
      }

      const resTag = await Tag.findByIdAndUpdate(id, { label }, { new: true });
      return res.status(200).send({
        success: true,
        data: resTag?.toObject(),
        message: '更新成功。',
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async deleteTag(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tag = await Tag.findById(id);
      if (!tag) {
        return res
          .status(404)
          .send({ success: false, message: '沒有找到此標籤。' });
      }

      await Project.updateMany(
        { tags: { $in: [id] } },
        { $pull: { tags: id } },
      );

      await tag.deleteOne();
      return res
        .status(200)
        .send({ success: true, data: tag, message: '刪除成功。' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }
}

export default TagController;
