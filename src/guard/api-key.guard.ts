import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate{
    private readonly apikey = process.env.API_KEY;

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const apiKey = request.headers['x-api-key']

        if(apiKey && apiKey === this.apikey){
            return true 
        }
        throw new UnauthorizedException('Api key not valid')
    }
}