import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

// 회원이 작성한 테이블 - 그 테이블에 댓글 달기
// 테이블id에 맞춰 테이블에 들어가 그 안의 comments에 댓글을 남긴다

//게시글 식별 - tableId
class CommentService {
  // U
  async updatePost(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    try {
      const { tableId, content } = req.body;
      // const userId = req.;

      const { comments } = req.body;

      const table = await prismaClient.comment.update({
        where: { id: tableId },
        data: {
          content: content,
          postId: Number(tableId),
          // userId: userId,
        },
      });

      res.json(table);
    } catch (e) {
      next(e);
    }
  }
}

const commentService = new CommentService();
export default commentService;
