'use strict';

const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');

const healthRouter   = require('./routes/health');
const synopsisRouter = require('./routes/synopsis');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Security & parsing ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '64kb' }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/health',   healthRouter);
app.use('/api/synopsis', synopsisRouter);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Global error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Précis API running on port ${PORT}`);
});
