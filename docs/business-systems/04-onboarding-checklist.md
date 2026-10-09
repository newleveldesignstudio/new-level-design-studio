# Business Systems onboarding checklist (internal, reusable)

Copy this per client. Nothing goes live until every box is checked or explicitly waived by the client
in writing.

## Before building

- [ ] **Current process map:** every lead/work path today, step by step, including who does each step.
- [ ] **Systems and tools involved:** list each tool, the account owner, and the plan/tier (some
      features need paid tiers).
- [ ] **Read/write permissions:** what we need to read, what we need to write, and through which
      account. Least access possible. Credentials stored in the client's accounts or a secrets store,
      never in docs, chat, or code.
- [ ] **Human approval points:** which actions always need a person (sending to customers, pricing,
      scheduling, deleting anything). From intake question 9.
- [ ] **Owner:** one named person at the client who owns the workflow and receives escalations.
- [ ] **Success metric:** one or two measurable outcomes agreed up front (for example, time to first
      response, or the number of leads left unanswered after 24 hours). Measure the baseline first.

## Design

- [ ] **Notification path:** who is told, how (email, text, app), and the backup person.
- [ ] **Failure handling:** what happens when a step fails (tool down, bad data, missing field).
      Every failure is visible to a person; nothing fails silently.
- [ ] **Rollback / manual fallback:** how the team works if the workflow is switched off, and how to
      switch it off. Written down and handed to the owner.
- [ ] **Data handling:** what customer data passes through, where it is stored, how long it is kept.

## Before go-live

- [ ] **Test cases:** realistic test leads for every path, using clearly fake data:
  - normal lead, each category/route
  - duplicate submission
  - missing or bad fields
  - lead that should escalate (nobody responds)
  - a tool unavailable mid-run
  - after-hours lead
- [ ] Owner has seen a test notification, a test log entry, and a test escalation.
- [ ] Owner has the manual fallback steps.
- [ ] Client sign-off on go-live (in writing).

## After launch

- [ ] **Post-launch review** at about 2 weeks: misses, slow responses, false escalations, anything
      the team works around. Adjust rules.
- [ ] Compare against the baseline success metric.
- [ ] Decide: keep as is, adjust, or add the next piece.
