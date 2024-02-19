import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class FrontService {
  // R
  async getPost(req: Request, res: Response) {
    console.log("front");
    const posts = await prismaClient.post.findMany({
      where: { boardType: "front" },
      select: {
        id: true,
        title: true,
        content: true,
        comments: true,
        likes: true,
      },
    });
    console.log("front");
    res.json(posts);
  }
}

const frontService = new FrontService();
export default frontService;
