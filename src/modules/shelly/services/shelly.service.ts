import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IShellyDevice, ISwitchStatus } from '../interfaces/shelly.interface';
import { ShellyDeviceDto } from '../dto/shelly.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ShellyService {
    private devices: IShellyDevice[] = [];

    constructor(private readonly httpService: HttpService) { }

    async getStatus(deviceId: string): Promise<ISwitchStatus> {
        const device = this.findDevice(deviceId);
        return this.makeRequest(device.address, 'Switch.GetStatus');
    }

    async setPlugState(deviceId: string, state: boolean): Promise<void> {
        const device = this.findDevice(deviceId);
        await this.makeRequest(device.address, 'Switch.Set', { on: state });
    }

    addDevice(device: ShellyDeviceDto): IShellyDevice {
        const newDevice = { ...device };
        this.devices.push(newDevice);
        return newDevice;
    }

    getDevices(): IShellyDevice[] {
        return this.devices;
    }

    private findDevice(id: string): IShellyDevice {
        const device = this.devices.find(d => d.id === id);
        if (!device) {
            throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
        }
        return device;
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