import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { UserDto } from '../dto/create-user.dto'

@Controller('auth')
export class RegistrationController {
    constructor(private registerService: RegistrationService) {}

    @Post('register')
    registration(@Body() UserDto: UserDto) {
        return this.registerService.registration(UserDto);
    }

    @Post('login')
    login(@Body() UserDto: UserDto) {
        return this.registerService.login(UserDto);
    }

    @Get('users') 
    getAll() {
        return this.registerService.getAll();
    } 
    
    @Get('user/:id')
    getOne(@Param('id') id: string) {
        return this.registerService.getOne(id);
    }
}
