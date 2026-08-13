---
title: "We spent ten years burying the 10x engineer myth. AI is digging it back up."
date: 2026-08-13
tag: "AI"
description: "A widely shared article predicts AI will wipe out the \"middle class\" of software engineering. The diagnosis is right. The conclusion resurrects a myth we spent a decade dismantling — and that's where it gets dangerous."
lang: en
translationKey: 10x-engineer-myth-ai
---

There's an article making the rounds right now: [*AI is removing the middle class of software engineering*](https://blog.florianherrengt.com/ai-removing-middle-class-software-engineering.html) by Florian Herrengt. His thesis: AI is polarizing the profession. Excellent engineers — the ones who know how to validate, frame, and direct the work of agents — become far more valuable. Mediocre ones become unemployable. And in between, the "middle class" of software engineering disappears.

I nodded along for three quarters of the article. The diagnosis is accurate; I live it every day. Then I got to the conclusion, and something bothered me.

Not because it's wrong. Because I've heard it before. It's the 10x engineer myth coming back through the back door — the one we spent ten years dismantling.

## He's right about the diagnosis

Let's be clear: on the facts, I agree with almost everything.

AI has removed the profession's natural guardrails. Before, the speed at which a team could produce code was bounded by humans typing, reading, and understanding. Today, an agent generates thousands of lines in an afternoon, and nothing forces you to understand them before merging. Debt piles up faster than it can be repaid, and knowledge of the system evaporates: we ask the AI *why* this code exists instead of knowing it ourselves.

I'm not speaking in theory. I've [told the story here](/en/blog/i-pit-two-ais-against-each-other-in-code-review) of how I merged an AI-generated PR — tests green, lint clean — that returned data from the wrong tenant. That day, I understood exactly what Herrengt describes: blind trust is invisible in the moment. You pay for it later.

And the numbers back him up, even if they move as quickly as the tools do. The [2024 DORA report](https://dora.dev/research/2024/dora-report/) measured that increased AI adoption came with a *decrease* in delivery stability. A [METR study conducted in early 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) even found that sixteen experienced developers working on their own repositories took 19% longer with AI — while believing they were 20% faster. A [follow-up published in February 2026](https://metr.org/blog/2026-02-24-uplift-update/) instead suggests a speedup with late-2025 tools, but METR considers the data too biased to measure it reliably. The number changed; the gap between perceived and measured productivity remains a useful warning. The problem is real.

## The return of the hero

Where I get off the train is the economic conclusion: extreme segmentation, where an elite of exceptional engineers captures all the value while everyone else becomes unemployable.

That narrative has a name, and it predates AI. The "10x engineer" comes from a [1968 study](https://leanpub.com/leprechauns) run on twelve developers, under questionable experimental conditions, whose conclusions were extrapolated far beyond what the data allowed — Laurent Bossavit documented the full genealogy of that number in *The Leprechauns of Software Engineering*. The myth survived because it flatters: everyone assumes they're on the right side of the ratio.

I [wrote a year ago about ego in engineering teams](/en/blog/understanding-managing-ego-engineering-teams), and about what hero culture actually costs: information hoarding, defensive code reviews, critical bus factors, post-mortems that hunt for a culprit instead of a cause. Google's research on [Project Aristotle](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness) reached a less spectacular and more useful conclusion: among the five dynamics identified in the Google teams it studied, psychological safety came first. Individual talent alone did not explain collective effectiveness. We had come around to admitting it.

And now AI is giving the myth a second life. The reasoning sounds airtight: if a single engineer can pilot a fleet of agents, then only the best pilots matter. Hire stars, pay stars, everyone else is replaceable.

Except that reasoning rests on an attribution error.

## An excellent engineer isn't enough. You need a system.

Herrengt's diagnosis describes concrete failures: a 25,000-line PR that someone agrees to review, an abstraction nobody questions, a decision its author can no longer explain. His answer rests on individual judgment: someone has to understand what is happening and reject bad changes. On that point, he is right.

But that judgment only becomes useful at team scale when it turns into practices: requiring a plan before letting AI touch the code, getting a second pair of eyes on every change, refusing to merge until the tests pass, documenting the *why* behind decisions. These aren't gifts reserved for a select few. They are, for the most part, practices that can be learned, shared, and improved.

That's exactly what I built in [my Claude Code + Codex workflow](/en/blog/i-pit-two-ais-against-each-other-in-code-review): a `CLAUDE.md` that encodes my requirements, a mandatory plan before every task, two AIs reviewing each other's work, non-negotiable tests and lint. None of this replaces judgment or experience. But it keeps them from remaining locked in one person's head. I can hand my `CLAUDE.md` to anyone on the team tomorrow morning.

The difference between the developer drowning under generated code and the one staying on top of it therefore isn't only the judgment of the person at the keyboard. It is also the guardrails the team has built around them. Individual judgment matters. But an organization cannot preserve or pass it on until it turns that judgment into collective practices.

## Knowledge doesn't have to evaporate

The same applies to the loss of institutional knowledge. Herrengt writes that "at some point, someone still has to know what is going on", and that this person becomes the most valuable one on the team. He is right: judgment cannot be outsourced. But the conclusion that follows isn't "we need heroes who know everything" — it is "we need to stop storing critical knowledge in individual heads".

That's the whole bet we made at Formance when we [put our AI agents in Slack](/en/blog/why-our-ai-agents-live-in-slack) instead of private browser tabs: when a question and its answer live in a public channel, ten people learn in passing. Knowledge becomes a shared asset instead of a lost conversation history. And when I ask Claude Code to write PR descriptions that explain the *why* — mini-ADRs instead of "fix pagination" — it's the same logic: knowledge leaves my head and enters the system.

The hero who knows everything is a single point of failure. We've spent years eliminating SPOFs from our infrastructure; it would be a shame to reinstall them in our org charts.

## The real danger: believing the prophecy

Here's why that conclusion bothers me so much: it's a self-fulfilling prophecy.

A company that buys the return-of-the-10x-engineer narrative will make very concrete choices. Hire "the best" at premium prices and neglect everyone else's growth. Tolerate its stars' toxic behavior because "they ship". Reward visible individual exploits over the invisible work that makes the team better. In other words: methodically destroy psychological safety and collective learning.

And this is where the irony turns cruel. Because absorbing AI into a team is precisely collective work: sharing the prompts that work, building the guardrails together, helping each other learn new tools, daring to say "I don't understand what this agent generated" without fearing you'll be seen as mediocre. A hero culture makes that sentence unspeakable. The result: everyone silently merges code nobody understands — exactly the disaster scenario Herrengt describes. The prophecy comes true, not because it was right, but because people believed it.

## Let's be honest

Does this mean everyone will make it? No. And I won't pretend otherwise.

I don't know whether the "middle class" of developers will disappear in the economic sense Herrengt describes. But a way of working based on executing tickets without understanding the system is clearly becoming more fragile. AI raises the bar for judgment and verification. If your way of working is to accept its suggestions without reading them, no guardrail will save you — and that is neither Herrengt's fault nor the AI's.

And the systems I'm talking about don't build themselves. Someone has to create them, maintain them, and defend them when delivery pressure pushes everyone to take shortcuts. It is a real investment, not a magic trick.

But that is precisely the good news: a team can decide to make that investment. It will not erase differences in experience or judgment; it will keep them from becoming a single point of failure.

## Where to start

If you're a developer and Herrengt's article hit you in the gut, don't focus only on "becoming excellent". Start putting the practices in place. A ten-line `CLAUDE.md`. A plan required before every task. A second pair of eyes — AI or human — on everything you merge. You can start improving your work within weeks, without waiting for years of additional experience.

If you're a lead, ask yourself one question: if your best engineer left tomorrow, what would remain of their excellence? If the answer is "nothing", you don't have an excellent engineer. You have a hero — and a risk. Your job is to turn what they do best into practices the whole team applies: that's exactly what the AI era rewards.

---

*The 10x engineer myth reduces excellence to exceptional individuals. In a durable team, excellence also depends on systems — feedback loops, guardrails, shared knowledge. AI did not change that. It simply increased the cost of ignoring it.*
