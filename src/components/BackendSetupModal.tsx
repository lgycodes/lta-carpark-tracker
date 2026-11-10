import React, { useState } from 'react';
import { ApiBackendConfig } from '../types/carpark';
import { SAMPLE_EXPRESS_BACKEND_CODE, DEFAULT_API_CONFIG } from '../config/apiConfig';
import { X, Server, Check, Copy, AlertCircle, RefreshCw, Code2, Link2, ExternalLink } from 'lucide-react';

interface BackendSetupModalProps {
  config: ApiBackendConfig;
  onSaveConfig: (newConfig: Partial<ApiBackendConfig>) => void;
  onClose: () => void;
  onTestConnection: (url: string) => Promise<{ success: boolean; message: string }>;
}

export const BackendSetupModal: React.FC<BackendSetupModalProps> = ({
  config,
  onSaveConfig,
  onClose,
  onTestConnection,
}) => {
  const [mode, setMode] = useState<ApiBackendConfig['mode']>(config.mode);
  const [customUrl, setCustomUrl] = useState<string>(config.customEndpointUrl);
  const [apiKey, setApiKey] = useState<string>(config.apiKey || '');
  const [refreshInterval, setRefreshInterval] = useState<number>(config.autoRefreshIntervalSeconds);
  const [activeTab, setActiveTab] = useState<'settings' | 'snippet' | 'schema'>('settings');

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const urlToTest = mode === 'custom_backend' ? customUrl : DEFAULT_API_CONFIG.DATA_GOV_SG_URL;
      const res = await onTestConnection(urlToTest);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Connection failed' });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    onSaveConfig({
      mode,
      customEndpointUrl: customUrl,
      apiKey: apiKey.trim() || undefined,
      autoRefreshIntervalSeconds: refreshInterval,
    });
    onClose();
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const SAMPLE_FASTAPI_CODE = `
# main.py (FastAPI / Python Backend)
from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI(title="ParkSG Backend API")

@app.get("/api/carparks/availability")
async def get_carpark_availability():
    url = "https://api.data.gov.sg/v1/transport/carpark-availability"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        raise HTTPException(status_code=502, detail="Failed to fetch Data.gov.sg")
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Backend Connection & API Setup</h2>
              <p className="text-xs text-slate-500">
                Configure your future backend server or live Singapore government open data stream.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50/50 text-xs">
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-colors ${
              activeTab === 'settings' 
                ? 'border-emerald-600 text-slate-900 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Connection Settings
          </button>
          <button
            onClick={() => setActiveTab('snippet')}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-colors ${
              activeTab === 'snippet' 
                ? 'border-emerald-600 text-slate-900 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sample Backend Code (Node/Python)
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-colors ${
              activeTab === 'schema' 
                ? 'border-emerald-600 text-slate-900 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            JSON Schema Reference
          </button>
        </div>

        {/* Tab 1: Settings */}
        {activeTab === 'settings' && (
          <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
            {/* Mode Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Data Source & Backend Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setMode('simulated')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    mode === 'simulated'
                      ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Simulated Stream</span>
                    {mode === 'simulated' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Organic lot fluctuations across 30+ Singapore carparks. Ideal for offline/testing.
                  </p>
                </div>

                <div
                  onClick={() => setMode('datagov')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    mode === 'datagov'
                      ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Data.gov.sg Direct</span>
                    {mode === 'datagov' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Fetches real-time lot counts directly from Singapore Government Open Data API.
                  </p>
                </div>

                <div
                  onClick={() => setMode('custom_backend')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    mode === 'custom_backend'
                      ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Custom Backend</span>
                    {mode === 'custom_backend' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Connects to your custom API endpoint (e.g. Express, FastAPI, or Go proxy).
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Endpoint Inputs (if custom backend selected) */}
            {mode === 'custom_backend' && (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Backend Endpoint URL
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400">Presets:</span>
                      <button
                        type="button"
                        onClick={() => setCustomUrl('/api/carparkavailability')}
                        className="text-[10px] text-emerald-700 hover:underline font-mono bg-emerald-50 px-1.5 py-0.5 rounded"
                      >
                        /api/carparkavailability
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomUrl('/api/health')}
                        className="text-[10px] text-slate-600 hover:underline font-mono bg-slate-100 px-1.5 py-0.5 rounded"
                      >
                        /api/health
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="/api/carparkavailability"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleTest}
                      disabled={testing || !customUrl}
                      className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                      <span>Test Endpoint</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Optional Authorization Header / API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Bearer token or API key"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Passed as Bearer authorization header to your backend server.
                  </span>
                </div>
              </div>
            )}

            {/* Test Connection Result */}
            {testResult && (
              <div
                className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {testResult.success ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}

            {/* Auto Refresh Configuration */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Auto-Sync Interval
              </label>
              <div className="flex items-center gap-2">
                {[0, 15, 30, 60].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setRefreshInterval(sec)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      refreshInterval === sec
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {sec === 0 ? 'Manual Only' : `Every ${sec}s`}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Automatically syncs fresh lot counts in the background without reloading the page.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Backend Code Snippet */}
        {activeTab === 'snippet' && (
          <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Node.js / Express Proxy Route:</span>
              <button
                onClick={() => copyCode(SAMPLE_EXPRESS_BACKEND_CODE)}
                className="flex items-center gap-1 text-emerald-700 font-medium hover:underline"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy Express Code'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed">
              {SAMPLE_EXPRESS_BACKEND_CODE}
            </pre>

            <div className="flex items-center justify-between pt-3">
              <span className="font-semibold text-slate-700">Python / FastAPI Proxy Route:</span>
              <button
                onClick={() => copyCode(SAMPLE_FASTAPI_CODE)}
                className="flex items-center gap-1 text-emerald-700 font-medium hover:underline"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy Python Code'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed">
              {SAMPLE_FASTAPI_CODE}
            </pre>
          </div>
        )}

        {/* Tab 3: Schema */}
        {activeTab === 'schema' && (
          <div className="p-6 space-y-3 max-h-[65vh] overflow-y-auto text-xs">
            <p className="text-slate-600 leading-relaxed">
              The frontend is designed to consume either Singapore <strong>Data.gov.sg standard Carpark Availability JSON</strong> or the full <strong>ParkSG Carpark Object Schema</strong>:
            </p>
            <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed">
{`// Expected Data.gov.sg format:
{
  "items": [
    {
      "timestamp": "2026-11-09T19:30:00+08:00",
      "carpark_data": [
        {
          "carpark_number": "ACB",
          "update_datetime": "2026-11-09T19:28:14",
          "carpark_info": [
            { "lot_type": "C", "total_lots": "340", "lots_available": "42" },
            { "lot_type": "Y", "total_lots": "50", "lots_available": "12" }
          ]
        }
      ]
    }
  ]
}`}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Current mode: <strong className="text-slate-800 capitalize">{mode.replace('_', ' ')}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
