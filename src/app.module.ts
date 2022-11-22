import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { RegistrationModule } from './auth/registration/registration.module';




console.log(process.env.PORT)

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        RegistrationModule,
        
    ],
    controllers: [],  
    providers: []

})
export class AppModule {}