import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './devices/devices.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({cache:true,
      isGlobal:true,
      load:[configuration],
      
    }),
    JwtModule.registerAsync({
    global: true,
    useFactory: (configuration) => ({
      secret: configuration.get('jwt.secret'),
      signOptions: { expiresIn: configuration.get('jwt.expireIn') },
    }),
    inject:[ConfigService]
  })
    ,AuthModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
