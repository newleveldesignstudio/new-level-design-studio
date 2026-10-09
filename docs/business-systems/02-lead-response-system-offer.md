# Lead Response System — offer definition

Status: draft for Michael's review. The public copy for this offer is on `/business-systems/`.

## One line

A lead response workflow designed around a local service business's existing tools, so every new
inquiry gets seen, owned, and answered.

## The flow

1. **New lead arrives:** website form or business inbox.
2. **Identify the request:** extract key details; categorize by service, location, or urgency.
3. **Route it:** routing rules pick the owner.
4. **Notify the team:** the owner is told through a channel they actually check.
5. **Create or draft the follow-up:** a reply draft for a person to review, or a follow-up task.
6. **Record what happened:** the lead and its status are logged in one place.
7. **Escalate if not handled:** after an agreed time, a second person is told.

Not every step is production-ready for every client setup. Each engagement agrees, before building,
which steps run automatically, which stay manual, and which depend on the client's software.

## Who it is for

Local service businesses (contractors, home services, salons, professional services, real estate)
with any of:
- website leads sitting unanswered
- inbox leads getting buried
- nobody knowing who owns an inquiry
- slow first response
- manual copying between the inbox, spreadsheets, and job tools
- follow-up that depends on someone remembering

## What we can build (pick only what fixes the bottleneck)

| Component | What it does | Depends on |
|---|---|---|
| Website form intake | New form submissions start the workflow | NLDS-built sites: yes. Other form tools: only if they can send submissions out |
| Email lead intake | Inbox inquiries handled the same way | Email provider and the access the client grants |
| Lead categorization | Sort by service, location, urgency using approved rules | — |
| Routing rules | Each request type goes to the right person or team | Client defines owners |
| Notifications | Owner is told when a lead needs attention | Email by default; other channels depend on the client's tools |
| Follow-up drafting | First reply prepared for a person to review and send | Never sent without approval unless the client explicitly signs off on a fixed template |
| Task creation | Follow-up task so the next step is not forgotten | A task/job tool that accepts tasks from outside |
| Basic lead logging | Every lead and its status in one place | A tool the client uses, or a simple log we set up |
| Escalation rules | Unhandled leads flagged to a second person after a set time | Client defines the time and the backup person |
| Simple reporting | Leads received, how fast answered, what is still open | Depends on what the log captures |

## What this is not

- Not a full CRM replacement.
- Not autonomous selling without human oversight.
- Not a one-size-fits-all chatbot.
- Not a promise to connect to every business platform.
- Not a replacement for staff judgment on complex customer situations.

## How it works (NLDS Method)

| Step | Applied to lead response |
|---|---|
| Understand | Map every form, inbox, and phone path, and who answers each |
| Identify | Find where leads wait, get lost, or get retyped; rank by cost |
| Simplify | Agree the smallest flow: owners, response time, what stays manual |
| Build | Intake, routing, notifications, logging around existing tools |
| Test | Realistic test leads through every path, including escalation, before go-live |
| Improve | Post-launch review of misses and slow responses; adjust rules |

## Pricing

Not set. Do not publish pricing until Michael approves it. The page has no pricing on purpose.

## Relationship to LeadStrike

See `01-positioning.md`. LeadStrike is the productized option; this offer is custom work. LeadStrike
production is currently paused (Oct 2026). Nothing here depends on it.
