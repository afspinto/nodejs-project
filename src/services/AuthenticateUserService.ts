import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class IAuthenticateUserRequest {
	email: string;
	password: string;
}

class AuthenticateUserService {
	async execute({ email, password }: IAuthenticateUserRequest) {
		const usersRepository = getCustomRepository(UsersRepositories);

		const user = await usersRepository.findOne({ email });

		const passwordMatch = await compare(password, user.password);

		if (!user || !passwordMatch) {
			throw new Error("Email/password incorrect");
		}

		const token = sign(
			{
				email: user.email,
			},
			"1fe328c8eb302ad81d88060f5de50183",
			{
				subject: user.id,
				expiresIn: "1d",
			}
		);

		return token;
	}
}
export { AuthenticateUserService };
