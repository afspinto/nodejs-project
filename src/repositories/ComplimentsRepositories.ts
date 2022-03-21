import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository(Compliment)
export class ComplimentsRepositories extends Repository<Compliment> {
	createAndSave(
		user_sender: string,
		user_receiver: string,
		tag_id: string,
		message: string
	) {
		const compliment = new Compliment();
		compliment.user_sender = user_sender;
		compliment.user_receiver = user_receiver;
		compliment.tag_id = tag_id;
		compliment.message = message;
		return this.manager.save(compliment);
	}
}
