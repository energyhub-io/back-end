<p align="center">
  <h1 align="center">EnergyHub Backend</h1>
  <p align="center">Decentralized energy sharing platform for community empowerment</p>
  <p align="center"><em>ETHBratislava 2025 Hackathon Project 🏆</em></p>
</p>

## Vision

EnergyHub is reimagining energy distribution through blockchain technology and smart devices. We're building a platform that enables:

- 🌱 **Local Green Energy Champions**: Empowering independent renewable energy producers to monetize surplus power
- 🤝 **Energy Philanthropy**: Creating transparent pathways for energy donations to those in need
- ♻️ **Waste Reduction**: Ensuring locally generated renewable energy finds its optimal use
- 🏘️ **Community Resilience**: Fostering P2P energy sharing and community support systems

## How It Works

Our platform connects Shelly smart plugs with blockchain technology to enable:

- Direct P2P energy transactions
- Transparent energy donations
- Real-time power monitoring
- Automated access control
- Community-driven energy distribution

## Technical Stack

- NestJS backend framework
- Supabase for data persistence
- Shelly Device API integration
- Smart Contract on Sepolia
- Web3 ready architecture

## Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm run start:dev

# Production
pnpm run start:prod
```

## Environment Setup

Create a `.env` file:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# Server
PORT=3000
CORS_ORIGIN=http://localhost:5173

# Web3
RPC_URL=your_ethereum_rpc_url
CONTRACT_ADDRESS=your_contract_address
```

## API Endpoints

- `GET /devices` - List registered devices
- `POST /devices` - Register new device
- `GET /devices/:id/status` - Get device power/status
- `PUT /devices/:id/state` - Control device state
- `GET /contract/balance` - Check contract balance
- `GET /contract/status/:address` - Check user status

## Prerequisites

- Node.js (v16+)
- pnpm
- Supabase account
- Shelly devices on local network
- Web3 wallet

## Social Impact

- **Democratizing Energy**: Making renewable energy accessible and profitable at grassroots level
- **Fighting Energy Poverty**: Enabling direct energy donations to those in need
- **Environmental Impact**: Reducing waste and maximizing renewable energy usage
- **Community Building**: Strengthening local ties through energy sharing

## Hackathon

This project was developed during ETHBratislava 2025 hackathon, aiming to demonstrate how blockchain technology can create more equitable and sustainable energy systems.

## Team

Built with 💚 by the EnergyHub team at ETHBratislava 2025.

## License

[MIT](LICENSE)

## Support

For issues and feature requests, please use our [GitHub issues](https://github.com/energyhub/back-end/issues).
