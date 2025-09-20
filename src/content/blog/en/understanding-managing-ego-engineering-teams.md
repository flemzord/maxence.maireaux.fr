---
title: "Understanding and Managing Ego in Engineering Teams"
description: "How hero culture hinders collaboration, quality, and innovation — and what practices to adopt to put the collective back at the center."
date: 2025-05-17
tags: ["leadership", "team-management", "software-engineering", "collaboration", "culture"]
lang: "en"
translationKey: "ego-engineering-teams"
---

> "The greatest obstacle to a team's success is the ego of individuals." — Patrick Lencioni

## What do we mean by "ego"?

In the context of software development, ego manifests when an engineer:

* Refuses criticism of their code ("My design is necessarily the best"),
* Jealously guards information to remain indispensable,
* Devalues others' ideas,
* Focuses on individual recognition rather than product success.

This phenomenon is sometimes encouraged by the **"rockstar developer"** or **"10× engineer"** culture widely promoted in the industry.

## Where does the problem come from?

1. **Individual reward systems**: promotions based on "visible" commits rather than collective impact.
2. **Inadequate code review processes**: absence of standards favoring benevolent feedback.
3. **Passive leadership**: tolerance of divisive behaviors as long as deliverables arrive.
4. **Media heroization**: highlighting individual figures (Jobs, Musk) as absolute models.

## Warning signs to watch for

Spotting egocentric behaviors early prevents them from becoming anchored in the culture:

| Observable indicator | Question to ask | Hidden risk |
|---------------------|-----------------|-------------|
| Stand-up monopolized by 1-2 people | Do others speak without being invited? | Information silos, demotivation |
| Defensive code review comments | Does the debate focus on facts or people? | Interpersonal conflicts |
| Refusal to write documentation | Who will be able to maintain this module in 6 months? | Critical bus factor |
| Public blame during incidents | Are we looking for the cause or a culprit? | Deterioration of psychological safety |

## Why is ego toxic to velocity?

| Ego-related symptom | Measurable impact |
|---------------------|-------------------|
| Giant, undiscussed Pull Requests | Cycle time +40%, increased bug risk |
| Refusal of pair programming | Reduced bus factor, slower onboarding |
| Ownership bias ("my file, my rules") | Conflicts during reviews, hindered innovation |
| Personal defense during post-mortems | Masked root causes, repeated incidents |

Internal research at **Google (Project Aristotle, 2016)** indicates that team performance depends primarily on **psychological safety** — a climate where everyone can express themselves without fear of humiliation. Toxic ego destroys this safety.

## Ego culture vs collaborative culture

| Dimension | Ego culture | Collaborative culture |
|-----------|-------------|----------------------|
| Technical decisions | Centralized around "gurus" | Open prototyping and RFCs |
| Merit attribution | Individual (solo presentations) | Collective (team demos) |
| Failure management | Blame and justification | Causal analysis and learning |
| Career | Promotions by visibility | Promotions by team impact |

## Strategies to tame ego

### Redefine metrics

* Move from individual KPIs (lines of code) to **team metrics** (average cycle time, defect rate).
* Value **invisible activities**: mentoring, documentation, code review.

### Implement collective ownership

* **Pair programming** or **mob programming** to share context.
* **Short branches + rapid reviews** to reduce emotional attachment to code.
* **Domain rotation**: each developer changes microservice every 3 months.

### Strengthen psychological safety

* **Blameless post-mortems**: focus on processes, not people.
* **Codes of conduct** and **non-violent feedback rules** during reviews.
* "Growth mindset" training to encourage continuous learning.

### Leadership by example

* Leads share their own mistakes publicly ("failure Friday").
* Practice **servant leadership**: remove obstacles rather than dictate solutions.

## Tools and rituals to dilute ego

1. **Spotify Health Check**: a monthly review where each squad rates itself anonymously on communication, mutual aid, and fun.
2. **Rule of Two Reviewers**: no PR can be merged without two independent approvals; the author becomes a simple observer.
3. **Incident commander rotation**: for each incident, a different person leads crisis management—guaranteed crash course in humility.
4. **Pair coaching**: two developers of different levels exchange 30 min/week on their mutual progress goals.

## Case study: GitHub and "Delete-Keyboard Culture"

In 2022, GitHub experimented with weekly "social coding sessions" where two cross-teams refactor a component together, camera and mic enabled. Result:

* Average code review time reduced by **31%**.
* Developer satisfaction measured by internal survey increased from 7.2 to 8.6/10.
* Notable decline in conflictual discussions identified by the Slack moderation bot.

## Toxic ego vs impostor syndrome

Paradoxically, **oversized ego** and **impostor syndrome** often stem from the same root: fear of losing legitimacy. The first compensates with over-confidence, the second with self-devaluation. Both undermine collaboration:

* Ego prevents acknowledging mistakes, impostor syndrome prevents valuing successes.
* Poorly formulated feedback can reinforce defensive ego OR anxious impostor. Hence the importance of **Nonviolent Communication (NVC)** techniques in engineering.

## Checklist for your next sprint retro

1. Is speaking time equitably distributed?
2. Have we publicly acknowledged a failure and lessons learned?
3. Are there domains where a single person holds 80% of the knowledge? Action plan?

## Conclusion

Ego isn't always negative: it can motivate self-improvement. But when it takes precedence over the **common goal**, it sabotages collaboration and stifles innovation. By cultivating psychological safety, collective ownership, and metrics aligned with team success, organizations transform this ego into creative energy rather than a brake.

> **Immediate action**: remove an individual metric that feeds ego and replace it with a collaboration indicator before the next quarter.