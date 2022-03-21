import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const userID = request.user_id;
	const usersRepository = getCustomRepository(UsersRepositories);

	const { admin } = await usersRepository.findOne(userID);

	if (admin) {
		return next();
	}
	return response.status(401).json({ error: "Unauthorized" });
}
