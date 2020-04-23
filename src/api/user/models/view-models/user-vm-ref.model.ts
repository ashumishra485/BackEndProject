import { BaseModelVm } from "shared/base.model";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../user-role.enum";
import { EnumToArray } from "shared/util/enum-to-array";
import { ToDoList } from "../user.model";

export class UserVmRef extends BaseModelVm {
   @ApiModelPropertyOptional() email: string;
   @ApiModelPropertyOptional() firstName?: string;
   @ApiModelPropertyOptional() lastName?: string;
   @ApiModelPropertyOptional() fullName?: string;
   @ApiModelPropertyOptional() address?: string;
   @ApiModelPropertyOptional() phone?: string;
   @ApiModelPropertyOptional() phonetype?: string;
   @ApiModelPropertyOptional() token?: string;
   @ApiModelPropertyOptional({enum: EnumToArray(UserRole)}) role?: UserRole; 
}

