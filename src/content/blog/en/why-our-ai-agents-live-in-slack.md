---
title: "Why our AI agents live in Slack (not in a browser tab)"
date: 2026-07-31
tag: "AI"
description: "How we deployed a team of AI agents directly in Slack at Formance — with NixOS for reproducibility, Hermes Agents for orchestration, and Silicon Valley characters to bring them to life."
lang: en
translationKey: agents-slack
---

A few months ago, I noticed something that bugged me. Everyone in the company was using AI. But everyone was using it alone. A ChatGPT tab here, a Claude there, each person with their own prompts, their own habits, their own discoveries. And zero collective capitalization. When someone found a great way to do something, it stayed buried in their conversation history. Lost to everyone else.

The worst part? It wasn't a tooling problem. The tools are excellent. It was a *location* problem. AI lived in browser tabs, isolated, while the actual work happened somewhere else: in Slack.

So we flipped it. Instead of asking people to go to the AI, we brought the AI to where people already work. And honestly, it changed everything.

## The browser tab problem

Think for two seconds about what happens when your AI lives in a separate tab.

First, there's the context-switching tax. You're in a Slack conversation, someone asks a question, you open another tab, you re-explain all the context to the AI, you copy the answer, you come back, you paste. Every single time. That's pure friction, and friction kills adoption.

Second, and this is the big one: everything that happens in a private tab is invisible to the rest of the team. Nobody learns from anybody's questions. Whereas in a Slack channel, when someone asks an agent a question and gets a good answer, ten people read it in passing. That's learning by osmosis. Knowledge becomes a shared asset instead of a private history.

And I'm not the only one seeing this. [Gartner predicts that 40% of enterprise apps will include task-specific AI agents by the end of 2026](https://slack.com/blog/news/slack-is-where-agents-work), up from less than 5% a year earlier. The underlying trend is exactly this: agents are leaving isolated tabs and joining the places where work is already coordinated.

But there's a third reason, and it's my favorite: **accessibility**. Not everyone in a company is going to install a CLI, configure API keys, or learn prompt engineering. But everyone knows how to mention someone in Slack. The day AI becomes as simple as an `@` in a channel, it's no longer reserved for developers. Sales, product, support — everyone gets access to the same level of tooling. That's what democratizing AI internally actually looks like. Not licenses and training sessions: an `@` in a channel.

## Our setup at Formance

Here's what we built, concretely.

**NixOS for the foundation.** If you read me regularly, you know I'm [a believer in Nix for reproducibility](/en/blog/why-adopt-nix-devshells-reproducible-environments). Our entire agent configuration is declarative and versioned in git. If the machine hosting them disappears tomorrow, we rebuild it identically in minutes. No "it worked before", no snowflake server patched together over SSH. The agents' infrastructure is treated as code, because that's what it is.

**Hermes Agents for orchestration.** It's an [open-source agent framework](https://hermes-agent.ai/) that we self-host. It handles persistent memory, skills, the Slack connection, and most importantly: it lets us run several distinct agents. Each agent has **its own workspace** — its memory, its tools, its isolated working context — but they all share **a global knowledge base**. Best of both worlds: the product agent doesn't drown in infrastructure runbooks, but everyone knows the company fundamentals.

This point deserves a pause. A single agent that does everything always ends the same way: a gigantic context, answers that are average everywhere and excellent nowhere. By separating workspaces, each agent stays sharp on its domain. And the shared base avoids repeating the same information ten times: who we are, what we're building, how we communicate, where things live.

## Roles, not tasks

This is the design choice I'm happiest with: our agents aren't dedicated to *tasks*, they're dedicated to *roles*.

The difference is huge. A task-agent is "the bot that summarizes meetings" or "the bot that triages tickets". Useful, but frozen. A role-agent is a scope of responsibility, just like for a human. The role is stable; the tasks evolve.

Two examples from our team:

**Monica, our product agent.** She's connected via [MCP](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026) to all our product tools. You can ask her where a feature stands, what customer feedback says about a topic, or to dig into a spec question. She doesn't do *one* product task; she covers the product *territory*.

**Gilfoyle, our SRE.** He lives in the infrastructure channels. He helps during incidents, keeps an eye on the overall health of the platform, and answers every infrastructure question — from "why is this pod crash-looping" to "how is our network architected". The kind of questions that used to systematically interrupt a human on the team.

MCP (Model Context Protocol) deserves a quick aside: it's the open standard that lets you plug an agent into any tool without building a custom integration every time. People often call it "the USB-C of AI", and since Anthropic [handed it over to the Linux Foundation in late 2025](https://www.dualmedia.fr/en/mcp-standard-2026-ia/), it's become a vendor-neutral standard backed by the whole ecosystem. What it means for us in practice: connecting Monica to a new product tool is configuration, not development.

## The detail that changes everything: they have a name and a face

Yes, our agents are called Monica and Gilfoyle. Yes, they're characters from *Silicon Valley*. And yes, each one has its own avatar on Slack.

It might sound like a gimmick. It absolutely isn't.

A bot called `product-assistant-bot` with a gray icon — nobody talks to it naturally. An agent called Gilfoyle, with Gilfoyle's face and — let's be honest — a bit of his sarcasm, people mention him the way they'd mention a colleague. Personality creates attachment, attachment creates usage, and usage creates value. It's that simple.

And there's a side effect I hadn't anticipated: the names structure the reflex. When you have an infrastructure question, you *know* it's for Gilfoyle. Product question? Monica. Nobody needed to read any documentation to understand who does what. The casting *is* the documentation.

## Let's be honest

This setup isn't magic, and there are traps.

**The agent sprawl risk.** It's the temptation to create an agent for anything and everything. Ten poorly defined agents are worse than one average agent: noise, confusion, overlapping scopes. We add an agent when a *role* justifies it, not when a task crosses our mind.

**Trust is earned.** An agent that gives a wrong answer twice in a row in a public channel — that's the whole team that stops talking to it. The first few weeks, we spent real time feeding the workspaces, correcting answers, adjusting the knowledge. An agent gets onboarded. Like a human.

**Guardrails are not optional.** An agent connected via MCP to your production tools requires actual thought. Who can ask it what, what can it do in write mode, what stays read-only. We started read-only almost everywhere, and we expand case by case.

## Where to start

If you want to try this, my advice: don't start with the tech, start with the role. Find *the* person on your team who gets interrupted ten times a day with the same questions. That's who your first agent should relieve.

Only then pick the tooling. A self-hosted open-source framework like Hermes Agents if you want full control, or a managed solution if you want speed. Plug it into a channel, give it a name, an avatar, a clear scope. And let the team make it theirs.

The hardest part isn't technical. The hardest part is thinking of your agents as colleagues you recruit, onboard, and grow — not as scripts you deploy.

---

*We didn't add AI to our stack. We hired a team that never sleeps — and their one-liners are better than ours.*
