# How to Record the Demo GIF

## What to capture
A 50-55 second recording of the demo app running at:
https://adnankhan.github.io/feature-agent-client/

## Recommended tools (Mac)
- Kap (free): getkap.co -- records GIF directly
- Gifski (brew install gifski): higher quality
- LICEcap: free, cross-platform

## Browser setup before recording
1. Open Chrome
2. Set window size to 1280x800
   DevTools -> toggle device toolbar -> set custom
3. Set zoom to 100%
4. Open the demo URL
5. Wait for page to load fully
6. Do NOT click anything -- demo auto-starts

## What happens automatically (no interaction needed)
0:00  Page loads with demo banner
0:02  Task input pre-filled, "Run Agent" auto-clicks
0:03  Pipeline appears, issue_reader starts spinning
0:05  Clarifier starts
0:07  Clarification panel slides in with 2 questions
0:10  Panel shows both questions with option rows
      (demo auto-answers after 3.5 seconds)
0:11  Answers submitted, panel closes
0:13  codebase_explorer starts
0:17  code_writer starts (longest skill ~18s)
0:22  code_writer shows file progress updates
0:35  code_writer finishes (green check)
0:37  test_writer starts
0:45  test_runner starts, log shows pytest output
0:49  pr_creator runs, PR URL logged
0:51  task_done: all 7 cards green, confetti fires
0:52  Benchmark table fades in with timing data
0:55  End recording

## GIF settings
Resolution: 1280x800 (or 960x600 to reduce file size)
Frame rate: 10 fps
Colors: 256
Target file size: under 12MB

## If file is too large
Reduce resolution to 960x600
Or reduce to 8fps
Or trim first 2 seconds (page load)

## After recording
1. Save as docs/demo.gif
2. Verify size is under 15MB (GitHub raw file limit)
3. Open in browser to verify it loops correctly
4. Commit: git add docs/demo.gif && git commit

## Screenshot
At the moment all 7 skill cards are green
(just before confetti ends) press Cmd+Shift+4
to take a screenshot. Save as docs/screenshot.png
