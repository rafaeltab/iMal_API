import { Manga } from "../../../helpers/BasicTypes";
import { IWebRequestResult } from "../../IWebRequest";

export class MangaDetailsWebRequestResult extends IWebRequestResult {
	manga!: Manga;
}
