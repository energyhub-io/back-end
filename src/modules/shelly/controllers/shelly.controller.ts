import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShellyService } from '../services/shelly.service';
import { ShellyDeviceDto, SwitchStateDto, SwitchStatusDto } from '../dto/shelly.dto';

@ApiTags('shelly')
@Controller('shelly')
export class ShellyController {
    constructor(private readonly shellyService: ShellyService) { }

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
} 