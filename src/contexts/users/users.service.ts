import { User } from "@prisma/client";
import bcrypt, { hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import prismaClient from "../../prisma/client.prisma";

class UsersService {
  async getUsers(_: Request, res: Response) {
    const users = await prismaClient.user.findMany();
    console.log("user");
    res.json(users);
  }

  async signUp(
    req: Request<
      never,
      unknown,
      {
        email: string;
        password: string;
        nickname: string;
        name: string;
        gender: string;
        age: number;
      }
    >,
    res: Response<Omit<User, "encryptedPassword">>,
    next: NextFunction
  ) {
    try {
      console.log("signUp");
      const { email, password, nickname, name, gender, age } = req.body;
      if (!email.trim()) throw new Error("No email");
      if (!password.trim()) throw new Error("No password");

      const encryptedPassword = await hash(password, 12);
      const user = await prismaClient.user.create({
        data: {
          email,
          encryptedPassword,
          profile: { create: { nickname, name, gender, age } },
        },
        select: { id: true, email: true, createdAt: true, profile: true },
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async logIn(req: Request<{ userEmail: string; pw: string }>, res: Response) {
    const parsedUser = req.params.userEmail;
    const pw = req.params.pw;

    console.log("logIn");
    const user = await prismaClient.user.findUnique({
      where: { email: parsedUser },
      select: {
        id: true,
        email: true,
        createdAt: true,
        profile: true,
        encryptedPassword: true,
      },
    });
    if (!user) return res.sendStatus(404);

    const isVerified = await bcrypt.compare(pw, user.encryptedPassword);
    if (!isVerified) return res.sendStatus(400);
    const token = jwt.sign({ parsedUser }, JWT_SECRET_KEY, {
      subject: parsedUser,
    });
    res.json(token);
  }
}

const usersService = new UsersService();
export default usersService;
