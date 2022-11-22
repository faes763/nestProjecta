import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { User, UserSchema } from './schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
    }]),
    JwtModule.register({
        privateKey: process.env.PRIVATE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNpZWxmZmZXYW9ybGQiLCJpYXQiOjE2NjkxMjA2Njl9.WBlMv6g483VKuDBMBm1kfhRnnL42PsIIxO1l-FaPmcI'
    })
],
    controllers: [RegistrationController],
    providers: [RegistrationService],
})
export class RegistrationModule {}
