import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}
export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	//receive token

	const AuthToken = request.headers.authorization;

	//validate if token is with values
	if (!AuthToken) {
		return response.status(401).json({ error: "Token missing" });
	}
	//validate if token is valid
	const [, token] = AuthToken.split(" ");

	try {
		const { sub } = verify(
			token,
			"1fe328c8eb302ad81d88060f5de50183"
		) as IPayload;

		request.user_id = sub;

		return next();
	} catch (error) {
		return response.status(401).json({ error: "Token invalid" });
	}
}
