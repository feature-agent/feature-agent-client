const MOCK_EVENTS = [
  {
    delay_ms: 800,
    event: {
      type: "task_start",
      task_id: "demo1234",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "issue_reader",
      skill_index: 1,
      skill_total: 7,
      message: "Reading feature request...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 1800,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Parsing free text task description",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 600,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "issue_reader",
      elapsed_ms: 1640,
      llm_ms: 1380,
      input_tokens: 342,
      output_tokens: 89,
      cached_tokens: 0,
      cost_usd: 0.0018,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 200,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "clarifier",
      skill_index: 2,
      skill_total: 7,
      message: "Analyzing requirement clarity...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 2200,
    event: {
      type: "clarification_needed",
      task_id: "demo1234",
      questions: [
        {
          id: "q1",
          question: "Should due_date be required or optional when creating a task?",
          options: [
            { id: "a",
              label: "Optional -- tasks can be created without a due date",
              value: "optional" },
            { id: "b",
              label: "Required -- every task must have a due date",
              value: "required" },
            { id: "c",
              label: "Optional with default -- use today + 7 days if not provided",
              value: "optional_default" },
            { id: "other",
              label: "Other (type your own)",
              value: null }
          ]
        },
        {
          id: "q2",
          question: "What format should due_date use?",
          options: [
            { id: "a",
              label: "Date only -- YYYY-MM-DD (e.g. 2024-12-31)",
              value: "date" },
            { id: "b",
              label: "Full datetime with timezone -- ISO 8601 (e.g. 2024-12-31T23:59:00Z)",
              value: "datetime_tz" },
            { id: "c",
              label: "Unix timestamp integer",
              value: "unix_timestamp" },
            { id: "other",
              label: "Other (type your own)",
              value: null }
          ]
        }
      ],
      question_count: 2,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 3500,
    event: {
      type: "clarification_received",
      task_id: "demo1234",
      answer_count: 2,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 200,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "clarifier",
      elapsed_ms: 5900,
      llm_ms: 1240,
      input_tokens: 412,
      output_tokens: 198,
      cached_tokens: 280,
      cost_usd: 0.0014,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 300,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "codebase_explorer",
      skill_index: 3,
      skill_total: 7,
      message: "Cloning repository...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 1200,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Cloned feature-agent/projectflow-api",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 800,
    event: {
      type: "skill_progress",
      task_id: "demo1234",
      skill: "codebase_explorer",
      message: "Found 14 Python files",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 1400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Relevant: app/models/task.py",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Relevant: app/schemas/task.py",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Relevant: app/services/task_service.py",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Relevant: app/routers/tasks.py",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 800,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "codebase_explorer",
      elapsed_ms: 4200,
      llm_ms: 2800,
      input_tokens: 3240,
      output_tokens: 412,
      cached_tokens: 1800,
      cost_usd: 0.0089,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 300,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "code_writer",
      skill_index: 4,
      skill_total: 7,
      message: "Writing code changes...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 3000,
    event: {
      type: "skill_progress",
      task_id: "demo1234",
      skill: "code_writer",
      message: "Writing app/models/task.py...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 4000,
    event: {
      type: "skill_progress",
      task_id: "demo1234",
      skill: "code_writer",
      message: "Writing app/schemas/task.py...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 3500,
    event: {
      type: "skill_progress",
      task_id: "demo1234",
      skill: "code_writer",
      message: "Writing migrations/versions/002_add_due_date.py...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 3000,
    event: {
      type: "skill_progress",
      task_id: "demo1234",
      skill: "code_writer",
      message: "Writing app/routers/tasks.py...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 4000,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "code_writer",
      elapsed_ms: 18400,
      llm_ms: 16200,
      input_tokens: 5840,
      output_tokens: 2410,
      cached_tokens: 3200,
      cost_usd: 0.0312,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 300,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "test_writer",
      skill_index: 5,
      skill_total: 7,
      message: "Writing tests...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 2000,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Analyzing existing test patterns...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 6000,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "test_writer",
      elapsed_ms: 8200,
      llm_ms: 7400,
      input_tokens: 2840,
      output_tokens: 980,
      cached_tokens: 2100,
      cost_usd: 0.0148,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 300,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "test_runner",
      skill_index: 6,
      skill_total: 7,
      message: "Running tests...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 1500,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Running: pytest tests/ -v --tb=short",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 2000,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "tests/test_tasks.py::test_create_task_success PASSED",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "tests/test_tasks.py::test_create_task_with_due_date PASSED",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "tests/test_tasks.py::test_due_date_optional PASSED",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "success",
      message: "32 passed in 4.21s",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 600,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "test_runner",
      elapsed_ms: 5100,
      llm_ms: 0,
      input_tokens: 0,
      output_tokens: 0,
      cached_tokens: 0,
      cost_usd: 0.0,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 300,
    event: {
      type: "skill_start",
      task_id: "demo1234",
      skill: "pr_creator",
      skill_index: 7,
      skill_total: 7,
      message: "Creating GitHub PR...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 1200,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Creating branch: feature/agent-demo1234",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 800,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "info",
      message: "Pushing 4 changed files...",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 1200,
    event: {
      type: "log",
      task_id: "demo1234",
      level: "success",
      message: "PR opened: github.com/feature-agent/projectflow-api/pull/4",
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 600,
    event: {
      type: "skill_done",
      task_id: "demo1234",
      skill: "pr_creator",
      elapsed_ms: 3800,
      llm_ms: 0,
      input_tokens: 0,
      output_tokens: 0,
      cached_tokens: 0,
      cost_usd: 0.0,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 400,
    event: {
      type: "task_done",
      task_id: "demo1234",
      pr_url: "https://github.com/feature-agent/projectflow-api/pull/4",
      pr_number: 4,
      elapsed_ms: 47240,
      timestamp: new Date().toISOString()
    }
  },
  {
    delay_ms: 800,
    event: {
      type: "benchmark_summary",
      task_id: "demo1234",
      total_elapsed_ms: 47240,
      total_elapsed_human: "47.2s",
      skills: [
        { skill: "issue_reader", elapsed_ms: 1640, llm_ms: 1380, non_llm_ms: 260, input_tokens: 342, output_tokens: 89, cached_tokens: 0, cost_usd: 0.0018, status: "success", retry_count: 0 },
        { skill: "clarifier", elapsed_ms: 5900, llm_ms: 1240, non_llm_ms: 4660, input_tokens: 412, output_tokens: 198, cached_tokens: 280, cost_usd: 0.0014, status: "success", retry_count: 0 },
        { skill: "codebase_explorer", elapsed_ms: 4200, llm_ms: 2800, non_llm_ms: 1400, input_tokens: 3240, output_tokens: 412, cached_tokens: 1800, cost_usd: 0.0089, status: "success", retry_count: 0 },
        { skill: "code_writer", elapsed_ms: 18400, llm_ms: 16200, non_llm_ms: 2200, input_tokens: 5840, output_tokens: 2410, cached_tokens: 3200, cost_usd: 0.0312, status: "success", retry_count: 0 },
        { skill: "test_writer", elapsed_ms: 8200, llm_ms: 7400, non_llm_ms: 800, input_tokens: 2840, output_tokens: 980, cached_tokens: 2100, cost_usd: 0.0148, status: "success", retry_count: 0 },
        { skill: "test_runner", elapsed_ms: 5100, llm_ms: 0, non_llm_ms: 5100, input_tokens: 0, output_tokens: 0, cached_tokens: 0, cost_usd: 0.0, status: "success", retry_count: 0 },
        { skill: "pr_creator", elapsed_ms: 3800, llm_ms: 0, non_llm_ms: 3800, input_tokens: 0, output_tokens: 0, cached_tokens: 0, cost_usd: 0.0, status: "success", retry_count: 0 }
      ],
      total_input_tokens: 12674,
      total_output_tokens: 4089,
      total_cached_tokens: 7380,
      total_cost_usd: 0.0581,
      slowest_skill: "code_writer",
      fastest_skill: "issue_reader",
      timestamp: new Date().toISOString()
    }
  }
];
