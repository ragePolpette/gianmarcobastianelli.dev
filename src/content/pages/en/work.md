---
title: Enterprise .NET
sephirah: tiferet
summary: multi-tenant ERP · SDI e-invoicing
lead: Multi-tenant management and accounting software for the Italian market, built on .NET and WCF. The kind of system where a rounding error is a bug report.
description: Enterprise .NET work on multi-tenant management and accounting software, with Italian e-invoicing (SDI) and compliant digital archiving.
---

## The domain

The work sits in a very Italian corner of software:

- **Electronic invoicing through SDI**, the national exchange system that Italian electronic invoices go through.
- **Conservazione a norma**: legally compliant long-term digital archiving of fiscal documents.
- **Billing integrations** built for specific customers on top of the platform.

It is regulated, full of edge cases and unforgiving about correctness. It taught me to read specifications carefully and to distrust anything that only works on the happy path.

## How I work there

I have a lot of technical autonomy and I contribute to architectural decisions. The platform is multi-tenant, so every change has to be safe for every customer at once.

## Where AI came in

This is also where [Exodia](../projects/exodia/) was born: an agent that takes a ticket all the way to a pull request, built around the constraints of a real enterprise codebase. It runs in production and I presented it at a company quarterly business review.

## Stack

C#, .NET, WCF, SQL Server.
