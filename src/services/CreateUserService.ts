import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface UserRequest {
	name: string;
	email: string;
	admin?: boolean;
	password: string;
}

class CreateUserService {
	async execute({ name, email, admin = false, password }: UserRequest) {
		const usersRepository = getCustomRepository(UsersRepositories);

		if (!email) {
			throw new Error("Email is missing");
		}

		const userAlreadyExists = await usersRepository.findByEmailAndName(
			name,
			email
		);
		const passwordHash = await hash(password, 8);

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		const user = await usersRepository.createAndSave(
			name,
			email,
			admin,
			passwordHash
		);

		return user;
	}
}

export { CreateUserService };
