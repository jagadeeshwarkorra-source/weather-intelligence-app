# Weather Intelligence App

A modern weather dashboard built with React, Vite, and Tailwind CSS using Open-Meteo APIs.

## Architecture & Data Flow
1. **Geocoding:** `https://geocoding-api.open-meteo.com/v1/search`
2. **Forecast & Current Weather:** `https://api.open-meteo.com/v1/forecast`

## Deployment & Build Pipeline
1. Application generated using **Google AI Studio App Build**.
2. Source code directly synced to **GitHub**.
3. Deployed to **Cloudflare Pages** via automatic Git integration.

### Cloudflare Pages Settings
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** Default
