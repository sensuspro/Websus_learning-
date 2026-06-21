# Websus_learning- demo

This branch contains a minimal demo for the Websus Learning AI chat app.

Files added:
- server.js — simple Express server that proxies to Hugging Face Inference API
- public/index.html — static chat UI using Web Speech API for ASR/TTS
- package.json
- .env.example

Quick start (local):
1. Install Node.js 18+ and clone the repo.
2. Checkout branch: git checkout demo/websus-demo
3. Copy .env.example to .env and set HF_API_KEY with your Hugging Face token.
4. npm install
5. npm start
6. Open http://localhost:3000

Hugging Face docs: https://huggingface.co/docs/api-inference

Security: do NOT commit your real API keys. Use GitHub Secrets for deployment.
