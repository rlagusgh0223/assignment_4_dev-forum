import { Router } from "express";
import backController from "./back/back.controller";
import commentController from "./comment/comment.controller";
import frontController from "./front/front.controller";
import usersController from "./users/users.controller";

const controllers = Router();

controllers.use("/users", usersController);
controllers.use("/front", frontController);
controllers.use("/back", backController);
controllers.use("/comment", commentController);

export default controllers;
