import { Request, Response } from 'express';
import { Map } from 'immutable';
import { MongooseError, Types } from 'mongoose';

import Image from '../../Models/Image';
import Project from '../../Models/Project';
import Tag from '../../Models/Tag';
import responseFormatter from '../../Utils/responseFormatter';

class ProjectController {
  public static async getAllProjects(req: Request, res: Response) {
    try {
      const { tags, featured } = req.query;

      const filter: any = {};

      if (typeof tags === 'string') {
        const tag = await Tag.find({ label: { $all: tags.split(',') } });
        filter.tags = { $in: tag.map((item) => item._id) };
      }

      if (featured === '1') {
        filter.featured = true;
      }

      const data = await Project.find(filter)
        .populate({
          path: 'image tags',
          select: { __v: 0, projects: 0, of: 0, user: 0 },
        })
        .select({ __v: 0 })
        .sort({ createdAt: -1 });

      return res.status(200).send({ success: true, data });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id, { __v: 0 }).populate({
        path: 'image tags',
        select: { __v: 0, projects: 0, of: 0, user: 0 },
      });

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: '沒有找到此專案。' });
      }

      return res.status(200).send({ success: true, data: project });
    } catch (error) {
      const err = error as MongooseError;
      return res
        .status(500)
        .send({ message: 'Internal Server Error', error: err });
    }
  }

  public static async createProject(req: Request, res: Response) {
    try {
      const data = new Project({
        ...req.body,
      });

      const tags = await Tag.find({ _id: { $in: data.tags } });

      const resData = await Project.create(data);
      tags.forEach(async (tag) => {
        await tag.updateOne({
          $addToSet: { projects: resData._id },
        });
      });

      await Image.findByIdAndUpdate(data.image, { project: resData._id });

      if (req.body.image) {
        const image = await Image.findById(data.image);
        if (!image)
          return res.status(404).send({ message: 'Image not found.' });
        const of: Types.ObjectId[] = [...(image.of as Types.ObjectId[])];
        of.push(resData._id);
        await image.updateOne({ of, updatedAt: new Date() });
      }

      const newData = await resData.populate({
        path: 'image',
        select: { __v: 0, user: 0 },
      });
      return res.status(200).send({
        success: true,
        message: '建立成功。',
        data: newData.toObject(),
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { tags: newTags } = req.body;

      const project = await Project.findById(id);

      if (!project) {
        return responseFormatter({
          res,
          status: 404,
          message: '沒有找到此專案。',
        });
      }

      // Convert both arrays to strings for comparison
      const projectTagsToString = project.tags.map((tag) => tag.toString());
      const requestBodyTagsToString = req.body.tags;

      const isTagsEqual = isMatchTag(
        projectTagsToString,
        requestBodyTagsToString,
      );

      if (!isTagsEqual) {
        const tags = await Tag.find({ _id: { $in: project.tags } });

        tags.forEach(async (tag) => {
          await tag.updateOne({
            $pull: { projects: project._id },
          });
        });

        const newTagsData = await Tag.find({ _id: { $in: newTags } });

        newTagsData.forEach(async (tag) => {
          await tag.updateOne({
            $addToSet: { projects: project._id },
          });
        });
      }

      const data = {
        ...req.body,
        updatedAt: new Date(),
      };

      const resData = await Project.findByIdAndUpdate(project._id, data, {
        new: true,
      }).populate({ path: 'image', select: { __v: 0 } });

      return responseFormatter({
        res,
        status: 200,
        message: '更新成功。',
        data: resData,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateProjectFeatured(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id);

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: '沒有找到此專案。' });
      }

      const data = {
        featured: !project.featured,
        updatedAt: new Date(),
      };

      await project.updateOne(data);

      return res.status(200).send({
        success: true,
        message: '更新成功。',
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find project.' });
      }

      const tags = await Tag.find({ _id: { $in: project.tags } });
      tags.forEach(async (tag) => {
        await tag.updateOne({ $pull: { projects: project._id } });
      });

      const image = await Image.findById(project.image);
      if (!image) return res.status(404).send({ message: 'Image not found.' });
      const of: Types.ObjectId[] = [...(image.of as Types.ObjectId[])].filter(
        (item) => item.toString() !== project._id.toString(),
      );
      await image.updateOne({ of });

      await project.deleteOne();

      return res.status(200).send({
        success: true,
        message: '刪除成功。',
      });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }
}

export default ProjectController;

function isMatchTag(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 将数组转换为元素计数的Map
  let map1 = Map<string, number>();
  arr1.forEach((item) => {
    map1 = map1.update(item, 0, (count) => count + 1);
  });

  let map2 = Map<string, number>();
  arr2.forEach((item) => {
    map2 = map2.update(item, 0, (count) => count + 1);
  });

  // 比较两个Map是否相等
  return map1.equals(map2);
}
