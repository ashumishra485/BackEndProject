import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { RegisterVm } from './models/view-models/register-vm-model';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { JwtPayload } from 'shared/auth/jwt-payload';
import { UserVm } from './models/view-models/user-vm.model';
import { AuthService } from 'shared/auth/auth.service';
import { UserRole } from './models/user-role.enum';
import { isArray } from 'util';
import { LoginVm } from './models/login-vm.model';
import { ConfigurationService } from 'shared/configuration/configuration.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService)) readonly _authService: AuthService,
        private readonly _configurationService: ConfigurationService,
    ) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }

    // async register(registerVm: RegisterVm): Promise<User> {
    //     const { firstName, lastName, email, password, firebaseToken, } = registerVm;

    //     const newUser = new this._model();
    //     newUser.email = email;
    //     newUser.firstName = firstName;
    //     newUser.lastName = lastName;
    //     newUser.role = UserRole.User;


    //     const payload: JwtPayload = {
    //         email: email,
    //         role: UserRole.User
    //     };

    //     const token = await this._authService.signPayload(payload);
    //     newUser.token = token;


    //     let filter = {};
    //     filter['user'] = { $in: isArray(newUser._id) ? [...newUser._id] : [newUser._id] };

    //     try {
    //         const result = await this.create(newUser);
    //         return result.toJSON() as User;
    //     } catch (e) {
    //         throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // };

    // async login(loginVm: LoginVm): Promise<LoginResponseVm> {
    //     const { email, password, firebaseToken } = loginVm;

    //     const user = await this.findOne({ email });

    //     var today = new Date();
    //     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     var dateTime = date + ' ' + time;

    //     if (!user) {
    //         console.log('Error: wrong user. ' + email + ' - ' + dateTime);
    //         throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    //     }

    //     const isMatch = await compare(password, password);
    //     if (!isMatch) {
    //         console.log('Error: wrong password. ' + email + ' ' + password + ' - ' + dateTime);
    //         throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    //     }

    //     const payload: JwtPayload = {
    //         email: user.email,
    //         role: user.role
    //     };

    //     let filter = {};
    //     filter['user'] = { $in: isArray(user._id) ? [...user._id] : [user._id] };


    //     const token = await this._authService.signPayload(payload);
    //     user.token = token;



    //     await this.update(user._id, user);
    //     const userVm: UserVm = await this.map<UserVm>(user.toJSON());

    //     var today = new Date();
    //     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     var dateTime = date + ' ' + time;

    //     console.log(email + ' has been logged - ' + dateTime);

    //     return {
    //         token,
    //         user: userVm
    //     }
    // }


    async addContact(params: RegisterVm): Promise<any> {

        console.log('params in function', params);

        const {
            firstName, lastName, email, address, phone, phonetype
        } = params;

        const newExpenses = new this._model();

        newExpenses.firstName = firstName;
        newExpenses.lastName = lastName;
        newExpenses.email = email;
        newExpenses.address = address;
        newExpenses.phone = phone;
        newExpenses.phonetype = phonetype;

        try {
            const result = await this.create(newExpenses);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}