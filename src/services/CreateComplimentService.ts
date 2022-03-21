import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
	user_sender: string;
	user_receiver: string;
	tag_id: string;
	message: string;
}

class CreateComplimentService {
	async execute({
		user_sender,
		user_receiver,
		tag_id,
		message,
	}: IComplimentRequest) {
		const complimentsRepositories = getCustomRepository(
			ComplimentsRepositories
		);

		const usersRepository = getCustomRepository(UsersRepositories);

		if (user_sender === user_receiver) {
			throw new Error("Correct User Receiver");
		}

		const userAlreadyExists = await usersRepository.findOne(user_receiver);

		if (!userAlreadyExists) {
			throw new Error("User Receiver doesn't exist");
		}

		const compliment = complimentsRepositories.createAndSave(
			user_sender,
			user_receiver,
			tag_id,
			message
		);

		return compliment;
	}
}

export { CreateComplimentService };
