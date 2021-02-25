import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import * as Options from "./DetailsControllerOptions";
import State from "../../../decorators/StateDecorator";
import * as Param from "../../../decorators/ParamDecorator";
import { GetDetails } from '../../../MALWrapper/Anime/Details';
import { ERROR_STATUS } from '../../../helpers/GLOBALVARS';
import LogArg from '../../../decorators/LogArgDecorator';
import GeneralError from '../../../errors/GeneralError';
import RequestHandlerDecorator from '../../../decorators/RequestHandlerDecorator';

@Controller(Options.ControllerPath)
export class DetailsController {
    @Get(Options.ControllerName)
    @State()
    @Param.Param("animeid", Param.ParamType.int, false)
    //@LogArg()
    @RequestHandlerDecorator()
    private async get(req: Request, res: Response, arg: Options.params){
        arg.animeid = arg.animeid ? arg.animeid : 1;

        return await GetDetails( arg.state, arg.animeid);
    }
}