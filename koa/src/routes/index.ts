import Router from "koa-router";
import { getExample, postExample } from "../controllers/exampleController";

const router = new Router();

router.get("/example", getExample);
router.post("/example", postExample);

export default router;
