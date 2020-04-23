import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class TokenVm {
    @ApiModelProperty({ required: true, minLength: 6 }) email: string;
    @ApiModelProperty({ required: true }) token: string;
}