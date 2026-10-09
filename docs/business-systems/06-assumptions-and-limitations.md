# Assumptions and limitations

Made while drafting the Business Systems prep (October 9, 2026). Each needs Michael's confirmation
before anything here ships.

## Assumptions

1. **No pricing.** The page and docs publish no price. Pricing is Michael's call.
2. **Contact form unchanged.** Intake questions live on the page and in `03-intake-questions.md`. The
   form's "Business Workflow or Process Problem" option (added in 3e7e4fe) routes these inquiries. The
   form was not extended because the main checkout has uncommitted Contact form changes.
3. **Form intake claim.** "Works with forms on NLDS-built sites" assumes NLDS sites' Netlify forms can
   forward submissions (outgoing notifications/webhooks). Other form tools are "depends on the tool".
4. **Email intake** assumes the client grants access to a business inbox through their provider;
   stated as dependent on the provider and access.
5. **Notifications default to email**; other channels are stated as dependent on the client's tools.
   No SMS is promised (consistent with LeadStrike's paused SMS work).
6. **Follow-up drafting** means a draft for a person to review. No auto-sending is promised.
7. **Industries named** in the offer doc (contractors, home services, salons, professional services,
   real estate) match the industries already shown in NLDS work. The public page says only "local
   service businesses".
8. **No case studies or metrics.** NLDS has no Business Systems client results yet; none are implied.

## Limitations

- No production workflow exists for this offer yet. The page describes a service NLDS can design.
- Integrations depend on each client's software and plan tier. Some will not be possible.
- LeadStrike is separate, and its production is paused. The page mentions LeadStrike only as a separate
  option, with "Ask About LeadStrike" → contact (no public LeadStrike link).
- Public answer-engine files (`llms.txt` etc.) and `/services/` were not updated for Business Systems.
  That's a follow-up once the copy is approved.
