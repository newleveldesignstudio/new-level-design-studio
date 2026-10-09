# Reusable workflow architecture (platform-agnostic)

A reference shape for every Business Systems workflow, whatever the tools. Not a production build.

    Trigger → Intake → Normalize → Decide → Act → Notify → Log → Escalate → Review

Design rules that apply to every stage:
- Every run gets an ID so one lead can be traced end to end.
- The same input processed twice must not produce duplicate actions (idempotency).
- Failures are recorded and surfaced to a person. Nothing fails silently.
- Customer-facing messages, financial actions, and scheduling changes default to human approval.
  Removing approval requires an explicitly defined use case, bounded permissions, tested failure
  handling, and client authorization.

| Stage | Purpose | Input | Output | On failure | Human approval? |
|---|---|---|---|---|---|
| **Trigger** | Notice that something happened | Form submission, new email, schedule tick | A raw event with a run ID | Missed triggers are caught by a periodic check for anything unprocessed | No |
| **Intake** | Capture the raw event safely before doing anything else | Raw event | Stored copy of the original data | Store the raw event in a dead-letter/holding place so it can be replayed | No |
| **Normalize** | Turn messy input into one consistent record | Raw data | Clean record (name, contact, request, source, timestamps), with problems flagged | Keep the record, flag invalid fields, route to a person instead of guessing | No |
| **Decide** | Apply the agreed rules | Clean record + rules | Category, owner, priority, next action | Unknown cases go to the default owner, never dropped | Sometimes (when rules are uncertain) |
| **Act** | Do the work | Decision | Draft reply, task, calendar hold, or record update | Retry safely where duplicates are impossible; otherwise stop and alert | Yes by default for customer-facing messages, financial actions, and scheduling changes (see rule above) |
| **Notify** | Tell the right person | Decision + action result | Message to owner via agreed channel | Fall back to a second channel or the backup person | No |
| **Log** | Record what happened | Every stage's result | One log entry per run: what, who, when, status | Logging failure is itself an alert; the run is not marked done | No |
| **Escalate** | Catch what nobody handled | Log + time limits | Alert to the backup person or owner | If escalation can't send, it shows up in the next review | No (the escalation is to a human) |
| **Review** | Keep the system honest | Logs over a period | Summary: volume, response times, open items, failures | A missed review is noticed by the owner, not the system | Yes: the owner reviews |

## Mapping to a Lead Response System

- Trigger: website form or inbox
- Intake/Normalize: lead record
- Decide: category + owner
- Act: reply draft and/or follow-up task
- Notify: owner
- Log: lead log
- Escalate: backup person after the agreed time
- Review: simple report and post-launch review
