import express, { Request, Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import type { DemoRequest, DemoRequestResponse } from '../../shared/types';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// CORS_ORIGIN may be a single origin or a comma-separated list.
// In dev we default to the Vite dev server. In prod, Render injects
// the deployed frontend URL via render.yaml.
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({ origin: corsOrigins }));
app.use(express.json());

// In-memory store. Swap for Postgres in the next milestone.
const demoRequests: Array<DemoRequest & { id: string; createdAt: string }> = [];

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'mealledger-api', time: new Date().toISOString() });
});

app.post('/api/demo-requests', (req: Request, res: Response<DemoRequestResponse>) => {
  const body = req.body as Partial<DemoRequest>;

  // Minimal validation — replace with zod in the auth milestone.
  if (!body.fullName || !body.email || !body.organization) {
    return res.status(400).json({
      ok: false,
      error: 'fullName, email, and organization are required.',
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email.' });
  }

  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    fullName: body.fullName,
    email: body.email,
    organization: body.organization,
    siteCount: Number(body.siteCount) || 1,
    message: body.message || '',
  };
  demoRequests.push(record);
  console.log('[demo-request]', record);

  res.json({ ok: true, id: record.id });
});

// Admin peek (do not expose in production).
app.get('/api/demo-requests', (_req: Request, res: Response) => {
  res.json({ ok: true, count: demoRequests.length, items: demoRequests });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MealLedger API listening on port ${PORT}`);
  console.log(`Allowed CORS origins: ${corsOrigins.join(', ')}`);
});
