# Homepage Restructure Plan

**File:** `src/routes/index.tsx` (only file touched)

## 1. Reorder JSX sections
New order:
1. Value Bar & Hero (unchanged)
2. **Shop by Mood** — moved directly under Hero
3. **Story Snapshot** — NEW section
4. **The IZU Edit** — moved down
5. Bestsellers, IZU Muses, Journal CTA (unchanged)
6. Physical Boutiques / pre-footer (unchanged)

## 2. Add new "Story Snapshot" section
```tsx
<section className="izu-story-snap">
  <div className="izu-story-snap-img">
    <img src={storyFamily} alt="IZU heritage" loading="lazy" />
  </div>
  <div className="izu-story-snap-text">
    <span className="izu-eyebrow">Our Story</span>
    <p className="izu-story-snap-lead">
      Some things you only build slowly. From the Aegean light of Paros to the
      hand-looms of India, IZU has spent over two decades refining the discipline of craft.
    </p>
    <Link to="/our-story" className="btn-outline izu-btn-ghost-dark">
      Discover the 22-Year Journey →
    </Link>
  </div>
</section>
```
- Image: existing `src/assets/story-family-artisans.jpg` (already imported)
- Link target: `/our-story` (already exists)

## 3. Scoped CSS added to existing `pageStyles`
- 2-column grid on desktop (image | text), stacked on mobile
- Uses existing tokens only (`--cream`, `--serif`, `--ink`)
- No new fonts, colors, or spacing systems

## Guarantees
- No text changes anywhere else
- No image swaps anywhere else
- No font/color/spacing modifications
- No other files touched
- Pure structural refinement