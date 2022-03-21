import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
	async execute(name: string) {
		const tagsRepositories = getCustomRepository(TagsRepositories); // or connection.getCustomRepository or manager.getCustomRepository()

		if (!name) {
			throw new Error("Tag name is missing");
		}

		const tagAlreadyExists = await tagsRepositories.findOne({ name });

		if (tagAlreadyExists) {
			throw new Error("Tag already exists");
		}

		const tag = tagsRepositories.createAndSave(name); // same as const user = new User();

		return tag;
	}
}

export { CreateTagService };
