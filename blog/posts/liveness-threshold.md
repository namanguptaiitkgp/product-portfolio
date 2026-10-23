title: The threshold was never a model decision
date: 2026-10-23
summary: A liveness check has two ways to fail, and tuning for one makes the other worse. Picking where it sits is a product call about whose loss you are willing to absorb.

Every liveness check has two ways to fail. It can let a fraudster through, or it can turn away somebody real. You do not get to minimise both, and the dial between them is one number.

For a long time I watched that number get treated as a modelling question — something to be settled by whoever owned the classifier, reported as accuracy, and signed off once it looked good enough. It isn't. Accuracy is a property of the model. The threshold is a decision about which of your two failures you would rather have, and that is a question about the business, not the network.

## The two failures are not symmetric

A false negative — a spoof that clears — becomes a fraudulent account. It surfaces weeks later as loss provisioning, usually on someone else's P&L, and it comes with a regulator-shaped tail.

A false positive — a real customer rejected — is quieter and more expensive than it looks. That person already clicked the ad, already typed their details, already got far enough to be asked for a selfie. The acquisition cost is spent. They are standing in poor light holding a cheap phone, and the system tells them, without explanation, that they are not who they say they are. Most of them do not try again.

Those two costs land on different teams, over different timescales, and nobody owns both. That is precisely why the number drifts toward whoever shouts loudest.

## What changed how we ran it

Two things.

The first was keeping every attempt rather than reducing a session to a single pass or fail. Once retakes are recorded instead of discarded, a retake stops being friction and starts being evidence — you can see the person in bad light trying three times and succeeding, and you can tell that apart from a scripted replay. It also gave an auditor something to read, which turned out to matter as much as the modelling did.

The second was refusing to set one global threshold. Lenders do not share a loss appetite. A lender writing small-ticket unsecured loans and one onboarding capital-markets clients are not trying to buy the same thing, and a single number serves neither. Making the threshold configurable per client sounds like a cop-out — it is really an admission that the correct value is not a property of the model at all.

> The cleanest demo and the right setting are rarely the same number.

## Where this generalises

Any time a model gates a user journey, somebody is choosing a threshold, and the choice is usually invisible. Fraud scoring, document extraction confidence, content moderation, credit decisioning — all of them have a dial, and the dial is where the product decision actually lives.

If you own a product with a model inside it and you cannot say what your threshold is, who chose it, and what it costs you in each direction, then you do not own that part of the product yet. Someone else is making your tradeoff for you, in units they are not measuring.

---

*I work on identity and verification at Digio, where this stack runs at around 200,000 checks a day. If you are making this call for your own funnel and want a second opinion, [email me](mailto:hello@namanbuilds.com).*
