import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShellyService } from '../services/shelly.service';
import { ShellyDeviceDto, SwitchStateDto, SwitchStatusDto } from '../dto/shelly.dto';
import { ContractService } from '../../contract/contract.service';

@ApiTags('shelly')
@Controller('shelly')
export class ShellyController {
    constructor(
        private readonly shellyService: ShellyService,
        private readonly contractService: ContractService
    ) { }

    @Post('devices')
    @ApiOperation({ summary: 'Add a new Shelly device' })
    @ApiResponse({ status: 201, type: ShellyDeviceDto })
    addDevice(@Body() device: ShellyDeviceDto) {
        return this.shellyService.addDevice(device);
    }

    @Get('devices')
    @ApiOperation({ summary: 'Get all registered devices' })
    @ApiResponse({ status: 200, type: [ShellyDeviceDto] })
    getDevices() {
        return this.shellyService.getDevices();
    }

    @Get('devices/:id/status')
    @ApiOperation({ summary: 'Get device status' })
    @ApiResponse({ status: 200, type: SwitchStatusDto })
    getStatus(@Param('id') id: string) {
        return this.shellyService.getStatus(id);
    }

    @Put('devices/:id/state')
    @ApiOperation({ summary: 'Set device state' })
    @ApiResponse({ status: 200 })
    setState(
        @Param('id') id: string,
        @Body() { state }: SwitchStateDto,
    ) {
        return this.shellyService.setPlugState(id, state);
    }

    @Put('devices/:id')
    @ApiOperation({ summary: 'Set device state' })
    @ApiResponse({ status: 200 })
    updatePlugState(
        @Param('id') id: string,
        @Body() device: ShellyDeviceDto,
    ) {
        return this.shellyService.updatePlug(id, device);
    }

    @Delete('devices/:id')
    @ApiOperation({ summary: 'Delete a device' })
    @ApiResponse({ status: 200 })
    async deleteDevice(@Param('id') id: string) {
        return this.shellyService.deleteDevice(id);
    }

    @Get('contract/status/:address')
    @ApiOperation({ summary: 'Get contract status for address' })
    @ApiResponse({ status: 200 })
    async getContractStatus(@Param('address') address: string) {
        try {
            const [amount, timestamp] = await this.contractService.getLastTransaction(address);
            return {
                address,
                amount: amount.toString(),
                timestamp: Number(timestamp),
                isActive: Number(timestamp) + this.contractService.calculateDuration(amount) > Date.now() / 1000
            };
        } catch (error) {
            throw new HttpException('Failed to get contract status', HttpStatus.BAD_REQUEST);
        }
    }
} 