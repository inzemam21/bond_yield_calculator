# Bond Yield Calculator

A full-stack financial application that computes bond yield metrics and generates cash-flow schedules.

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React + Vite + TypeScript |
| Backend  | NestJS + TypeScript     |
| Package  | npm                     |

## Project Structure

```
bond_yield_calculator/
├── client/          # React + Vite frontend (port 5173)
├── server/          # NestJS backend       (port 3000)
└── README.md
```

## Getting Started

### Frontend

```bash
cd client
npm install
npm run dev          # → http://localhost:5173
```

### Backend

```bash
cd server
npm install
npm run start:dev    # → http://localhost:3000
```

## Planned Features

- Current Yield calculation
- Yield to Maturity (YTM) calculation
- Total Interest computation
- Premium / Discount classification
- Cash-flow schedule generation
