# Business Systems — positioning

Status: draft for Michael's review (October 9, 2026). Branch-only; not live.

## The rule

NLDS improves the digital systems local businesses use to attract customers, respond to opportunities,
and run more efficiently. Business Systems is the "respond" and "run" part of that rule. Websites remain
the "attract" part.

## What Business Systems is

A custom service. NLDS designs practical workflows around a specific business bottleneck, using the
tools the business already has wherever possible. The first concrete offer is the **Lead Response
System** (see `02-lead-response-system-offer.md`).

Problems it is for:
- missed leads and slow first response
- repetitive admin and retyping between tools
- disconnected tools (website, forms, inbox, calendar, job software)
- follow-up that depends on someone remembering
- notifications that reach the wrong person, or nobody
- no clear view of what needs attention

## How we talk about it

- Lead with the business problem, not the technology.
- Plain words: lead, inquiry, follow-up, notification, owner, inbox, log, report.
- Say what depends on the client's software. Never promise an integration we have not built.
- Human oversight is a feature: we say which steps stay with a person.
- Global CTA: "See What We Can Improve" → `/contact/?service=business-workflows`.

Do not use:
- "AI automation agency", "AI agents", "LLM", or "autonomous" as selling points
- "transform", "unlock", "elevate", "10x", "set it and forget it"
- invented metrics, response-time guarantees, or client results

## LeadStrike vs Business Systems

| | LeadStrike | NLDS Business Systems |
|---|---|---|
| What it is | Productized lead-response system | Custom workflow service |
| Scope | Incoming lead response for local service businesses | Any practical workflow; starts with lead response |
| Setup | Standard product setup | Designed around each client's tools and process |
| Branding | LeadStrike brand | NLDS brand; must not copy LeadStrike branding |
| CTA (for now) | "Ask About LeadStrike" → `/contact/?service=leadstrike` | "See What We Can Improve" → `/contact/?service=business-workflows` |

Pages may mention LeadStrike as the separate option for businesses that only need incoming lead
response. They must not present the NLDS Lead Response System and LeadStrike as the same thing.

## Where it lives on the site (branch `reposition-umbrella`)

- `/business-systems/` — service page (`src/pages/BusinessSystems.tsx`)
- `/business-systems/#lead-response-system` — featured offer
- Nav → Systems: Business Workflows, Lead Response Systems, LeadStrike
- Homepage "What We Build" Lead Systems and Business Workflows cards link to the page
- Footer → Services: Business Systems
