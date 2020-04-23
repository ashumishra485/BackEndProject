import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class FileMergeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {

    const req = context.switchToHttp().getRequest();

    req.body = req.body || {};

    // console.log('BEFORE', JSON.stringify(req.body, null, 2));

    // if file provided
    if (req.file) {
      // set to the body
      _.set(req.body, req.file.fieldname, req.file);
    }

    // if multiple files provided
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach(file => {
        const path = file.fieldname;
        // if we already assigned the file
        // then user must have supplied multiple files
        // with the same name (e.g. "files") on input form
        // so we convert the field to array
        if (_.has(req.body, path + '.fieldname')) {
          _.set(req.body, path, [_.get(req.body, path), file])
        } else if (Array.isArray(_.get(req.body, path))) {
          _.get(req.body, path).push(file);
        } else {
          _.set(req.body, path, file);
        }
      });
    }

    // console.log('AFTER', JSON.stringify(req.body, null, 2));

    return call$;
  }
}
