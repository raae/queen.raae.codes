import { defineCollection, z } from 'astro:content';

// Schema for tags - extracted from comma-separated string
const tagSchema = z.object({
  label: z.string(),
  slug: z.string(),
});

// Posts collection (combines posts-queen and posts-olavea)
const postsQueen = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    emojii: z.string().optional(),
    tags: z.string().optional(), // Comma-separated string in frontmatter
    brands: z.string().optional(),
    peeps: z.string().optional(),
    projects: z.string().optional(),
  }),
});

const postsOlavea = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    emojii: z.string().optional(),
    tags: z.string().optional(),
    brands: z.string().optional(),
    peeps: z.string().optional(),
    projects: z.string().optional(),
  }),
});

// Landing pages collection
const landing = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    badge: z.string().optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    tagline: z.string().optional(),
    imageAlt: z.string().optional(),
    image: image().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      imageAlt: z.string().optional(),
      image: image().optional(),
    }).optional(),
    cta: z.object({
      href: z.string().optional(),
      label: z.string().optional(),
      noteTitle: z.string().optional(),
      note: z.string().optional(),
    }).optional(),
    ctas: z.array(z.object({
      to: z.string().optional(),
      label: z.string().optional(),
    })).optional(),
    webinar: z.object({
      date: z.any().optional(),
      url: z.string().optional(),
    }).optional(),
    form: z.object({
      cta: z.string().optional(),
      key: z.string().optional(),
      message: z.string().optional(),
      tagline: z.string().optional(),
    }).optional(),
    join: z.object({
      start: z.union([z.string(), z.date()]).optional(),
      end: z.union([z.string(), z.date()]).optional(),
      deadline: z.union([z.string(), z.number()]).optional(),
      paymentLink: z.string().optional(),
      price: z.string().optional(),
      status: z.string().optional(),
    }).optional(),
    sections: z.array(z.object({
      element: z.string().optional(),
      badge: z.string().optional(),
      title: z.string().optional(),
      titlePath: z.string().optional(),
      lead: z.string().optional(),
      tagline: z.string().optional(),
      content: z.string().optional(),
      imageAlt: z.string().optional(),
      image: image().optional(),
      body: z.string().optional(), // Path to body markdown file
      testimonials: z.array(z.string()).optional(), // Paths to testimonial files
    })).optional(),
  }),
});

// Talks collection
const talks = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    badge: z.string().optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    event: z.string().optional(),
    eventUrl: z.string().optional(),
    recording: z.string().optional(),
    imageAlt: z.string().optional(),
    image: image().optional(),
    archive: z.object({
      title: z.string().optional(),
      more: z.string().optional(),
      moreHref: z.string().optional(),
    }).optional(),
    teaser: z.object({
      badge: z.string().optional(),
      title: z.string().optional(),
      recording: z.string().optional(),
      note: z.string().optional(),
    }).optional(),
    cta: z.object({
      label: z.string().optional(),
      href: z.string().optional(),
      noteTitle: z.string().optional(),
      note: z.string().optional(),
    }).optional(),
  }),
});

// Tags collection (YAML files) - array of tag objects
const tags = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    label: z.string(),
    disclaimer: z.string().optional(),
  })),
});

// Testimonials collection (YAML files)
const testimonials = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    url: z.string().optional(),
    post: z.string().optional(),
    image: z.string().optional(),
    product: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
  })),
});

export const collections = {
  'posts-queen': postsQueen,
  'posts-olavea': postsOlavea,
  'landing': landing,
  'talks': talks,
  'tags': tags,
  'testimonials': testimonials,
};
