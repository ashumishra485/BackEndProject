import { UserRole } from "./../../api/user/models/user-role.enum";
export interface JwtPayload {
    email: string;
    role: UserRole;
    iat?: Date;
}