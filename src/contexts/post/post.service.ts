import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class PostService {
  // C
  async createPost(
    req: Request<
      never,
      unknown,
      {
        title: string;
        content: string;
        boardType: string;
      }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, content, boardType } = req.body;
      if (!boardType.trim())
        throw new Error("front/back 둘 중 하나를 입력하세요");
      const post = await prismaClient.post.create({
        data: {
          title,
          content,
          boardType,
        },
      });
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  // U
  async updatePost(
    req: Request<{ tableId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tableId = Number(req.params.tableId);

      const { title, content } = req.body;

      const table = await prismaClient.post.update({
        where: { id: tableId },
        data: { title, content },
        select: {
          title: true,
          content: true,
          comments: true,
          likes: true,
        },
      });

      res.json(table);
    } catch (e) {
      next(e);
    }
  }

  // D
  async deletePost(
    req: Request<{ tableId: Number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("delete");
      const parsedTableId = Number(req.params.tableId);
      if (isNaN(parsedTableId)) throw new Error("TableId is not a number");

      await prismaClient.post.delete({ where: { id: parsedTableId } });

      res.json(parsedTableId);
    } catch (e) {
      next(e);
    }
  }
}

const postService = new PostService();
export default postService;
