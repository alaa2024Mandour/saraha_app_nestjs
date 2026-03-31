import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import config from "config/config.service";
import crypto from "node:crypto"



@Injectable()
export class EncrypService{
    private ENCRYPTION_KEY: Buffer
    private IV_LENGTH: number

    constructor(private configService: ConfigService){
        const key = this.configService.get<string>('ENCRYPTION_KEY')

        this.ENCRYPTION_KEY = Buffer.from(key!)
        this.IV_LENGTH = this.configService.get<number>('IV_LENGTH')!
    }

public encrypt(text:string) {
    if(!text){
        throw new Error("encrypted value is required");
    }
    const iv = crypto.randomBytes(this.IV_LENGTH);

    const cipher = crypto.createCipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);  

    let encrypted = cipher.update(text, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}


public decrypt(text:string) {

    const [ivHex, encryptedText] = text.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');    

    const decipher = crypto.createDecipheriv('aes-256-cbc', this.ENCRYPTION_KEY , iv);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
}

}
