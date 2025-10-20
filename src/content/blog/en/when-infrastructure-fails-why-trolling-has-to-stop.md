---
title: "When Infrastructure Fails: Why the Trolling Has to Stop"
description: "It's always the same: when a provider runs into trouble, customers of the competitors troll instead of sending support. It's time we talked about it."
date: 2025-10-20
---

It's always the same: when a provider goes down or hits a rough patch, customers of other providers start trolling instead of sending any love. It's just utterly ridiculous.

AWS experiences an incident? GCP customers troll. OVH runs into problems? Scaleway and others take their shots. Some provider suffers an outage? Customers of the competitors—and even a few employees—show up with open criticism and barbed remarks.

Meanwhile, operations teams are sweating blood at 3 a.m. trying to bring the service back online.

Today I want to talk about this behavior I've been seeing for years in our industry, because honestly, it's time we cut this nonsense out.

## The Behavior I See (Far) Too Often

The playbook is always the same during an infrastructure incident:

1. A major provider announces an incident on its status page
2. The operations teams jump into action to diagnose and resolve it
3. Impacted customers start reporting issues (which is normal)
4. **Customers of the competitors show up to troll and criticize**

That last point is the problem. On Twitter, LinkedIn, Slack communities, or Discord, I see things like:
- "Over at [competitor] we never have this sort of problem"
- "That's why you shouldn't use [provider]"
- "Ha, and they claim to be the market leaders"
- Memes, mocking gifs, schadenfreude all over the place

Sometimes it's even employees of competitors disguising marketing as “technical advice.”

## Why Does This Behavior Exist?

I've thought about this a lot, and I see several psychological and social factors at play.

### Technological Tribalism

I see it everywhere in tech: Linux vs. Windows, Vim vs. Emacs, React vs. Vue... and of course AWS vs. GCP vs. Azure. We pick a side, and that side becomes part of our professional identity.

When “our” technical choice seems validated by problems at a competitor, it reinforces our decision. It's comforting. It's human.

But it's also toxic.

### Opportunistic Marketing

Some people (sometimes even staff) view incidents at competitors as free marketing opportunities. The underlying message becomes, “Switch to us, we're more reliable.”

The problem? It’s counterproductive. The next time **their** infrastructure stumbles (and it will), they become the target of the same attacks.

### A Lack of Technical Empathy

It feels like many of the people who troll have never run critical infrastructure at scale. They don't know what it's like to:
- Be woken up at 2 a.m. by a pager
- Diagnose a complex problem under pressure
- Communicate with thousands of angry customers
- Repair a system while trying not to make things worse

It's easy to criticize when you're not in the trenches.

### The Illusion of Invincibility

"It will never happen to us." That's what plenty of people think... right up until it does.

The perfect infrastructure doesn’t exist. Every major provider has had (and will have) incidents:
- AWS has suffered major outages in multiple regions
- GCP has lost data after a network incident
- Azure has experienced global disruptions
- OVH literally caught fire (and handled the incident admirably)
- Scaleway, DigitalOcean, Linode... they've all had rough patches

## Why I Think It's Toxic for the Entire Community

This isn't just about hurt feelings. I see concrete, harmful consequences.

### It Hurts Transparency

When teams know they'll be publicly trolled, they may be tempted to:
- Downplay incidents in their communications
- Delay announcements to “be sure”
- Be less transparent about root causes

The result? Less transparency, fewer detailed post-mortems, less collective learning.

### It Destroys Ops Community Solidarity

I'm convinced we're all in the same boat. Ops, SREs, DevOps, platform engineers... we all face the same challenges:
- Keeping complex systems running at scale
- Managing the pressure of high availability
- Balancing innovation with stability

When we troll one another, we tear down the solidarity that should hold us together.

### It Discourages Experience Sharing

The best post-mortems I've read come from companies unafraid to be transparent about their mistakes. If trolling becomes the norm, we'll see fewer:
- Detailed retrospectives
- Deep technical analyses
- Shared lessons learned

And the entire community becomes technically poorer.

### It Creates a Climate of Fear

For smaller teams or startups, watching how the “big guys” get treated can be terrifying. It can even scare them away from being transparent about their own incidents.

## An Important Nuance: Criticism Is Fine, Just Not During the Incident

I'm not saying we have to be blindly positive about every provider. You absolutely have the right to:
- Criticize a vendor's technical choices
- Share a negative experience
- Explain why you migrated to another provider
- Highlight recurring reliability issues

**But there is a time and a place for it. And it is NOT during an active incident.**

Put yourself in the shoes of an ops engineer in the middle of an incident. You're under pressure, exhausted, doing everything you can to restore service. Meanwhile, you see people on Twitter or LinkedIn making fun of you, posting memes, using your stress as a marketing pitch.

It's terrible. It's cruel.

Those teams are made up of human beings. People with families, people who sacrificed their night, already under massive pressure. Adding public mockery on top of that is just inhumane.

Want to criticize a provider? Fine. Do it:
- **After the incident**, when you can analyze the post-mortem with a cool head
- **Constructively**, explaining what you think went wrong
- **Without schadenfreude**, without the unhealthy joy of seeing someone else fail
- **At another time**, when you’re sharing your experience or reasoning for a migration

But during the incident? The bare minimum of decency is to stay quiet or send support.

## What We Should Do Instead

I have a few ideas on how we could react better when infrastructure incidents happen. Here's what I do (or try to do) personally.

### Send Support, Not Contempt

A simple supportive message can make a world of difference for a team in crisis:
- "Sending strength to the teams managing the incident"
- "We've been there—hang in there"
- "Thanks for being transparent in your communication"

These messages cost nothing, but they show we understand the reality of the job.

### Learn From the Incident

Instead of trolling, I'd rather:
- Read the incident communications carefully
- Analyze the technical causes
- Ask whether my own infrastructure is vulnerable to the same issue
- Share constructive insights

It's a chance for collective learning, not division.

### Stay Humble

I always remind myself:
- Any system can fail
- The complexity of modern infrastructure makes incidents inevitable
- We've all been (or will be) in that situation someday

A little humility never hurts.

### Defend Transparency

When a company publishes a solid, transparent post-mortem, I try to highlight it publicly:
- Thank them for being transparent
- Share the lessons learned
- Encourage others to do the same

That's how we build a culture of learning.

## My Call to Do Better

I'm not naive. I know trolling won't disappear overnight. But I believe we can each do our part.

The next time a provider experiences an incident, I invite you to:
- **Resist the urge to troll** — even if it's tempting, even if you dislike the company
- **Send a message of support** — to the teams handling the incident
- **Defend transparency** — thank them for clear communications
- **Learn something** — every incident holds a lesson for all of us

And if you're a customer impacted by the incident, yes, you're allowed to be frustrated. But even then, there's a difference between expressing frustration constructively and slipping into insults or contempt.

## To Wrap Up

Modern infrastructure is complex. Incidents are inevitable. What isn't inevitable is how we react to them.

We can choose trolling, tribalism, and toxicity. Or we can choose empathy, support, and collective learning.

I know which option I'm picking. What about you?

---

*The next time you see a major incident, ask yourself: what do you want to contribute to the community? Noise or support?*
