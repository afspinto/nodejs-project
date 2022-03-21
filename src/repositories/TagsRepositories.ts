import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

@EntityRepository(Tag)
export class TagsRepositories extends Repository<Tag> {
	createAndSave(name: string) {
		const tag = new Tag();
		tag.name = name;

		return this.manager.save(tag);
	}
}
