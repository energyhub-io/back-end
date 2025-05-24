import { ApiProperty } from '@nestjs/swagger';

export class ShellyDeviceDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty({ enum: ['PLUG', 'OTHER'] })
    type: 'PLUG' | 'OTHER';
}

export class SwitchStateDto {
    @ApiProperty()
    state: boolean;
}

export class SwitchStatusDto {
    @ApiProperty()
    output: boolean;

    @ApiProperty()
    power: number;

    @ApiProperty()
    overpower: boolean;

    @ApiProperty()
    temperature: number;
} 