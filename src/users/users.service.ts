import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInstall } from '../entities/user-install.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserInstall)
    private userInstallRepository: Repository<UserInstall>,
  ) {}

  async saveUser(userInstallData: UserInstall): Promise<void> {
    const userInstall = this.userInstallRepository.create(userInstallData);
    await this.userInstallRepository.save(userInstall);
  }

  async findUserByIpAndUserAgent(ip: string, userAgent: string): Promise<UserInstall | undefined> {
    return this.userInstallRepository.findOne({ where: { ip, userAgent } });
  }
}
