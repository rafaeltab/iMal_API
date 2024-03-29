import { Fields } from "#helpers/BasicTypes";
import { User } from "#models/User";

import { IWebRequest } from "#webreq/IWebRequest";

export class MangaRankingWebRequest extends IWebRequest {
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
	fields?: Fields;
}
