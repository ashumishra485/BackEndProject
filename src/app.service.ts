import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'shared/configuration/configuration.service';


@Injectable()
export class AppService {
  constructor(private readonly _configService: ConfigurationService){}

  root(): any {
    return {
      "Author": "Anshutosh Mishra",
      "Project": "Contact App",
      "Version": "1.0.1",
      "Ip": this._configService.get("HOST"),
      "Date": new Date()
    };
  }
}
