import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendEmail({toEmail,otpCode}:{toEmail:string,otpCode:number}) {
        await this.mailerService.sendMail({
            to: toEmail, 
            subject: 'Verification Code',
            template: 'welcome',
            context: {
                email: toEmail,
                otp: otpCode, 
            },
        });
    }
}