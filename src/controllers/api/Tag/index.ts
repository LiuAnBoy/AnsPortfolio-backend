import { Request, Response } from 'express';
import Tag from '../../../models/Tag';

class TagApi {
  public static async getAllTags(req: Request, res: Response) {
    try {
      const tags = await Tag.find({}, { __v: 0 });

      return res.status(200).send({ success: true, data: tags });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateTagsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const tag = await Tag.findById(id);

      if (!tag) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find tag.' });
      }

      await tag.update({ name });

      return res
        .status(200)
        .send({ success: true, message: 'Update tag success.' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async deleteTagsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tag = await Tag.findById(id);

      if (!tag) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find tag.' });
      }

      await tag.delete();

      return res
        .status(200)
        .send({ success: true, message: 'Delete tag success.' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }
}

export default TagApi;
