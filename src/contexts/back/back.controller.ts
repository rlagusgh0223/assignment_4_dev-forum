import { Router } from "express";
import postService from "../post/post.service";
import backService from "./back.service";

const backController = Router();

backController.post("/", postService.createPost);
backController.get("/", backService.getPost);
backController.put("/:tableId", postService.updatePost);
backController.delete("/:tableId", postService.deletePost);

export default backController;
