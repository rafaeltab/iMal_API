import { Fields } from "#helpers/BasicTypes";
import { User } from "#models/User";

import { IWebRequest } from "#webreq/IWebRequest";

export class AnimeSuggestionsWebRequest extends IWebRequest {
	user!: User;
	limit?: number | undefined;
	offset?: number | undefined;
	fields?: Fields;
}
