---
title: UPDATE requires SELECT Row Level Security (RLS) permissions in Postgres/Supabase
tags: PostgreSQL, RLS, Auth, Authorization
brands: Outseta, Supabase
projects: Feedback Fort
---

When implementing Row Level Security (RLS) in PostgreSQL for [Feedback Fort](https://outseta-supabase-react-feedback-fort.netlify.app/) made with React + Supabase + [Outseta](https://outseta.com/?via=queen) edition, I spent way way way too long figuring out why soft deleting a vote by updating `deleted_at` kept stating:

> new row violates row-level security policy for table "vote"

😩😩😩

Let's hope this article saves you some time!

## My setup

I had configured two separate policies:

```sql
-- For viewing active votes
CREATE POLICY "Anyone can view active votes"
  ON vote FOR SELECT
  USING (deleted_at IS NULL);

-- For updating votes
CREATE POLICY "Users can update their votes"
  ON vote FOR UPDATE
  USING (auth.jwt() ->> 'sub' = outseta_person_uid)
  WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);
```

In my (still beginners) mental model of RLS, the `UPDATE` policy would only be used when updating the vote, and the `SELECT` policy would be used when selecting the vote.

## The issue

So I googled, and found some intersting new knowleged by reading the [PostgreSQL docs](https://www.postgresql.org/docs/current/sql-createpolicy.html).

> "Typically an `UPDATE` command also needs to read data from columns in the relation being updated (e.g., in a `WHERE` clause or a `RETURNING` clause, or in an expression on the right hand side of the `SET` clause). In this case, `SELECT` rights are also required on the relation being updated, and the appropriate `SELECT` or `ALL` policies will be applied in addition to the `UPDATE` policies."

Or in other words: **UPDATE operations implicitly require SELECT access to the rows being modified**

But the user did in fact have `SELECT` permissions on the vote as when initating the update, `deleted_at` value was NULL.

So why was the update failing?

😠😠😠

After much googling and head scratching, and testing it seems like **SELECT policies must be valid BOTH before AND after an UPDATE operation**.

I have not succeeded in finding any documentation on this, but numerous posts on Stack Overflow and Github issues seem to suggest this is the case.

But Claude gave me this explanation:

> PostgreSQL requires SELECT policies to be valid both before and after an UPDATE operation to maintain transactional consistency. This ensures you can always see the results of your own modifications and prevents situations where rows would 'disappear' mid-transaction.

I would love to get a more authoritative source on this, if you have one, please let me know (queen@raae.codes)!

## The Solution

The solution in my case was to change the SELECT policy to allow anyone to see active votes and all their votes regardless of status.

```sql
-- Modified SELECT policy to see your own votes regardless of deleted status
CREATE POLICY "Users can view their votes"
  ON vote FOR SELECT
  USING (deleted_at IS NULL OR auth.jwt() ->> 'sub' = outseta_person_uid);
```

This policy combines two visibility rules:

1. Anyone can see active votes (where `deleted_at IS NULL`)
2. Users can always see their votes (where `auth.jwt() ->> 'sub' = outseta_person_uid`), regardless of deletion status

The complete Feedback Fort code is available on [GitHub](https://github.com/outseta/outseta-supabase-react-feedback-fort).

## Key Takeaway

- RLS is easy to get started with, but also easy to mess up.
- Read the docs 🤪

But more to the point of this article, remember:

1. UPDATE operations first need to SELECT the rows they'll modify
2. After an UPDATE, you must still have SELECT access to the modified row
