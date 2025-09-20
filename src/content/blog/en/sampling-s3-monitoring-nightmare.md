---
title: "Sampling and S3: The Nightmare of Modern Monitoring"
date: 2025-06-15
description: "Why sampling and S3 storage have become the worst enemies of effective monitoring, and how these practices compromise operational visibility."
tags: ["monitoring", "observability", "infrastructure", "devops", "s3", "sampling"]
lang: "en"
translationKey: "sampling-s3-monitoring-nightmare"
---

After years of working with monitoring and observability systems, I've seen the same mistakes repeated over and over. Two practices in particular make me cringe every time: data sampling and using S3 as the primary backend for monitoring. These approaches, often adopted to reduce costs, end up creating more problems than they solve.

## Sampling: when economy becomes blindness

Sampling, the practice of keeping only a sample of your metrics, logs, or traces, is often presented as THE miracle solution to reduce costs. But at what price?

### The granularity loss that kills

Imagine this situation: your application suffers micro-outages of 100ms every 5 minutes. With 10% sampling, you have a 90% chance of never seeing them. These transient events, critical for user experience, become invisible.

I've seen teams spend weeks searching for the cause of an intermittent problem, only to finally discover that the crucial information had been eliminated by sampling. A bug that occurs on 0.1% of requests? With aggressive sampling, you'll probably never see it.

### Alerting becomes a lottery

Sampling turns your alerting system into a game of chance. A short-duration error spike can go completely unnoticed if it falls in the non-sampled window. I've seen major incidents only detected after several hours, simply because the first manifestations of the problem had been "sampled out".

### Impossible debugging

When an incident occurs, you need all the data to reconstruct the chain of events. But with sampling, it's like trying to solve a puzzle with half the pieces missing. That trace that would have shown exactly where the problem started? Sorry, it wasn't kept.

## S3: the storage that wasn't made for this

S3 is fantastic for many things. Monitoring isn't one of them.

### Latency that makes everything unusable

S3 is optimized for durability and long-term storage, not for fast and frequent queries. Trying to make a complex query on logs stored in S3 is like trying to find a needle in a haystack... while wearing boxing gloves.

Queries that would take a few milliseconds in a specialized database can take several minutes with S3. In crisis situations, these minutes can make the difference between a minor incident and a catastrophe.

### Hidden operation costs

Ironically, using S3 to save money can end up costing more. Every PUT, every GET, every request is billed. With millions of small objects (logs, metrics), API costs explode rapidly. Add to that the egress costs when you need to analyze your data, and your "economical solution" becomes a financial sinkhole.

### Impossible real-time access

Monitoring is primarily about real-time. But S3 isn't designed for that. Eventual consistency, propagation delays, lack of native streaming... All obstacles that make S3 unsuitable for real-time dashboards or reactive alerts.

## Real-world consequences

The 2017 S3 outage remains etched in memory. For nearly 3 hours, major services like Quora, Coursera, Docker, and Medium lost all operational visibility. Their logs? Inaccessible. Their metrics? Unfindable. Teams were literally blind to their own systems.

This isn't an isolated case. How many incidents went unnoticed because of sampling? How many hours lost waiting for S3 to deign to respond to an urgent query?

## The solution: invest in the right tool

Monitoring isn't a place to save money. It's your nervous system, your eyes and ears in the production world. Using inappropriate solutions like aggressive sampling or S3 as the primary backend means accepting to navigate blind.

Solutions exist: specialized time-series databases, log systems with performant indexing, distributed architectures with replication... Yes, they cost more than S3. But the cost of an undetected or poorly diagnosed incident is infinitely higher.

## Conclusion

Sampling and S3 for monitoring are false good ideas. They promise savings but deliver operational blindness. In a world where availability and performance are critical, can we really afford to skimp on complete visibility?

Next time someone proposes to "reduce costs" with sampling or "simplify" with S3, ask yourself: how much will the next incident you don't see coming cost?