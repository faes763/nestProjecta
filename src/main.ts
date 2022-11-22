import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import {AppModule} from './app.module';

async function startApp() {
    console.log(process.env.PORT)
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.setGlobalPrefix('/api');
    app.listen(PORT, ()=>{console.log('Server listening on port: ' + PORT)});
}
startApp()