import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ShellyController } from './controllers/shelly.controller';
import { ShellyService } from './services/shelly.service';
import { SupabaseService } from './services/supabase.service';
import { supabaseConfig } from '../../config/supabase.config';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forFeature(supabaseConfig),
    ],
    controllers: [ShellyController],
    providers: [ShellyService, SupabaseService],
    exports: [ShellyService],
})
export class ShellyModule { } 