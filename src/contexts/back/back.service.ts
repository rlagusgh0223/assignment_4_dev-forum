import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class BackService {
  // R
  async getPost(req: Request, res: Response) {
    console.log("back");
    const posts = await prismaClient.post.findMany({
      where: { boardType: "back" },
      select: {
        id: true,
        title: true,
        content: true,
        comments: true,
        likes: true,
      },
    });
    res.json(posts);
  }
}

const backService = new BackService();
export default backService;
