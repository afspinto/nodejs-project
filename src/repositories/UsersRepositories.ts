import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
	findByEmailAndName(name: string, email: string) {
		return this.findOne({ name, email });
	}

	createAndSave(name: string, email: string, admin: Boolean, password: string) {
		const user = new User();
		user.name = name;
		user.email = email;
		user.admin = admin;
		user.password = password;
		return this.manager.save(user);
	}
}

export { UsersRepositories };
