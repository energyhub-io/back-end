import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ShellyController } from './modules/shelly/controllers/shelly.controller';
import { ShellyService } from './modules/shelly/services/shelly.service';
import { ShellyModule } from './modules/shelly/shelly.module';
import { supabaseConfig } from './config/supabase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [supabaseConfig],
    }),
    ShellyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
