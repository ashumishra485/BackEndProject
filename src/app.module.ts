import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { Configuration } from 'shared/configuration/configuration.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';


import * as settings from "./../config/default";
const mongoObj = { useCreateIndex: true, useNewUrlParser: true };

@Module({
  imports: [SharedModule, MongooseModule.forRoot(settings.default.MONGO_URI, mongoObj), 
    UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  static host: string;
  static port: number|string;
  static isDev: boolean;

  constructor( private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if(isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber
  }
}
