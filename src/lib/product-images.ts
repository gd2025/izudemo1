// Maps image_url keys stored in the products table to bundled placeholder images.
// When real product photography is uploaded, image_url can simply hold the full URL
// and resolveProductImage will return it unchanged.
import catDresses from "@/assets/cat-dresses.jpg";
import catKimonos from "@/assets/cat-kimonos.jpg";
import catScarfs from "@/assets/cat-scarfs.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catTops from "@/assets/cat-tops.jpg";
import catSkirts from "@/assets/cat-skirts.jpg";
import catSets from "@/assets/cat-sets.jpg";
import catBottoms from "@/assets/cat-bottoms.jpg";

const PLACEHOLDERS: Record<string, string> = {
  "cat-dresses": catDresses,
  "cat-kimonos": catKimonos,
  "cat-scarfs": catScarfs,
  "cat-accessories": catAccessories,
  "cat-tops": catTops,
  "cat-skirts": catSkirts,
  "cat-sets": catSets,
  "cat-bottoms": catBottoms,
};

export function resolveProductImage(image_url: string | null | undefined, category?: string | null): string {
  if (!image_url) {
    const fallbackKey = category ? `cat-${category.toLowerCase()}` : "cat-dresses";
    return PLACEHOLDERS[fallbackKey] ?? catDresses;
  }
  if (image_url.startsWith("http") || image_url.startsWith("/")) return image_url;
  return PLACEHOLDERS[image_url] ?? catDresses;
}

export const CATEGORY_IMAGES: Record<string, string> = {
  Dresses: catDresses,
  Kimonos: catKimonos,
  Scarfs: catScarfs,
  Accessories: catAccessories,
  Tops: catTops,
  Skirts: catSkirts,
  Sets: catSets,
  Bottoms: catBottoms,
};

export const CATEGORIES = ["Dresses", "Kimonos", "Tops", "Bottoms", "Skirts", "Sets", "Scarfs", "Accessories"] as const;
