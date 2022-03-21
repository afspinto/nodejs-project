import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "./database";
import { router } from "../routes";

const port = 3000;
const app = express();

app.use(express.json());
app.use(router);

app.use(
	(error: Error, request: Request, response: Response, next: NextFunction) => {
		if (error instanceof Error) {
			return response.status(400).json({ error: error.message });
		}

		return response.status(500).json({ error: "Internal Server" });
	}
);

app.listen(port, () => console.log(`Server is running on: ${port}`));
