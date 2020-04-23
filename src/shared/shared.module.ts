import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { UserModule } from '../api/user/user.module';
import { UserController } from '../api/user/user.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';
import { BaseService } from './base.service';

@Global()
@Module({
  providers: [ConfigurationService, MapperService, AuthService, JwtStrategyService, BaseService],
  exports: [ConfigurationService, MapperService, AuthService, BaseService],
  imports: [UserModule],
  controllers: [UserController]
})
export class SharedModule {}
