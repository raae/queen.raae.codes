import { defineCollection, z } from 'astro:content';

const postsQueen = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.string().optional(),
    brands: z.string().optional(),
    projects: z.string().optional(),
    peeps: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

const postsOlavea = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.string().optional(),
    description: z.string().optional(),
  }),
});

const talks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.string().optional(),
    event: z.string().optional(),
    eventUrl: z.string().optional(),
    recording: z.string().optional(),
    form: z.object({
      title: z.string().optional(),
      key: z.string().optional(),
      cta: z.string().optional(),
      message: z.string().optional(),
    }).optional(),
  }),
});

const landing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    sections: z.array(z.any()).optional(),
  }),
});

const tags = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      label: z.string(),
      disclaimer: z.string().optional(),
    })
  ),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      url: z.string().optional(),
      post: z.string(),
      image: z.string().optional(),
      product: z.string().optional(),
      date: z.coerce.date().optional(),
    })
  ),
});

export const collections = {
  'posts-queen': postsQueen,
  'posts-olavea': postsOlavea,
  talks: talks,
  landing: landing,
  tags: tags,
  testimonials: testimonials,
};
