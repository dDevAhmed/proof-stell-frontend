

# 🕹️ Contributing to Proof-Stell Backend

Welcome to the **Proof-Stell Backend** — the decentralized engine powering **Proof-Stell**, a blockchain-based Whack-a-Mole game built on **StarkNet**.

This backend handles core gameplay logic, leaderboard computation, rewards distribution, and blockchain interactions. Every contribution helps make Web3 gaming more **transparent, fair, and fun**.

Whether you're fixing bugs, improving performance, or building new game mechanics — you're helping shape the future of on-chain gaming.

---

# ⚙️ Getting Started

## 1. Fork the Repository

Click the **Fork** button at the top-right of the repository page on GitHub.

---

## 2. Clone Your Fork

```bash
git clone https://github.com/Proof-Stell/Proof-Stell-Backend.git
cd Proof-Stell-Backend
```

---

## 3. Create a Feature Branch

Always branch from `develop`:

```bash
git checkout -b feature/your-feature-name
```

---

## 4. Install Dependencies

```bash
npm install
```

---

## 5. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in required configuration such as database URLs, JWT secrets, and StarkNet connection settings.

---

## 6. Start Development Server

```bash
npm run start:dev
```

The server will be available at:

```
http://localhost:3000
```

---

# 🛰️ Running Services

When running locally, the backend connects to:

* 🛢️ **PostgreSQL** — stores player profiles, scores, and sessions
* 📄 **Swagger API Docs** — available at `http://localhost:3000/api`
* 🌐 **StarkNet RPC Node** — handles smart contract interactions
* 🎮 **Game Engine Modules** — core gameplay logic and scoring system

---

# 🎮 Areas You Can Contribute To

## 🧠 Game Logic Engine

* Mole spawn timing
* Round progression rules
* Score calculation system

## 🏆 Leaderboard System

* Real-time ranking updates
* Anti-cheat validation
* On-chain / off-chain sync improvements

## 👤 Player System

* Wallet-linked profiles
* XP, levels, and progression logic
* Match history tracking

## 🎁 Rewards Engine

* Daily challenge payouts
* Claim verification logic
* Smart contract reward triggers

## 🔗 StarkNet Integration

* Cairo contract calls
* Transaction verification
* Event listeners & indexing

---

# 💅 Code Quality Standards

We maintain a clean, scalable backend architecture:

* Use **TypeScript (strict mode)**
* Follow **NestJS modular structure**
* Format code with **Prettier**
* Enforce linting with **ESLint**
* Keep business logic separated from controllers

---

# 🌳 Git Workflow

## Branch Strategy

* `main` → Production-ready code
* `develop` → Active integration branch
* `feature/*` → New features
* `bugfix/*` → Bug fixes
* `hotfix/*` → Critical production fixes

---

## 🧾 Commit Convention

We follow **Conventional Commits**:

```bash
feat: add mole spawn randomness system
fix: correct leaderboard ranking bug
chore: update dependencies
refactor: simplify reward calculation logic
```

---

## 🔁 Pull Request Guidelines

Before submitting a PR:

* Ensure the project builds successfully
* Add or update tests where necessary
* Keep PRs small and focused
* Reference related issues
* Include a clear description of changes

---

# 🧠 Security Guidelines

Security is critical in a blockchain-based game:

* Store secrets in `.env` only (never commit them)
* Use **JWT authentication** for player sessions
* Validate all inputs using `class-validator`
* Prevent duplicate reward claims (anti-cheat logic)
* Verify all StarkNet interactions on-chain

---

# 🛡️ API Middleware & Error Codes

All Next.js API routes **must** be wrapped with the `withErrorHandling` middleware located in `src/lib/api/errorHandler.ts`.

## Response Envelope

Every API response follows this typed envelope:

```ts
// success
{ success: true;  data: T }

// failure
{ success: false; error: { code: string; message: string } }
```

## Standard Error Codes

| Code | HTTP Status | Meaning |
|---|---|---|
| `INTERNAL_ERROR` | 500 | Unhandled exception inside the handler |
| `VALIDATION_ERROR` | 422 | Zod schema parse failure (body or query) |
| `METHOD_NOT_ALLOWED` | 405 | HTTP verb not accepted by this route |
| `NOT_FOUND` | 404 | Requested resource does not exist |

## Writing a New API Route

```ts
import { z } from "zod";
import { methodNotAllowed, withErrorHandling } from "@/lib/api/errorHandler";
import type { ApiResponse } from "@/lib/api/types";

const bodySchema = z.object({ id: z.string().uuid() });

async function handler(req, res: NextApiResponse<ApiResponse<YourType>>) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const { id } = bodySchema.parse(req.body); // throws ZodError → caught automatically

  return res.status(200).json({ success: true, data: { id } });
}

export default withErrorHandling(handler);
```

## Logging

Requests and errors are logged to stdout as structured JSON by `src/lib/api/logger.ts`.  
Replace the `console.*` calls with a structured logger (e.g. pino) when moving to production.

---

# 🤝 Join the Community

**Proof-Stell is more than a game — it's a decentralized gaming experiment.**

We’re building a system where:

* 🎯 Skill is verifiable
* 🧾 Scores are transparent
* 💰 Rewards are on-chain
* 🧠 Logic is open-source

Join us in redefining how competitive gaming works in Web3.

---
