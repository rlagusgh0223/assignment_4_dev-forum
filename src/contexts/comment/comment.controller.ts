import { Router } from "express";
import commentService from "./comment.service";

const commentController = Router();

commentController.post("/:tableId", commentService.updatePost);

export default commentController;
