import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { LoginVm } from "../login-vm.model";

export class RegisterVm {
    @ApiModelPropertyOptional({ example: 'John' }) firstName?: string;
    @ApiModelPropertyOptional({ example: 'Doe' }) lastName?: string;
    @ApiModelPropertyOptional() email: string;
    @ApiModelPropertyOptional() fullName?: string;
    @ApiModelPropertyOptional() address?: string;
    @ApiModelPropertyOptional() phone?: string;
    @ApiModelPropertyOptional() phonetype?: string;

}