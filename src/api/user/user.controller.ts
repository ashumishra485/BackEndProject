import { Controller, Post, HttpStatus, HttpException, Body, Param, Put, Get, Req, Delete } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserVm } from './models/view-models/user-vm.model';
import { RegisterVm } from './models/view-models/register-vm-model';
import { ApiException } from 'shared/api-execption.model';
import { GetOperationId } from 'shared/util/get-operation-id';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserVmRef } from './models/view-models/user-vm-ref.model';
import { TokenVm } from './models/token-vm.model';
import { LoginVm } from './models/login-vm.model';
import { isArray } from 'util';

@Controller('user')
@ApiUseTags(User.modelName)
export class UserController {
    constructor(
        private readonly _userService: UserService) { }

  
    @Post('addContact')
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async registerContact(@Body() register: RegisterVm): Promise<any> {

        const newUser = await this._userService.addContact(register);

        return this._userService.map<UserVm>(newUser);
    }



    @Put('editContactList/:id')
    @ApiOkResponse({ description: 'Edit Calendar', type: UserVm })
    @ApiBadRequestResponse({ description: 'Could Not Update the Project', type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Update'))
    async updateAnnualOutgoing(@Body() contact: any[], @Param('id') id: any): Promise<RegisterVm> {

        console.log('contact in api', contact);
        console.log('id', id);

        const contactExists = await this._userService.findById(id);

        if (!contactExists) {
            throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
        }

        if (!contact) {
            throw new HttpException('No data submitted', HttpStatus.BAD_REQUEST);
        }

        try {
            // tslint:disable: no-string-literal
            contactExists.firstName = contact['firstName'];
            contactExists.lastName = contact['lastName'];
            contactExists.email = contact['email'];
            contactExists.phone = contact['phone'];
            contactExists.phonetype = contact['phonetype'];
            contactExists.address = contact['address'];

            const update = await this._userService.update(id, contactExists);
            return this._userService.map<RegisterVm>(update.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Delete(':id')
    @ApiOkResponse({ description: 'Delete Upload', type: UserVm })
    @ApiBadRequestResponse({ description: 'Could Not Delete the Upload', type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Delete'))
    async delete(@Param('id') id: string): Promise<RegisterVm> {
        try {
            const deleted = await this._userService.delete(id);
            if (deleted === null) {
                throw new HttpException('Element does not exist', HttpStatus.BAD_REQUEST);
            } else {
                return this._userService.map<User>(deleted.toJSON());
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }



    @Get('getAllcontact')
    @ApiOkResponse({ description: 'Get User(s)', isArray: true })
    @ApiBadRequestResponse({ description: 'Could Not Get User(s)', type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'GetALL'))
    async getAllContact(): Promise<RegisterVm[]> {

        let filter = {};
        try {
            let users = [];
            users = await this._userService.findAll(filter);
            return users;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getSelectedContact/:id')
    @ApiOkResponse({ description: 'Get Upload(s)', isArray: true })
    @ApiBadRequestResponse({ description: 'Could Not Get Upload(s)', type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'GetALL'))
    async getSavingGoal(@Param('id') id: any): Promise<RegisterVm> {
        try {
            let contact = await this._userService.findById(id);
            return contact;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
