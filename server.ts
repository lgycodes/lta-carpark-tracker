import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import carparkAvailabilityHandler from './api/carparkavailability.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// API Routes
app.all('/api/health', (req, res) => healthHandler(req, res));
app.all('/api/carparkavailability', (req, res) => carparkAvailabilityHandler(req, res));

// Development vs Production Environment Setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[ParkSG] Development server running with Vite middleware');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('[ParkSG] Production server serving static assets from dist/');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ParkSG] Server active at http://0.0.0.0:${PORT}`);
    console.log(`[ParkSG] -> Health: http://0.0.0.0:${PORT}/api/health`);
    console.log(`[ParkSG] -> Carpark Availability: http://0.0.0.0:${PORT}/api/carparkavailability`);
  });
}

startServer();
