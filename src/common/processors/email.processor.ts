import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from '../email/email.service';

@Processor('mail-queue')
export class EMailProcessor extends WorkerHost {
    constructor(private emailService : EmailService){
        super();
    }
    async process(job: Job) {
        const { email, otp } = job.data;

        console.log(`جاري إرسال إيميل لـ ${email} يحتوي على الكود: ${otp}`);

        // هنا بنستخدم مكتبة زي Nodemailer أو أي Service تانية
        await this.emailService.sendEmail({toEmail:email,otpCode:otp});

        return { sent: true };
    }
}