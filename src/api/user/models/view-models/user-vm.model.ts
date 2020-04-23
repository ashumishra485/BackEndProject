import { BaseModelVm } from "shared/base.model";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../user-role.enum";
import { EnumToArray } from "shared/util/enum-to-array";
import { ToDoList } from "../user.model";

export class UserVm extends BaseModelVm {
   @ApiModelProperty() email: string;
   @ApiModelPropertyOptional() firstName?: string;
   @ApiModelPropertyOptional() lastName?: string;
   @ApiModelPropertyOptional() fullName?: string;
   @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) }) role?: UserRole;

}