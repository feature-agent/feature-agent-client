# Feature Agent Client

> Real-time web dashboard for the Feature Agent autonomous coding system

![Feature Agent Demo](docs/demo.gif)

---

## What is this?

Feature Agent Client is the browser interface for
[Feature Agent Core](https://github.com/adnankhan/feature-agent-core).
It lets you:

- Submit a GitHub issue URL or plain text feature request to the AI agent
- Answer clarification questions with smart suggested options (Claude CLI style)
- Watch 7 specialized AI skills execute in real time with live SSE streaming
- See a live log of everything the agent is doing
- Review per-skill timing, token usage, and cost
- Open the generated GitHub PR directly from the UI

**No framework. No build step. One HTML file.**

---

## Live Demo

Try it without any backend:

**[Launch Demo](https://adnankhan.github.io/feature-agent-client/)**

The demo runs a complete simulated agent session
in your browser using mock data. No API key needed.
Auto-starts 2 seconds after page load.

---

## Screenshot

![Dashboard Screenshot](docs/screenshot.png)

---

## System Architecture

```
┌──────────────────────────────────────────────────────┐
│                    BROWSER                            │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │           feature-agent-client                  │  │
│  │               index.html                        │  │
│  │                                                 │  │
│  │  ┌─────────────┐   ┌─────────────────────────┐ │  │
│  │  │    Task     │   │   Pipeline Dashboard    │ │  │
│  │  │  Submission │   │                         │ │  │
│  │  │    Form     │   │  ┌─────┐ ┌─────┐ ┌───┐ │ │  │
│  │  │             │   │  │Skill│ │Skill│ │...│ │ │  │
│  │  │  GitHub URL │   │  │  1  │ │  2  │ │   │ │ │  │
│  │  │  or text    │   │  └─────┘ └─────┘ └───┘ │ │  │
│  │  └──────┬──────┘   └────────────┬────────────┘ │  │
│  │         │                       │ SSE events   │  │
│  │  ┌──────▼──────┐   ┌────────────▼────────────┐ │  │
│  │  │Clarification│   │      SSE Manager        │ │  │
│  │  │   Panel     │   │   EventSource API       │ │  │
│  │  │             │   │   Auto-reconnect 3s     │ │  │
│  │  │  a) Option  │   │   Ping watchdog 30s     │ │  │
│  │  │  b) Option  │   └─────────────────────────┘ │  │
│  │  │  c) Option  │                               │  │
│  │  │  d) Other   │   ┌─────────────────────────┐ │  │
│  │  └──────┬──────┘   │    Log Panel            │ │  │
│  │         │          │    Benchmark Table      │ │  │
│  │         │          └─────────────────────────┘ │  │
│  └─────────┼──────────────────────────────────────┘  │
│            │                                          │
└────────────┼──────────────────────────────────────────┘
             │
      ┌──────┼────────────────────────────────┐
      │      │  HTTP + SSE                    │
      │      │                                │
      │  POST /api/tasks        (submit task) │
      │  GET  /api/stream/{id}  (SSE stream)  │
      │  POST /api/tasks/{id}/clarify         │
      │  GET  /api/tasks/{id}/benchmark       │
      │                                       │
      └──────────────────────────────────────┘
                         │
         ┌───────────────▼──────────────────────┐
         │        feature-agent-core            │
         │                                      │
         │  FastAPI                             │
         │     │                                │
         │     └── NATS JetStream Queue         │
         │               │                      │
         │               └── Agent Worker       │
         │                      │               │
         │               Skills execute:        │
         │               1. issue_reader        │
         │               2. clarifier           │
         │               3. codebase_explorer   │
         │               4. code_writer         │
         │               5. test_writer         │
         │               6. test_runner         │
         │               7. pr_creator          │
         │                      │               │
         │                      ▼               │
         │               GitHub PR Created      │
         │                                      │
         └──────────────────────────────────────┘
                         │
         ┌───────────────▼──────────────────────┐
         │         projectflow-api              │
         │    (target codebase repo)            │
         │                                      │
         │  Agent clones this repo              │
         │  Reads code and tests                │
         │  Implements the feature              │
         │  Opens PR against this repo          │
         │  Human reviews and merges            │
         └──────────────────────────────────────┘
```

### SSE Event Flow

```
Agent Worker
    │
    ├── emit task_start
    ├── emit skill_start (issue_reader)
    ├── emit skill_done  (issue_reader)
    ├── emit clarification_needed  ──► Browser shows Q panel
    │                                  User answers questions
    │                              ◄── POST /clarify
    ├── emit clarification_received
    ├── emit skill_start (codebase_explorer)
    ├── emit skill_progress (found 12 files)
    ├── emit skill_done  (codebase_explorer)
    ├── emit skill_start (code_writer)
    ├── emit skill_progress (writing models.py)
    ├── emit skill_done  (code_writer)
    ├── emit skill_start (test_writer)
    ├── emit skill_done  (test_writer)
    ├── emit skill_start (test_runner)
    ├── emit log (32 passed)
    ├── emit skill_done  (test_runner)
    ├── emit skill_start (pr_creator)
    ├── emit skill_done  (pr_creator)
    ├── emit task_done  ──► Browser shows PR button + confetti
    └── emit benchmark_summary  ──► Browser shows timing table
```

### SSE Events Reference

| Event | Trigger | UI Effect |
|-------|---------|-----------|
| `task_start` | Task begins | Show pipeline, start timer |
| `clarification_needed` | Agent has questions | Show Q panel, pause timer |
| `clarification_received` | Answers accepted | Hide panel, resume timer |
| `skill_start` | Skill begins | Card goes spinning |
| `skill_progress` | Skill update | Card message updates |
| `skill_done` | Skill completes | Card goes green with timing |
| `skill_error` | Skill fails/retries | Card goes red or amber |
| `log` | Log message | Appended to log panel |
| `task_done` | PR created | PR button + confetti |
| `benchmark_summary` | After task_done | Benchmark table appears |
| `task_failed` | Task failed | Status goes red |
| `ping` | Every 15s | Ignored (keep-alive) |

---

## Setup

### Prerequisites
- [Feature Agent Core](https://github.com/adnankhan/feature-agent-core) running locally on port 8000
- A modern browser (Chrome, Firefox, Safari, Edge)

### Run locally

```bash
git clone https://github.com/adnankhan/feature-agent-client
cd feature-agent-client

# Option 1: open directly (may have CORS limits)
open index.html

# Option 2: serve with Python (recommended)
python3 -m http.server 3000
# Open http://localhost:3000
```

### Connect to your backend

Edit `index.html` at the top of the `<script>` tag:

```javascript
const CONFIG = {
  API_URL: 'http://localhost:8000', // change this
  ...
}
```

---

## Complete System Setup

To run all three repos together:

### 1. Clone everything

```bash
git clone https://github.com/adnankhan/projectflow-api
git clone https://github.com/adnankhan/feature-agent-core
git clone https://github.com/adnankhan/feature-agent-client
```

### 2. Set up projectflow-api

```bash
cd projectflow-api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8001
# Running at http://localhost:8001
```

### 3. Set up feature-agent-core

```bash
cd ../feature-agent-core
cp .env.example .env
# Edit .env:
#   ANTHROPIC_API_KEY=your_key_here
#   GITHUB_TOKEN=your_github_pat_here
#   GITHUB_REPO=yourusername/projectflow-api
docker compose up
# Running at http://localhost:8000
```

### 4. Open the client

```bash
cd ../feature-agent-client
python3 -m http.server 3000
# Open http://localhost:3000
```

### 5. Run your first task

In the client:
- Task: paste a GitHub issue URL from projectflow-api
  or type: `Add due_date field to tasks`
- Repo: `yourusername/projectflow-api`
- Click "Run Agent ->"

---

## Example Tasks

Easy -- good first run:
```
Add due_date field to tasks
```

Medium -- touches more files:
```
Add pagination to GET /projects/{id}/tasks
with page and page_size query parameters
```

Hard -- new endpoint:
```
Add a project statistics endpoint
GET /projects/{id}/stats returning task counts
by status, by priority, and completion percentage
```

---

## Project Structure

```
feature-agent-client/
  index.html          Main application
                      All CSS and JS inline
                      No build step required

  docs/
    index.html        Demo app (GitHub Pages)
    mock-data.js      Simulated SSE event sequence
    demo.gif          Animated demo (record this)
    screenshot.png    Static screenshot
    RECORD_GIF.md     Step-by-step GIF instructions

  .github/
    workflows/
      pages.yml       Auto-deploy docs/ to Pages

  README.md           This file
  CLAUDE.md           Architecture and build spec
```

---

## Part of the Feature Agent System

| Repo | Purpose |
|------|---------|
| [feature-agent-core](https://github.com/adnankhan/feature-agent-core) | AI agent backend |
| [feature-agent-client](https://github.com/adnankhan/feature-agent-client) | This repo -- web UI |
| [projectflow-api](https://github.com/adnankhan/projectflow-api) | Sample target codebase |

---

## Course

Built for **"Building Agentic AI Systems: From Zero to Production"** by Adnan Khan.

*No framework. No build step. One HTML file.*
