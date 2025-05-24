import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { ShellyService } from '../shelly/services/shelly.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContractService {
    private contract: ethers.Contract;
    private provider: ethers.Provider;
    private logger = new Logger('ContractService');

    constructor(
        private shellyService: ShellyService,
        private configService: ConfigService
    ) {
        this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/f1823c9b31334b239ccb9de7a74c5129');

        this.contract = new ethers.Contract(
            '0x60a863a9286fdd5a070865d620930084b04c8afb',
            [
                "function getLastTransaction(address _user) external view returns (uint256 amount, uint256 timestamp)",
                "event DepositMade(address indexed user, uint256 amount, uint256 timestamp)"
            ],
            this.provider
        );

        this.listenToEvents();
    }

    private listenToEvents() {
        this.contract.on("DepositMade", async (user, amount, timestamp) => {
            this.logger.log(`New deposit from ${user}: ${amount} at ${timestamp}`);

            try {
                // Get the device ID from your mapping (you'll need to implement this)
                const deviceId = await this.getDeviceIdForUser(user);

                // Turn on the device
                await this.shellyService.setPlugState(deviceId, true);

                // Schedule turn off based on amount
                // You'll need to implement your scheduling logic
                const duration = this.calculateDuration(amount);
                setTimeout(async () => {
                    await this.shellyService.setPlugState(deviceId, false);
                }, duration * 1000);

            } catch (error) {
                this.logger.error('Failed to handle deposit', error);
            }
        });
    }

    public calculateDuration(amount: bigint): number {
        // Implement your duration calculation based on amount
        // Return duration in seconds
        return Number(amount) / 1e6 * 3600; // Example: 1 USDC = 1 hour
    }

    private async getDeviceIdForUser(userAddress: string): Promise<string> {
        // Implement your mapping logic
        // This could be stored in your database
        return "device-id";
    }

    async getLastTransaction(address: string): Promise<[bigint, bigint]> {
        try {
            const [amount, timestamp] = await this.contract.getLastTransaction(address);
            return [amount, timestamp];
        } catch (error) {
            this.logger.error(`Failed to get transaction for ${address}`, error);
            throw error;
        }
    }
} 