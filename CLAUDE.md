# CLAUDE.md — Feature Agent Client

## Purpose
Feature Agent Client is the web dashboard for the
Feature Agent system. It connects to Feature Agent
Core via HTTP and SSE, lets users submit coding
tasks, answer clarification questions with
Claude CLI-style option pickers, and watch the
AI agent execute skills in real time.

Built as the frontend course project for
"Building Agentic AI Systems: From Zero to
Production" by Adnan Khan.

## Tech Stack
  HTML5 + CSS3 + Vanilla JavaScript
  No framework. No build step. No dependencies.
  Single index.html file -- open in any browser.

  Demo app: static GitHub Pages site
  Animated GIF: recorded from demo app
  Hosting: GitHub Pages from /docs folder

## Architecture

### How it connects to the backend
  Submit task:   POST {API_URL}/api/tasks
  Stream events: GET  {API_URL}/api/stream/{task_id}
  Answer Qs:     POST {API_URL}/api/tasks/{id}/clarify
  Get benchmark: GET  {API_URL}/api/tasks/{id}/benchmark
  List tasks:    GET  {API_URL}/api/tasks

### SSE Event Flow
  Browser opens EventSource connection
  Backend replays all past events first
  New events stream in real time
  On disconnect: auto-reconnect after 3s
  Each event updates specific UI component

### File Structure
  index.html          main application (all inline)
  docs/
    index.html        GitHub Pages demo app
    mock-data.js      mock SSE events for demo
    demo.gif          animated demo recording
    screenshot.png    static screenshot for README
    RECORD_GIF.md     instructions for recording gif
  README.md
  CLAUDE.md

## Color Palette
  Background:  #0A0E1A  (dark navy)
  Card:        #1E293B  (dark blue-gray)
  Border:      #334155  (slate)
  Purple:      #7C3AED  (primary accent)
  Teal:        #0D9488  (secondary accent)
  Amber:       #F59E0B  (warning/highlight)
  Green:       #10B981  (success)
  Red:         #EF4444  (error)
  White:       #F8FAFC  (primary text)
  Muted:       #94A3B8  (secondary text)
  Dim:         #475569  (tertiary text)
  Mono:        Consolas, Monaco, monospace

## Skill Names and Display Labels
  issue_reader:        "Reading issue"
  clarifier:           "Analyzing clarity"
  codebase_explorer:   "Exploring codebase"
  code_writer:         "Writing code"
  test_writer:         "Writing tests"
  test_runner:         "Running tests"
  pr_creator:          "Creating PR"

## Phase Build Plan

### Phase 1 -- Shell, theme, task submission [DONE]
  PR: "feat: HTML shell, dark theme, task form"

### Phase 2 -- Pipeline dashboard and SSE [DONE]
  PR: "feat: skill pipeline, SSE streaming,
       live timer, task status"

### Phase 3 -- Clarification UI and log panel [ ]
  PR: "feat: clarification options UI,
       live log panel, benchmark table"

### Phase 4 -- Demo app, GIF, README [ ]
  PR: "feat: GitHub Pages demo, animated GIF
       instructions, full README with
       architecture diagram"

Mark each phase [DONE] after PR is merged.
