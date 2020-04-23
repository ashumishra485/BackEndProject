import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "./../../api/user/models/user-role.enum";
import { User } from "./../../api/user/models/user.model";
import { InstanceType } from "typegoose";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<UserRole[]>('roles', context.getHandler());

        if(!roles || roles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: InstanceType<User> = request.user;

        const hasRole = () => roles.indexOf(user.role) >= 0;
        
        if(User && user.role && hasRole()) {
            return true;
        }

        throw new HttpException('You do not have permission (Roles)', HttpStatus.UNAUTHORIZED);

    }
}