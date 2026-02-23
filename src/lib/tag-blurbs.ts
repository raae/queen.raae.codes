import { getEntry } from "astro:content";

export interface TagBlurb {
  description?: string;
  relationship?: string;
  url?: string;
  disclaimer?: string;
  showOnPosts?: boolean;
}

// Load tag blurbs from brands.yml and return a Map of tag label -> blurb object
export async function getTagBlurbs(): Promise<Map<string, TagBlurb>> {
  const blurbs = new Map<string, TagBlurb>();

  try {
    const brands = await getEntry("tags", "brands");
    if (brands?.data) {
      for (const brand of brands.data) {
        blurbs.set(brand.label, {
          description: brand.description,
          relationship: brand.relationship,
          url: brand.url,
          disclaimer: brand.disclaimer,
          showOnPosts: brand.showOnPosts,
        });
      }
    }
  } catch (e) {
    // brands.yml may not exist, that's ok
  }

  return blurbs;
}

// Backward compat: returns Map of label -> disclaimer string
export async function getDisclaimers(): Promise<Map<string, string>> {
  const blurbs = await getTagBlurbs();
  const disclaimers = new Map<string, string>();
  for (const [label, blurb] of blurbs) {
    if (blurb.disclaimer) {
      disclaimers.set(label, blurb.disclaimer);
    }
  }
  return disclaimers;
}
