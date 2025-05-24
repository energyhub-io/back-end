import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ethers } from 'ethers';
import { ShellyService } from '../shelly/services/shelly.service';
import { ConfigService } from '@nestjs/config';
import { defaultAbi } from '../../../contract/abi';
@Injectable()
export class ContractService implements OnModuleInit, OnModuleDestroy {
    private contract: ethers.Contract;
    private provider: ethers.Provider;
    private logger = new Logger('ContractService');
    private pollInterval: NodeJS.Timeout;
    private lastKnownBalance: bigint = BigInt(0);

    constructor(
        private shellyService: ShellyService,
        private configService: ConfigService
    ) {
        this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/f1823c9b31334b239ccb9de7a74c5129');

        this.contract = new ethers.Contract(
            '0x60a863a9286fdd5a070865d620930084b04c8afb',
            defaultAbi,
            this.provider
        );
    }

    async onModuleInit() {
        // Start polling when service initializes
        this.startPolling();
    }

    onModuleDestroy() {
        // Clean up polling when service destroys
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }
    }

    private startPolling() {
        // Poll every 10 seconds
        this.pollInterval = setInterval(async () => {
            try {
                const balance = await this.contract.getContractTokenBalance();
                this.logger.debug(`Current contract balance: ${balance}`);

                // If balance changed, update device state
                if (balance !== this.lastKnownBalance) {
                    this.lastKnownBalance = balance;

                    // If balance > 0, turn on device
                    const shouldBeOn = balance > 0;
                    await this.updateDeviceState(shouldBeOn);
                }
            } catch (error) {
                this.logger.error('Failed to poll contract balance', error);
            }
        }, 10000); // 10 seconds
    }

    private async updateDeviceState(shouldBeOn: boolean) {
        try {
            // Get all devices and update their states
            const devices = await this.shellyService.getDevices();
            for (const device of devices) {
                await this.shellyService.setPlugState(device.id, shouldBeOn);
                this.logger.log(`Device ${device.id} state set to ${shouldBeOn}`);
            }
        } catch (error) {
            this.logger.error('Failed to update device state', error);
        }
    }

    // Public method to force check balance
    async checkBalance(address?: string): Promise<string> {
        if (address) {
            const balance = await this.contract.getContractTokenBalance(address);
            return balance.toString();
        } else {
            const balance = await this.contract.getContractTokenBalance();
            return balance.toString();
        }
    }
} 