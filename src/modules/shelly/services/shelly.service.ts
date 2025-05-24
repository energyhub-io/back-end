import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IShellyDevice, ISwitchStatus } from '../interfaces/shelly.interface';
import { ShellyDeviceDto } from '../dto/shelly.dto';
import { firstValueFrom } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable()
export class ShellyService {
    constructor(
        private readonly httpService: HttpService,
        private readonly supabaseService: SupabaseService,
    ) { }

    async getStatus(deviceId: string): Promise<ISwitchStatus> {
        const device = await this.findDevice(deviceId);
        return this.makeRequest(device.address, 'Switch.GetStatus');
    }

    async setPlugState(deviceId: string, state: boolean): Promise<void> {
        const device = await this.findDevice(deviceId);
        await this.makeRequest(device.address, 'Switch.Set', { on: state });
    }

    async addDevice(device: ShellyDeviceDto): Promise<IShellyDevice> {
        return this.supabaseService.addDevice(device);
    }

    async getDevices(): Promise<IShellyDevice[]> {
        return this.supabaseService.getDevices();
    }

    async deleteDevice(id: string): Promise<void> {
        return this.supabaseService.deleteDevice(id);
    }

    private async findDevice(id: string): Promise<IShellyDevice> {
        try {
            return await this.supabaseService.getDevice(id);
        } catch (error) {
            throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
        }
    }

    private async makeRequest(address: string, method: string, params: any = { id: 0 }): Promise<any> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(`http://${address}/rpc`, {
                    id: 0,
                    method,
                    params,
                })
            );
            return data.result;
        } catch (error) {
            throw new HttpException(
                `Failed to execute ${method}`,
                HttpStatus.BAD_GATEWAY
            );
        }
    }
}