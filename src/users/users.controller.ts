import { Controller, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SaveUserDto } from '../dto/save-user.dto';
import { Request } from 'express';
import { SendEventDto } from 'src/dto/send-event.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly httpService: HttpService,
      private readonly configService: ConfigService
    ) {}

  @Post('save_user')
  async saveUser(@Body() saveUserDto: SaveUserDto, @Req() request: Request) {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'] || '';
    try {
      await this.usersService.saveUser({ ...saveUserDto, ip, userAgent });
      return { message: 'User saved successfully.' };
    } catch (error) {
      throw new HttpException('Failed to save user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('send_event')
  async sendEvent(@Body() sendEventDto: SendEventDto, @Req() request: Request) {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'] || '';
    const userData = await this.usersService.findUserByIpAndUserAgent(ip, userAgent);

    if (!userData) {
      return { message: 'User not found.' };
    }
    const payload = { ...userData, event_name: sendEventDto.event_name };
    const thirdPartyUrl = this.configService.get<string>('THIRD_PARTY_URL', 'https://default-url.com');

    try {
      const response = await this.httpService.post(thirdPartyUrl, payload).toPromise();
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send event to third-party');
    }
  }
}
