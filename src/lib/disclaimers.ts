import { getEntry } from "astro:content";

// Load disclaimers from brands.yml and return a Map of tag label -> disclaimer text
export async function getDisclaimers(): Promise<Map<string, string>> {
  const disclaimers = new Map<string, string>();

  try {
    const brands = await getEntry("tags", "brands");
    if (brands?.data) {
      for (const brand of brands.data) {
        if (brand.disclaimer) {
          disclaimers.set(brand.label, brand.disclaimer);
        }
      }
    }
  } catch (e) {
    // brands.yml may not exist, that's ok
  }

  return disclaimers;
}
