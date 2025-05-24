import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IShellyDevice } from '../interfaces/shelly.interface';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        this.supabase = createClient(
            this.configService.get('supabase.url'),
            this.configService.get('supabase.key'),
        );
    }

    async getDevices(): Promise<IShellyDevice[]> {
        const { data, error } = await this.supabase
            .from('shelly_devices')
            .select('*');

        if (error) throw error;
        return data;
    }

    async getDevice(id: string): Promise<IShellyDevice> {
        const { data, error } = await this.supabase
            .from('shelly_devices')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async addDevice(device: IShellyDevice): Promise<IShellyDevice> {
        const { data, error } = await this.supabase
            .from('shelly_devices')
            .insert(device)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateDevice(id: string, device: Partial<IShellyDevice>): Promise<IShellyDevice> {
        const { data, error } = await this.supabase
            .from('shelly_devices')
            .update(device)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteDevice(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('shelly_devices')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
} 