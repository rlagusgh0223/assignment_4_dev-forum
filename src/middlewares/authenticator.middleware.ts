import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import prismaClient from "../prisma/client.prisma";

const freePass = [/^\/users\/signUp$/, /^\/users\/[^\/]+\/[^\/]+$/];
//["/users/signUp", "/users/:userEmail/:pw"];

export default function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 여권 발급? 지나가
  const isFreePass = freePass.some((pattern) => pattern.test(req.path));
  if (isFreePass) return next();

  // 여권 가져왔니? 없으면 돌아가
  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  if (!accessToken) return res.sendStatus(401);

  //여권 유효한거 맞니?
  try {
    const { sub: email } = jwt.verify(accessToken, JWT_SECRET_KEY);
    const user = prismaClient.user.findUnique({
      where: { email: req.params.userEmail },
    });
    // const user = await prismaClient.user.findUnique({
    //   where: { email: req.params.userEmail },
    //   select: {
    //     id: true,
    //     email: true,
    //     createdAt: true,
    //     profile: true,
    //     encryptedPassword: true,
    //   },
    // });
    if (!user) return res.sendStatus(404);
  } catch (e) {
    return res.sendStatus(401);
  }
  next();
}
