---
name: Superpowers Framework
description: Disciplined agentic methodology for systematic software development using composable, reusable skill workflows
---

# Superpowers Framework

Superpowers is a disciplined agentic skills framework that guides systematic software development through composable, reusable workflows. It establishes clear methodologies for debugging, planning, testing, verification, and collaboration—allowing agents to deliver higher-quality code with fewer iterations.

## Core Philosophy

**Principle**: Structure beats intuition. Disciplined processes scale better than ad-hoc approaches.

- Skills are reusable, composable workflows that trigger automatically to guide specific development tasks
- Each skill documents a proven methodology with explicit steps, decision points, and principles
- Framework works across Claude Code, Cursor, Codex, OpenCode, and Gemini CLI
- Instruction priority: User instructions > Superpowers skills > Default system prompt

## Instruction Priority System

When multiple instruction sources conflict, resolve in this order:
1. **User instructions** (most specific, current conversation)
2. **Superpowers skills** (disciplined frameworks, proven methodologies)
3. **Default system prompt** (fallback behaviors)

This ensures user intent always takes precedence while benefiting from proven skill workflows.

## Process Skills

### Brainstorming
**Purpose**: Transform ideas into designs before implementation begins.

**Key Principle**: Do NOT invoke any implementation skill (like writing-plans or test-driven-development) until design is approved.

**Process**:
1. Turn idea into design through collaborative dialogue
2. Explore trade-offs, constraints, and alternatives
3. Build explicit checklist of design decisions
4. Get approval before moving to implementation

**Red Flag**: Starting to write implementation plans or code before design is finalized.

### Systematic Debugging
**Purpose**: Find and fix root causes, not symptoms.

**Key Principle**: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.

**Four-Phase Methodology**:
1. **Root Cause Investigation**: Gather evidence, reproduce behavior, identify what changed
2. **Pattern Analysis**: Look for common threads, similar failures, environmental factors
3. **Hypothesis and Testing**: Form testable hypothesis, design minimal tests, verify predictions
4. **Implementation**: Fix root cause with confidence, never patch symptoms

**Red Flag**: Attempting fixes before completing phase 1-3 investigation.

### Writing Plans
**Purpose**: Create comprehensive implementation plans with bite-sized, verifiable tasks.

**Task Structure** (each task includes):
- Checkbox: Failing test written
- Checkbox: Test runs and fails (red)
- Checkbox: Code implemented
- Checkbox: Test passes (green)
- Checkbox: Changes committed to git

**Characteristics**:
- Exact file paths and function names
- Test-driven development approach
- Frequent, small commits
- Clear acceptance criteria
- Estimated task complexity

**Red Flag**: Implementation tasks without corresponding tests.

### Verification Before Completion
**Purpose**: Confirm changes work before considering work done.

**Process**:
1. Run full test suite
2. Verify functionality in actual environment
3. Check for unintended side effects
4. Confirm no regressions

**Red Flag**: Completing tasks without running tests or verification.

## Implementation Skills

### Test-Driven Development (TDD)
**Process**:
1. Write failing test first (red)
2. Write minimal code to make test pass (green)
3. Refactor for clarity (refactor)
4. Repeat

**Benefit**: Tests serve as executable specification and regression prevention.

### Executing Plans
**Purpose**: Systematically work through tasks created by writing-plans skill.

**Process**:
- Work on one task at a time
- Follow task structure (test, implement, verify, commit)
- Mark progress explicitly
- Stop and replan if blocked

### Finishing a Development Branch
**Purpose**: Complete in-progress work and prepare for merge.

**Process**:
1. Ensure all tests pass
2. Run full verification suite
3. Commit final changes
4. Verify branch is clean and complete

### Git Worktrees
**Purpose**: Work on multiple branches simultaneously with isolated environments.

**Benefits**:
- Each worktree has separate working directory
- No context switching overhead
- Can work on feature and hotfix simultaneously
- Clean branch management

### Code Review
**Process**:
- **Requesting Code Review**: Explain changes clearly, provide test results, note any breaking changes
- **Receiving Code Review**: Incorporate feedback, explain disagreements, iterate until approved
- **Giving Code Review**: Focus on correctness, clarity, maintainability, not style

## Meta Skills

### Superpowers Authoring
**Purpose**: Create new skills or extend existing ones.

**SKILL.md Format**:
```
---
name: Skill Name
description: One-line description
---

# Skill Name

Introduction and context.

## Key Principles
- Core rule 1
- Core rule 2

## Process
1. Step 1
2. Step 2
3. Step 3

## Red Flags
- Warning sign 1
- Warning sign 2
```

### Using Superpowers
**Purpose**: Understand and apply the Superpowers framework within Claude Code.

**Key Behaviors**:
- Recognize when to invoke specific skills based on task type
- Follow skill processes disciplined, not ad-hoc
- Respect instruction priority system
- Use framework to guide agent behavior consistently

## Common Workflows

### New Feature Development
1. **Brainstorm**: Design feature with stakeholder approval
2. **Write Plans**: Create task list with tests
3. **TDD**: Implement each task with test-first approach
4. **Code Review**: Get feedback and iterate
5. **Verification**: Full test suite + manual verification
6. **Finish Branch**: Ensure clean completion

### Bug Fix
1. **Systematic Debugging**: Root cause investigation (required first)
2. **Write Plans**: Create targeted fix with regression tests
3. **TDD**: Implement fix with tests
4. **Verification**: Confirm fix works, no regressions
5. **Finish Branch**: Complete and merge

### Refactoring
1. **Brainstorm**: Design refactoring approach
2. **Write Plans**: Break into safe, testable increments
3. **TDD**: Refactor with tests ensuring behavior preserved
4. **Verification**: Full test suite passes
5. **Finish Branch**: No functional changes

## Red Flags

Watch for these warning signs:
- Starting implementation before design is approved
- Attempting fixes without root cause investigation
- Writing code before tests
- Merging code without running tests
- Incomplete verification before marking work done
- Skipping commits or batching changes too large
- Following skills blindly instead of adapting to context
- Not involving user for feedback and approval

## Quick Start Guide

1. **Identify task type**: Feature, bug fix, refactor, debug, or collaborate
2. **Select appropriate skill**: Brainstorming → Writing-Plans → TDD → Verification → Finish
3. **Follow skill process**: Work through each phase systematically
4. **Adapt as needed**: User instructions always override framework
5. **Verify completion**: Don't mark done until fully tested and verified

## Integration with Claude Code

The Superpowers framework integrates directly into Claude Code workflows:

- Skills trigger automatically based on task type
- Instruction priority guides behavior across multiple skills
- Verification and testing methodologies prevent regressions
- Disciplined planning reduces iteration count
- Code review workflows improve quality

Apply skills with confidence—they're designed to guide systematic, high-quality software development.
