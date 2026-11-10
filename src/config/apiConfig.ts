/**
 * Singapore Carpark API Configuration & Backend Connection Specs
 * 
 * This file serves as the bridge for your backend integration.
 * The application can run in three modes:
 *  1. 'simulated': High-fidelity real-time simulation with realistic fluctuations (default)
 *  2. 'datagov': Direct client fetch from Singapore Data.gov.sg Public Carpark API
 *  3. 'custom_backend': Connects to your future custom backend server (e.g. Express, FastAPI, Go)
 */

export const DEFAULT_API_CONFIG = {
  // Official Singapore Government API endpoints
  DATA_GOV_SG_URL: 'https://api.data.gov.sg/v1/transport/carpark-availability',
  LTA_DATAMALL_URL: 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
  
  // Local serverless endpoints
  SERVERLESS_LTA_ENDPOINT: '/api/carparkavailability',
  SERVERLESS_HEALTH_ENDPOINT: '/api/health',
  
  // Storage keys for user custom preferences
  STORAGE_KEY_CONFIG: 'parksg_api_config',
  STORAGE_KEY_FAVORITES: 'parksg_favorites',
  
  // Default connection parameters
  DEFAULT_CUSTOM_ENDPOINT: '/api/carparkavailability',
  DEFAULT_REFRESH_SECONDS: 30,
};

export interface DataGovSgLotItem {
  carpark_info: Array<{
    total_lots: string;
    lot_type: string; // 'C' (Car), 'H' (Heavy), 'Y' (Motorcycle)
    lots_available: string;
  }>;
  carpark_number: string;
  update_datetime: string;
}

export interface DataGovSgResponse {
  items: Array<{
    timestamp: string;
    carpark_data: DataGovSgLotItem[];
  }>;
}

/**
 * Ready-to-copy Node.js / Express backend route snippet for the user:
 */
export const SAMPLE_EXPRESS_BACKEND_CODE = `
// server.js (or Express backend route)
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Proxy Singapore Data.gov.sg Carpark Availability
app.get('/api/carparks/availability', async (req, res) => {
  try {
    const response = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Data.gov.sg carpark lots', message: error.message });
  }
});

// 2. Proxy LTA DataMall v2 Carpark Availability (with AccountKey)
app.get('/api/carparks/lta', async (req, res) => {
  try {
    const ltaKey = process.env.LTA_DATAMALL_API_KEY;
    const response = await fetch('http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2', {
      headers: {
        'AccountKey': ltaKey || '',
        'accept': 'application/json'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LTA DataMall', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(\`ParkSG Backend Server running on port \${PORT}\`);
});
`;
