import { User } from "../../../models/User";
import { IWebRequest } from "../../IWebRequest";

export class RankingWebRequest extends IWebRequest {
	user!: User;
	rankingtype?:
		| undefined
		| "all"
		| "airing"
		| "upcoming"
		| "tv"
		| "ova"
		| "movie"
		| "special"
		| "bypopularity"
		| "favorite";
	limit?: undefined | number;
	offset?: undefined | number;
}
