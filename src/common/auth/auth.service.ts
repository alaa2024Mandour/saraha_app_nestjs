import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { signIn_DTO } from "src/users/user.validationData";
@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService
    ) {}

    public async generateToken(payload : signIn_DTO){
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}