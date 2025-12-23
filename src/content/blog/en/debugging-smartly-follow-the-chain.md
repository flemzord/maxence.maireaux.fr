---
title: "Debugging Smartly: Follow the Chain"
description: "Too many engineers jump straight into the code when something breaks. The right approach? Start from the outside — traces, logs, metrics — and work your way methodically toward the core of the system."
date: 2025-12-23
tag: "Engineering"
lang: en
translationKey: debugging-follow-the-chain
---

I've seen too many engineers waste hours (or even days) on bugs they could have solved in 20 minutes. Their mistake? Jumping straight into the code, setting random breakpoints, sprinkling `console.log` everywhere, and hoping to stumble upon the problem.

Spoiler: it doesn't work. Or rather, it sometimes works, but it's inefficient and frustrating.

Today, I want to share an approach that has saved me countless hours: **following the chain, from the outside in**.

## The Natural Reflex (And Why It's Wrong)

When something breaks, most developers instinctively:
1. Open their IDE
2. Look for the file that "must" contain the bug
3. Read the code
4. Add logs or breakpoints
5. Restart
6. Repeat until found (or give up)

The problem with this approach? You're starting from assumptions. You *think* you know where the problem is. And most of the time, you're wrong.

Result: you spend hours debugging the wrong place.

## The Reverse Approach: Outside In

The idea is simple: before touching any code, analyze what's happening **from the outside in**. Start with what's farthest from the core of your system and work your way back.

Concretely, this means:

1. **Observed symptoms** (what the user sees)
2. **Distributed traces** (the request's journey)
3. **Logs** (what each service did)
4. **Metrics** (the system's state)
5. **Code** (finally, if necessary)

This approach has a huge advantage: each step **narrows the scope** of your investigation. You're no longer looking for a needle in a haystack — you know exactly where to look.

## Step 1: Symptoms

It seems obvious, but I still see people debugging without having clearly defined the problem.

Before anything else, ask yourself:
- **What's the observed behavior?** (500 error, timeout, wrong data...)
- **What's the expected behavior?**
- **Is it reproducible?** How? With what parameters?
- **When did this start?** (crucial clue for identifying a deployment or change)
- **Who's affected?** One user? All? A subset?

If you can't clearly answer these questions, you're not ready to debug. You'll go in circles.

## Step 2: Distributed Traces

If your system uses distributed tracing (Jaeger, Zipkin, Tempo, Datadog APM...), this is your best weapon.

A trace shows you **exactly the journey of a request** through all your services. You can see:
- Which services the request passed through
- How long each step took
- Where it failed (if there's an error)
- The metadata associated with each span

It's incredibly powerful. In seconds, you can identify:
- The faulty service
- The exact operation that failed
- The context (correlation IDs, parameters...)

I've solved production bugs in under 5 minutes thanks to traces, where without them I would have spent hours guessing.

### If You Don't Have Tracing

Now's the time to set it up. Seriously. The initial investment pays off quickly.

In the meantime, you can fall back on correlation IDs in your logs (if you have them), or manually reconstruct the journey — but it's tedious.

## Step 3: Logs

Logs are the daily bread of debugging. But you need to know how to use them correctly.

### Filter Effectively

Don't read all the logs in your stack. It's a monumental waste of time. Use your search tools:
- Filter by **timestamp** (around the time of the incident)
- Filter by **trace ID** or **request ID** (if you have them)
- Filter by **level** (ERROR, WARN first)
- Filter by **service** (the one identified by tracing, or by deduction)

### Read in the Right Order

Logs should be read **chronologically**. You want to understand what happened *before* the error, not just the error itself.

Often, the real problem is a few lines above: a refused connection, a timeout, an unexpected value...

### Watch for Missing Logs

Sometimes, the absence of a log is more telling than the logs themselves. If you expect to see a log and it's not there, it means:
- The code wasn't executed (condition not met, error before)
- The service didn't receive the request
- There's a log configuration issue

## Step 4: Metrics

Metrics give you an overview of your system's state. They answer different questions than logs:
- **Is the system under load?** (CPU, memory, connections)
- **Are there anomalies?** (latency spikes, error rates)
- **When did the problem start?** (correlation with a deployment, traffic spike)

### Key Metrics to Monitor

- **Rate**: requests per second
- **Errors**: error rate
- **Duration**: latency (p50, p95, p99)
- **Saturation**: resources used vs available

This is the famous RED/USE framework. If you don't know it, I recommend looking it up.

### Correlate Metrics with Events

Overlay your metrics with deployments, config changes, external incidents... Often, the culprit becomes obvious: "Look, the error rate exploded exactly 5 minutes after the 2:32 PM deploy."

## Step 5: Code (Finally)

It's only after doing all of this that you should open your IDE.

At this point, you normally have:
- Identified the faulty service
- Identified the exact operation
- Understood the context (parameters, system state)
- Hypotheses based on data

Now, you can read the code with a precise objective. You're looking for something specific, not "the bug somewhere in 100k lines."

### Validate Your Hypotheses

The code lets you validate (or invalidate) your hypotheses. If the logs tell you "null value received," the code tells you *why* that value can be null and *what happens* when it is.

### Don't Get Lost

It's tempting to "refactor while you're at it" or "fix another thing you noticed." Resist. You're there to solve a specific problem. Note other stuff for later.

## A Concrete Example

Situation: a customer reports that some of their requests fail with a 500 error.

**Step 1 — Symptoms:**
- Intermittent 500 error
- Only on the `/api/orders` endpoint
- Since this morning
- Not all users, just certain accounts

**Step 2 — Traces:**
I grab a trace ID from the customer's logs. The trace shows me:
- API Gateway → Order Service → Inventory Service ❌
- The Inventory Service returns an error after 30 seconds (timeout)

**Step 3 — Logs:**
I filter the Inventory Service logs around the time of the error:
```
ERROR: Connection refused to database replica-2
WARN: Falling back to primary database
ERROR: Query timeout after 30000ms
```

**Step 4 — Metrics:**
I look at the Inventory Service metrics:
- CPU normal
- Memory normal
- But DB connections saturated since 8 AM this morning
- Coincides with a deployment at 7:55 AM

**Conclusion:**
The 7:55 AM deployment introduced a bug that doesn't properly close DB connections in certain cases. The pool gets saturated, new requests timeout.

**Total time: 15 minutes.** Without this methodical approach, I probably would have spent hours reading code randomly.

## Classic Mistakes to Avoid

### Jumping Straight to Code

This is THE biggest mistake. You waste massive time searching in the wrong place.

### Ignoring Timing

"When did this start?" is a crucial question. Always correlate with deployments, config changes, load spikes...

### Relying on a Single Source

Traces without logs is incomplete. Logs without metrics is tunnel vision. Use everything you have.

### Not Reproducing Before Debugging

If you can't reproduce the problem, you can't validate your solution. Invest time to find a reproducible case.

### Fixing Without Understanding

"I added a try/catch and it works now." No. You hid the problem, not solved it. Understand the root cause.

## Conclusion

Debugging smartly is a skill that can be learned. And the key is methodology.

Start from the outside: symptoms, traces, logs, metrics. Each step narrows the scope. When you get to the code, you know exactly what you're looking for.

This approach has saved me hundreds of hours. It will do the same for you.

---

*Next time something breaks, resist the urge to open your IDE immediately. Take a breath, open your dashboards, and follow the chain.*
