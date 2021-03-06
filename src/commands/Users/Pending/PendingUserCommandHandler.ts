import { autoInjectable } from "tsyringe";
import MissingStateError from "../../../errors/Authentication/MissingStateError";
import StateStatusError from "../../../errors/Authentication/StateStatusError";
import TokensNotPresentError from "../../../errors/Authentication/TokensNotPresentError";
import { Database } from "../../../helpers/Database";
import { Tokens } from "../../../models/Tokens";
import {
	UserStatus,
	UserStatusQueryHandler,
} from "../../../queries/Users/Status/UserStatusQueryHandler";
import { GetTokenWebRequestHandler } from "../../../webRequest/Auth/GetToken/GetTokenWebRequestHandler";
import { ICommandHandler, ICommandResultStatus } from "../../ICommand";
import { PendingUserCommand } from "./PendingUserCommand";
import { PendingUserCommandResult } from "./PendingUserCommandResult";

@autoInjectable()
export class PendingUserCommandHandler
	implements ICommandHandler<PendingUserCommand, PendingUserCommandResult> {
	constructor(
		private _getTokenWebRequest: GetTokenWebRequestHandler,
		private _database: Database,
		private _getUserStatus: UserStatusQueryHandler
	) {}

	async handle(command: PendingUserCommand): Promise<PendingUserCommandResult> {
		//check if the uuid exists in the dict

		var db = this._database;
		var Models = db.Models;
		var usr = Models.user;

		var user = await usr.findOne({
			where: { id: command.uuid },
			include: Tokens,
		});

		if (!user) throw new MissingStateError("uuid does not exist yet");

		var status = (await this._getUserStatus.handle({ user: user })).status;

		//get the dict entry and check if the state is pending
		if (status != UserStatus.authing)
			throw new StateStatusError("uuid is not pending");

		var userTokens: Tokens = user.tokens as Tokens;

		var tokenModel = await this._database.Models.tokens.findOne({
			where: {
				id: user.tokensId,
			},
		});
		if (!tokenModel)
			throw new TokensNotPresentError("No tokens for pending user");

		//get the tokens from MAL
		let tokens = await this._getTokenWebRequest.handle({
			code: command.code,
			ourdomain: command.ourdomain,
			verifier: userTokens.verifier as string,
		});

		await tokenModel.update({
			token: tokens.access_token,
			refreshtoken: tokens.refresh_token,
			verifier: null,
			redirect: null,
		});

		if (userTokens.redirect) {
			return {
				url: `${userTokens.redirect}${command.uuid}`,
				success: ICommandResultStatus.SUCCESS,
			};
		}
		return {
			url: `imal://auth/${command.uuid}`,
			success: ICommandResultStatus.SUCCESS,
		};
	}
}
