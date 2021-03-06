import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";
import * as Options from "./AnimeSearchControllerOptions";
import State from "../../../decorators/StateDecorator";
import * as Param from "../../../decorators/ParamDecorator";
import LogArg from "../../../decorators/LogArgDecorator";
import RequestHandlerDecorator from "../../../decorators/RequestHandlerDecorator";
import { injectable } from "tsyringe";
import { AnimeSearchWebRequestHandler } from "../../../webRequest/Anime/Search/AnimeSearchWebRequestHandler";
import { extractFields, Fields } from "../../../helpers/BasicTypes";

@Controller(Options.ControllerPath)
@injectable()
export class AnimeSearchController {
	constructor(private _searchWebRequest: AnimeSearchWebRequestHandler) {}

	@Get(Options.ControllerName)
	@RequestHandlerDecorator()
	@State()
	@Param.Param("query", Param.ParamType.string, false)
	@Param.Param("limit", Param.ParamType.int, true)
	@Param.Param("offset", Param.ParamType.int, true)
	@Param.Param("fields", Param.ParamType.string, true)
	@LogArg()
	private async get(req: Request, res: Response, arg: Options.params) {
		if (arg.limit && arg.limit > 100) {
			arg.limit = 100;
		}

		var fields: Fields | undefined = undefined;
		if (arg.fields !== undefined) {
			// console.log(fields);
			fields = extractFields(arg.fields).fields;
			// console.log(fields);
		}

		var result = await this._searchWebRequest.handle({
			user: arg.user,
			query: arg.query,
			limit: arg.limit,
			offset: arg.offset,
			fields: fields,
		});

		return result.search;
	}
}
