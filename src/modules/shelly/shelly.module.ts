import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShellyController } from './controllers/shelly.controller';
import { ShellyService } from './services/shelly.service';

@Module({
    imports: [HttpModule],
    controllers: [ShellyController],
    providers: [ShellyService],
    exports: [ShellyService],
})
export class ShellyModule { } 