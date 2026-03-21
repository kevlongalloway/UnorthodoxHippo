'use strict';

/**
 * POST /api/synopsis
 *
 * Generates a book synopsis through a chosen reading lens using Claude.
 *
 * Body:
 *   { bookTitle, author, lens, format, position }
 *
 * Lens values: analyst | empath | philosopher | storyteller | explorer | alchemist
 * Format values: waypoint | full | extract
 * Position: page number or chapter string (optional)
 */

const { Router }    = require('express');
const rateLimit     = require('express-rate-limit');
const Anthropic     = require('@anthropic-ai/sdk');

const router = Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,     // 1 minute
  max: parseInt(process.env.RATE_LIMIT_PER_MIN || '10', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — please wait a moment.' },
});

const LENS_PROMPTS = {
  analyst: `You are a literary analyst. Provide a structured, evidence-based reading of the book at this position. Focus on craft, narrative architecture, symbolism, and textual patterns. Be precise and analytical.`,
  empath: `You are an empathic reader. Focus on the emotional landscape, character interiority, and relational dynamics at this point in the book. What is the emotional truth being explored?`,
  philosopher: `You are a philosophical reader. Surface the underlying ideas, moral questions, and existential themes at this point. Connect the text to broader philosophical traditions where relevant.`,
  storyteller: `You are a master storyteller. Focus on narrative momentum, plot mechanics, tension, and the craft of storytelling at this position. How is the story being told, and why?`,
  explorer: `You are a literary explorer. Focus on place, culture, history, and the world-building present at this point. How does the setting and context shape meaning?`,
  alchemist: `You are an alchemical reader. Find the hidden connections — across themes, between characters, between this book and other works. Surface the unexpected resonances and deeper patterns.`,
};

const FORMAT_INSTRUCTIONS = {
  waypoint: 'Write a concise waypoint summary (150–200 words) that captures the key insight at this reading position, written as if for a reading journal.',
  full:     'Write a full lens reading (300–450 words) that deeply engages with the text at this position.',
  extract:  'Write a brief extract-style note (80–120 words) — a single sharp observation or insight.',
};

router.post('/', limiter, async (req, res) => {
  const { bookTitle, author, lens = 'analyst', format = 'waypoint', position } = req.body;

  if (!bookTitle || !author) {
    return res.status(400).json({ error: 'bookTitle and author are required.' });
  }
  if (!LENS_PROMPTS[lens]) {
    return res.status(400).json({ error: `Unknown lens: ${lens}` });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'Synopsis Engine not configured — missing API key.' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const positionClause = position
    ? `The reader is currently at: ${position}.`
    : 'Consider the book as a whole.';

  const userPrompt = `Book: "${bookTitle}" by ${author}.
${positionClause}

${FORMAT_INSTRUCTIONS[format] || FORMAT_INSTRUCTIONS.waypoint}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: LENS_PROMPTS[lens],
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = message.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    res.json({
      result: text,
      lens,
      format,
      bookTitle,
      author,
      position: position || null,
      model: message.model,
      usage: message.usage,
    });
  } catch (err) {
    console.error('Synopsis Engine error:', err.message);
    res.status(502).json({ error: 'Failed to generate synopsis. Please try again.' });
  }
});

module.exports = router;
