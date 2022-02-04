import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailConfirmationPayloadDto } from '../authentication/dto/email-confirmation-payload.dto';
import { EmailPayload } from '../authentication/dto/confirmation-mail-token.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}
  async mailConfirmation(
    payload: EmailConfirmationPayloadDto,
    email: string,
  ): Promise<void> {
    const tokenPayload: EmailPayload = { email };
    const link = `${
      process.env.EMAIL_CONFIRMATION_URL
    }?token=${this.jwtService.sign(tokenPayload)}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      template: 'mail-confirmation.hbs',
      context: { ...payload, link },
    });
  }
}
