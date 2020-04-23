import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';

@Injectable()
export class MapperService {

    mapper: AutoMapperJs.AutoMapper;

    constructor() {
        this.mapper = automapper;
        this.initializeMapper();
    }

    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure)
    }

    private static configure(config: AutoMapperJs.IConfiguration): void {
        config.createMap('User', 'UserVm').forSourceMember('_id', opts => opts.ignore())
            .forSourceMember('password', opts => opts.ignore());

        //
        // Not needed for this project use as example
        // 
        config.createMap('Todo', 'TodoVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Todo[]', 'TodoVm[]').forSourceMember('_id', opts => opts.ignore());

        config.createMap('Project', 'ProjectVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Project[]', 'ProjectVm[]').forSourceMember('_id', opts => opts.ignore());

        config.createMap('Upload', 'UploadVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Upload[]', 'UploadVm[]').forSourceMember('_id', opts => opts.ignore());

        config.createMap('Models', 'ModelsVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Models[]', 'ModelsVm[]').forSourceMember('_id', opts => opts.ignore());

        config.createMap('Newsletter', 'NewsletterVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Newsletter[]', 'NewsletterVm[]').forSourceMember('_id', opts => opts.ignore());

        //
        // Use from here
        //
    
        config.createMap('Calendar', 'CalendarVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Calendar[]', 'CalendarVm[]').forSourceMember('_id', opts => opts.ignore());

        config.createMap('Multimedia', 'MultimediaVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Multimedia[]', 'MultimediaVm[]').forSourceMember('_id', opts => opts.ignore());

        config.createMap('Notifications', 'NotificationsVm').forSourceMember('_id', opts => opts.ignore());
        config.createMap('Notifications[]', 'NotificationsVm[]').forSourceMember('_id', opts => opts.ignore());
    }
}
