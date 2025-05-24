export interface IShellyDevice {
    id: string;
    name: string;
    address: string;
    type: 'PLUG' | 'OTHER';
}

export interface ISwitchStatus {
    output: boolean;
    power: number;
    overpower: boolean;
    temperature: number;
} 