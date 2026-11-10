import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: {
    ltaKeyConfigured: boolean;
    nodeEnv: string;
  };
}

/**
 * Health check endpoint: /api/health
 * Verifies server status and checks if the LTA DataMall AccountKey is configured.
 */
export default async function handler(req: Request, res: Response) {
  const ltaKey = 
    process.env.LTA_ACCOUNT_KEY || 
    process.env.ACCOUNT_KEY || 
    process.env.LTA_DATAMALL_KEY;

  const healthData: HealthResponse = {
    status: 'ok',
    service: 'ParkSG LTA Carpark Tracker API',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: {
      ltaKeyConfigured: Boolean(ltaKey && ltaKey.trim().length > 0),
      nodeEnv: process.env.NODE_ENV || 'development',
    },
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res.status(200).json(healthData);
}
