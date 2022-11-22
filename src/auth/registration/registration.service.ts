import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcsrypt from 'bcryptjs';
import {JwtService} from '@nestjs/jwt'
import { Model } from 'mongoose';
import { UserDto } from '../dto/create-user.dto'
import { User, UserDoc } from './schema/user.schema';

@Injectable()
export class RegistrationService {

    constructor(@InjectModel(User.name) private UserModel: Model<UserDoc>, private jwtService: JwtService) {}

    async registration(UserDto: UserDto) {
        const user = new this.UserModel(UserDto);
        const {email, password} = UserDto;
        const candidate = await this.UserModel.findOne({email});
        if(candidate) throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);


        const hashPassword = await bcsrypt.hash(password, 6);
        user.password = hashPassword;
        user.save();
        return this.tokenGeneration(user);
    }

    

    async getAll() {
        return this.UserModel.find();
    }
    async getOne(id:string) {
        return this.UserModel.findById(id).exec();
    }




    async login(UserDto: UserDto) {
        const user = await this.validateUser(UserDto);
        return this.tokenGeneration(user)
    }


    private async tokenGeneration(UserDto: UserDto) {
        const payload = {email: UserDto.email};
        return {token: this.jwtService.sign(payload)}
    }
    private async validateUser(UserDto: UserDto) {
        const {email, password} = UserDto;
        const DB_user = await this.UserModel.findOne({email});
        if(!DB_user) return;
        const verification = await bcsrypt.compare(password, DB_user.password);
        console.log(verification, DB_user)
        if(DB_user && verification)  return DB_user;
        throw new UnauthorizedException({message: "Некорректный email или пароль"})
        // return new Error('what')
        // throw new Error("WHY");
    }
}
