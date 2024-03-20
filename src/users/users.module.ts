import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserInstall } from '../entities/user-install.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([UserInstall]), 
  HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
