import { Request, Response } from 'express';
import { PipelineStage, Types } from 'mongoose';

import Project from '../../../models/Project';
import Tag from '../../../models/Tag';

class ProjectApi {
  public static async getAllProjects(req: Request, res: Response) {
    try {
      const aggs: PipelineStage[] = [
        {
          $lookup: {
            from: Tag.collection.name,
            localField: 'tags',
            foreignField: '_id',
            as: 'tags',
          },
        },
        {
          $group: {
            _id: '$_id',
            createdAt: { $first: '$createdAt' },
            image: { $first: '$image' },
            name: { $first: '$name' },
            description: { $first: '$description' },
            company: { $first: '$company' },
            number: { $first: '$number' },
            url: { $first: '$url' },
            introduce: { $first: '$introduce' },
            tags: { $first: '$tags' },
            updatedAt: { $first: '$updatedAt' },
            featured: { $first: '$featured' },
          },
        },
        {
          $sort: { number: -1 },
        },
        {
          $project: { 'tags.createdAt': 0, 'tags.projects': 0, 'tags.__v': 0 },
        },
        {
          $addFields: { updatedAt: { $last: '$updatedAt' } },
        },
      ];
      const tagStr = req.query.tags as string | undefined;
      if (tagStr) {
        const tags = tagStr.split(',');
        aggs.push({
          $match: { 'tags.name': { $all: tags } },
        });
      }
      const data = await Project.aggregate(aggs);
      return res.status(200).send({ success: true, data });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async getProjectsByNumber(req: Request, res: Response) {
    try {
      const { number } = req.params;

      const project = await Project.findOne({ number });

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find project.' });
      }

      return res.status(200).send({ success: true, data: project });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async createProject(req: Request, res: Response) {
    try {
      const data = req.body;

      const project = await Project.findOne({ number: data.number });

      if (project) {
        return res
          .status(404)
          .send({ success: false, message: 'Project is exist already.' });
      }

      await Project.create(data);

      return res
        .status(200)
        .send({ success: true, message: 'Create project success.' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateProjectByNumber(req: Request, res: Response) {
    try {
      const { number } = req.params;
      const data = req.body;
      const project = await Project.findOne({ number });

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find project.' });
      }

      const updatedAt = project.updatedAt;
      if (updatedAt.length >= 5) updatedAt.shift();
      updatedAt.push(new Date());
      data.updatedAt = updatedAt;

      await project.update(data);

      return res.status(200).send({
        success: true,
        message: 'Update project success.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async updateFeaturedByNumber(req: Request, res: Response) {
    try {
      const { number } = req.params;
      const data = req.body;
      const project = await Project.findOne({ number });

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find project.' });
      }

      const updatedAt = project.updatedAt;
      if (updatedAt.length >= 5) updatedAt.shift();
      updatedAt.push(new Date());
      data.updatedAt = updatedAt;

      await project.update({ featured: data.featured });

      return res.status(200).send({
        success: true,
        message: 'Update project success.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }

  public static async deleteProjectByNumber(req: Request, res: Response) {
    try {
      const { number } = req.params;
      const project = await Project.findOne({ number });

      if (!project) {
        return res
          .status(404)
          .send({ success: false, message: 'Can not find project.' });
      }

      await project.delete();

      return res.status(200).send({
        success: true,
        message: 'Delete project success.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal Server Error', error });
    }
  }
}

export default ProjectApi;
