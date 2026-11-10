import type { Request, Response } from 'express';

const LTA_DATAMALL_URL = 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2';

export interface LtaCarparkItem {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string; // e.g. "1.2938 103.8572" (lat lng)
  AvailableLots: number;
  LotType: 'C' | 'H' | 'Y'; // C: Car, H: Heavy, Y: Motorcycle
  Agency: 'HDB' | 'LTA' | 'URA';
}

export interface LtaDataMallResponse {
  'odata.metadata'?: string;
  value: LtaCarparkItem[];
}

// In-memory short-lived cache (30-second TTL) to respect LTA API limits
let cachedData: LtaDataMallResponse | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 30 * 1000;

/**
 * Serverless handler: /api/carparkavailability
 * Pulls live carpark lots (HDB + LTA + URA) from LTA DataMall v2
 * Required Header for upstream: AccountKey: <Your_LTA_Key>
 */
export default async function handler(req: Request, res: Response) {
  // Allow CORS for local and deployment flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey, x-account-key, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Retrieve AccountKey from environment or optional request header
  const accountKey =
    (req.headers['accountkey'] as string) ||
    (req.headers['x-account-key'] as string) ||
    process.env.LTA_ACCOUNT_KEY ||
    process.env.ACCOUNT_KEY ||
    process.env.LTA_DATAMALL_KEY;

  if (!accountKey || accountKey.trim() === '') {
    return res.status(401).json({
      error: 'Missing LTA AccountKey',
      message: 'No LTA AccountKey configured. Please set the LTA_ACCOUNT_KEY environment variable or pass an "AccountKey" request header.',
      documentation: 'https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html',
      status: 'unauthorized',
      timestamp: new Date().toISOString(),
    });
  }

  const skip = typeof req.query.skip === 'string' ? req.query.skip : '0';
  const bypassCache = req.query.fresh === 'true';

  // Check cache for default queries
  const now = Date.now();
  if (!bypassCache && skip === '0' && cachedData && now - lastCacheTime < CACHE_TTL_MS) {
    res.setHeader('X-Cache-Status', 'HIT');
    res.setHeader('Cache-Control', 'public, max-age=30');
    return res.status(200).json(cachedData);
  }

  try {
    const targetUrl = new URL(LTA_DATAMALL_URL);
    if (skip && skip !== '0') {
      targetUrl.searchParams.set('$skip', skip);
    }

    const upstreamResponse = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'AccountKey': accountKey.trim(),
        'accept': 'application/json',
      },
    });

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text().catch(() => '');
      return res.status(upstreamResponse.status).json({
        error: `LTA DataMall error (${upstreamResponse.status})`,
        message: upstreamResponse.statusText,
        details: errorText,
        timestamp: new Date().toISOString(),
      });
    }

    const data: LtaDataMallResponse = await upstreamResponse.json();

    // Cache first page
    if (skip === '0') {
      cachedData = data;
      lastCacheTime = now;
    }

    res.setHeader('X-Cache-Status', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=30');
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching LTA DataMall carpark availability:', error);
    return res.status(502).json({
      error: 'Upstream gateway error',
      message: error?.message || 'Failed to connect to LTA DataMall service',
      timestamp: new Date().toISOString(),
    });
  }
}
