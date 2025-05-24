<p align="center">
  <h1 align="center">EnergyHub Backend</h1>
  <p align="center">Smart energy management platform for Shelly devices</p>
  <p align="center"><em>ETHBratislava 2025 Hackathon Project 🏆</em></p>
</p>

## Overview

EnergyHub is a decentralized energy management platform built during ETHBratislava 2025. It enables intelligent control and monitoring of Shelly smart plugs, bridging Web3 technology with real-world energy consumption management.

## Features

- 🔌 Complete Shelly device management
- 📊 Real-time power monitoring
- 🎮 Remote power state control
- 💾 Supabase persistence
- 📚 Swagger API documentation
- 🔒 CORS-enabled for frontend integration
- ⛓️ Web3 integration ready

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
```

## API Endpoints

- `GET /devices` - List all registered devices
- `POST /devices` - Register new device
- `GET /devices/:id/status` - Get device power/status
- `POST /devices/:id/toggle` - Toggle device on/off
- `DELETE /devices/:id` - Remove device

## Prerequisites

- Node.js (v16+)
- pnpm
- Supabase account
- Shelly devices on local network

## Development

```bash
# Run tests
pnpm run test
pnpm run test:e2e

# Build
pnpm run build
```

## Tech Stack

- NestJS backend framework
- Supabase for data persistence
- Shelly Device API integration
- Web3 ready architecture

## Hackathon

This project was developed during ETHBratislava 2025 hackathon. Our goal was to create a decentralized solution for home energy management that bridges traditional IoT devices with blockchain technology.

## Team

Built with 💚 by the EnergyHub team at ETHBratislava 2025.

## License

[MIT](LICENSE)

## Support

For issues and feature requests, please use our [GitHub issues](https://github.com/energyhub/back-end/issues).
