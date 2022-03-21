import { Router } from "express";
import { CreateUserController } from "./src/controllers/CreateUserController";
import { CreateTagController } from "./src/controllers/CreateTagController";
import { ensureAdmin } from "./src/middlewares/ensureAdmin";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { CreateComplimentController } from "./src/controllers/CreateComplimentController";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";
import { ListUserSendComplimentController } from "./src/controllers/ListUserSendComplimentController";
import { ListUserReceiveComplimentController } from "./src/controllers/ListUserReceiveComplimentController";
import { ListTagsController } from "./src/controllers/ListTagsController";
import { ListUsersController } from "./src/controllers/ListUsersController";
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentController = new ListUserSendComplimentController();
const listUserReceiveComplimentController =
	new ListUserReceiveComplimentController();

const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post(
	"/tags",
	ensureAuthenticated,
	ensureAdmin,
	createTagController.handle
);

router.post(
	"/compliments",
	ensureAuthenticated,
	createComplimentController.handle
);

router.get(
	"/tags",
	ensureAuthenticated,
	ensureAdmin,
	listTagsController.handle
);
router.get(
	"/users",
	ensureAuthenticated,
	ensureAdmin,
	listUsersController.handle
);

router.get(
	"/users/compliments/send",
	ensureAuthenticated,
	listUserSendComplimentController.handle
);
router.get(
	"/users/compliments/receive",
	ensureAuthenticated,
	listUserReceiveComplimentController.handle
);
export { router };
