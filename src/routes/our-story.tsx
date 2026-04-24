import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";
import storyFamily from "@/assets/story-family-artisans.jpg";
import storyHands from "@/assets/story-detail-hands.jpg";
import storyFabric from "@/assets/story-fabric-stack.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — IZU Paros · Twenty Years of Quiet Intention" },
      { name: "description", content: "IZU was born on Paros. For over two decades we have bridged the Aegean and India, making heritage pieces by careful hands." },
      { property: "og:title", content: "Our Story — IZU Paros" },
      { property: "og:description", content: "Twenty years of quiet intention. A synthesis of two worlds — Paros and India." },
      { property: "og:image", content: storyFamily },
    ],
  }),
  component: OurStoryPage,
});

const css = `
.os-wrap{background:var(--white);color:var(--dk)}

/* CINEMATIC HERO IMAGE */
.os-cine{position:relative;width:100%;height:78vh;min-height:560px;max-height:820px;overflow:hidden;background:var(--dk)}
.os-cine img{width:100%;height:100%;object-fit:cover;object-position:center 35%;transform:scale(1.02);animation:osBreathe 18s ease-in-out infinite alternate}
@keyframes osBreathe{from{transform:scale(1.02)}to{transform:scale(1.08)}}
.os-cine:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(36,24,16,.18) 0%,rgba(36,24,16,.05) 30%,rgba(36,24,16,.55) 100%)}
.os-cine-cap{position:absolute;left:0;right:0;bottom:2.4rem;text-align:center;color:rgba(253,250,246,.62);font-family:var(--sans);font-size:.55rem;letter-spacing:.32em;text-transform:uppercase;z-index:3}
.os-cine-cap em{font-style:normal;color:var(--brand-lt);margin:0 .5rem}

/* INTRO TITLE — overlapping the image bottom for editorial feel */
.os-title-block{max-width:980px;margin:-110px auto 0;padding:3.4rem 2.4rem 0;position:relative;z-index:5;text-align:center;background:var(--white)}
.os-title-block .label{font-size:.6rem;letter-spacing:.34em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1.4rem;display:block}
.os-title-block h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.6rem,6vw,5.2rem);line-height:1;color:var(--dk);margin:0;letter-spacing:-.01em}
.os-title-block .est{margin-top:1.6rem;font-size:.58rem;letter-spacing:.32em;color:var(--lt);text-transform:uppercase}
.os-title-rule{width:42px;height:1px;background:var(--brand);margin:2.4rem auto 0}
@media(max-width:680px){.os-title-block{margin-top:-60px;padding:2rem 1.4rem 0}}

/* ZIMMERMANN-STYLE NARROW COLUMN */
.os-narrow{max-width:640px;margin:0 auto;padding:5rem 1.6rem 4rem;text-align:left}
.os-narrow .eyebrow{font-size:.58rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1.2rem;display:block}
.os-narrow h2{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.9rem,3.6vw,2.8rem);line-height:1.1;color:var(--dk);margin:0 0 2rem;text-align:left}
.os-narrow p{font-size:1rem;line-height:1.95;color:var(--mid);margin:0 0 1.5rem;text-align:left;font-weight:300;font-family:var(--serif)}
.os-narrow p.body-sans{font-family:var(--sans);font-size:.94rem;line-height:1.9}
.os-pull{border-left:2px solid var(--brand);padding:1.2rem 0 1.2rem 1.6rem;margin:2.6rem 0;font-family:var(--serif);font-style:italic;font-size:1.4rem;line-height:1.5;color:var(--earth);font-weight:400}
.os-pull cite{display:block;margin-top:.9rem;font-style:normal;font-family:var(--sans);font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--lt);font-weight:400}
.os-sign{display:flex;align-items:center;gap:1.2rem;margin-top:3rem;padding-top:2rem;border-top:.5px solid var(--parch)}
.os-sign-mark{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.8rem;color:var(--brand);line-height:1}
.os-sign-name{font-family:var(--sans);font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--mid);line-height:1.6}
.os-sign-name strong{display:block;color:var(--dk);font-weight:400;letter-spacing:.22em}

/* IMAGE + TEXT EDITORIAL ROW */
.os-feature{display:grid;grid-template-columns:1.05fr .95fr;gap:0;align-items:stretch;background:var(--cream)}
.os-feature.right{grid-template-columns:.95fr 1.05fr}
.os-feature.right .os-f-img{order:2}
.os-f-img{position:relative;min-height:560px;overflow:hidden}
.os-f-img img{width:100%;height:100%;object-fit:cover}
.os-f-img figcaption{position:absolute;bottom:1rem;left:1.4rem;right:1.4rem;color:rgba(253,250,246,.85);font-size:.52rem;letter-spacing:.28em;text-transform:uppercase;text-shadow:0 1px 6px rgba(0,0,0,.4)}
.os-f-text{padding:5rem 4rem;display:flex;flex-direction:column;justify-content:center;max-width:560px}
.os-f-text .eyebrow{font-size:.58rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1rem;display:block}
.os-f-text h3{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.9rem,3.4vw,2.8rem);line-height:1.08;margin:0 0 1.4rem;color:var(--dk)}
.os-f-text p{font-size:.94rem;line-height:1.9;color:var(--mid);margin:0 0 1.2rem;font-weight:300}
.os-f-text .btn-outline{margin-top:1.4rem;align-self:flex-start}

/* HERITAGE NUMBERS BAND */
.os-band{background:var(--dk);padding:5rem 5%;text-align:center;color:var(--white)}
.os-band .nums{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;max-width:1100px;margin:0 auto}
.os-band .num{display:flex;flex-direction:column;gap:.6rem;padding:1rem .5rem;border-right:.5px solid rgba(253,250,246,.12)}
.os-band .num:last-child{border-right:none}
.os-band .num strong{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.4rem,5vw,3.8rem);color:var(--brand-lt);line-height:1}
.os-band .num span{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(253,250,246,.55)}
.os-band-tag{font-family:var(--serif);font-style:italic;font-size:1.15rem;color:rgba(253,250,246,.65);max-width:560px;margin:3rem auto 0;line-height:1.6;font-weight:300}

/* CLOSING IMAGE GRID */
.os-close{display:grid;grid-template-columns:1fr 1fr;gap:0;background:var(--white)}
.os-close figure{margin:0;position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--parch)}
.os-close img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s}
.os-close figure:hover img{transform:scale(1.04)}

/* CTA BAND */
.os-cta{padding:5rem 5%;text-align:center;background:var(--cream)}
.os-cta h3{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.8rem,3.5vw,2.6rem);color:var(--dk);margin:0 0 1.8rem;line-height:1.15}
.os-cta-actions{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap}

@media(max-width:900px){
  .os-feature,.os-feature.right{grid-template-columns:1fr}
  .os-feature.right .os-f-img{order:0}
  .os-f-img{min-height:380px;aspect-ratio:4/3}
  .os-f-text{padding:2.6rem 1.6rem}
  .os-band .nums{grid-template-columns:repeat(2,1fr);gap:.5rem 1rem}
  .os-band .num{border-right:none;padding:1.4rem .5rem;border-bottom:.5px solid rgba(253,250,246,.12)}
  .os-band .num:nth-child(3),.os-band .num:nth-child(4){border-bottom:none}
  .os-close{grid-template-columns:1fr}
}
`;

function OurStoryPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="os-wrap">
        {/* Cinematic family hero — placeholder you'll replace */}
        <section className="os-cine" aria-label="The IZU family with our artisans">
          <img src={storyFamily} alt="The IZU family with our Indian artisans — placeholder, to be replaced with the real photo" />
          <div className="os-cine-cap">
            Placeholder <em>·</em> Replace with the photo of you, your mother &amp; the artisans
          </div>
        </section>

        {/* Title overlapping image */}
        <div className="os-title-block">
          <span className="label">Our Story · Established 2003</span>
          <h1>Twenty years of quiet intention.</h1>
          <div className="est">Paros · India · Worn Everywhere</div>
          <div className="os-title-rule" />
        </div>

        {/* Zimmermann-style centered narrow column */}
        <section className="os-narrow">
          <p>
            IZU was born on Paros — an island where beauty is not performed but simply lived. For over two decades, we have dressed women who move through the world with ease: women who know what they want, and wear it without effort.
          </p>
          <p>
            From our two boutiques in Paroikia and Naoussa, we have spent twenty years understanding what timeless truly means. Not a trend. Not a season. A feeling — of fabric that moves with you, of colour that belongs to the light, of a garment you reach for, again and again.
          </p>
          <blockquote className="os-pull">
            "IZU is not about dressing for the occasion. It is about knowing yourself well enough that the clothes simply follow."
            <cite>— A note from the atelier</cite>
          </blockquote>
          <p>
            We design for women who travel light. Women who pack one dress and make it work everywhere — from the market in the morning to dinner at dusk. Effortless is not accidental. It takes twenty years of listening.
          </p>

          <div className="os-sign">
            <div className="os-sign-mark">IZU</div>
            <div className="os-sign-name">
              <strong>The Family</strong>
              Mother &amp; Daughter · Parikia, Paros
            </div>
          </div>
        </section>

        {/* Editorial feature — Made with careful hands */}
        <section className="os-feature">
          <figure className="os-f-img">
            <img src={storyHands} alt="Hand-stitched detail in the Indian atelier" loading="lazy" />
            <figcaption>Atelier · Jaipur, India</figcaption>
          </figure>
          <div className="os-f-text">
            <span className="eyebrow">Craft &amp; Production</span>
            <h3>Made with careful hands.</h3>
            <p>
              For more than a decade, we have traveled to India to design and produce every IZU piece. Not remotely. Not through intermediaries. We go ourselves — to the workshops, to the fabric rooms, to the people who sew.
            </p>
            <p>
              These are long-standing relationships built on trust, transparency, and a shared belief that clothing should be made with dignity. We know who makes our pieces. We return to them every season.
            </p>
            <a href="/boutiques" className="btn-outline">Visit the Boutiques</a>
          </div>
        </section>

        {/* Editorial feature — Synthesis of two worlds */}
        <section className="os-feature right">
          <div className="os-f-text">
            <span className="eyebrow">A Synthesis of Two Worlds</span>
            <h3>Paros listens. India answers.</h3>
            <p>
              The Aegean teaches restraint — white walls, blue water, the discipline of light. Indian craft offers the opposite gift: depth of texture, generosity of colour, the patience of a thousand years of hand work.
            </p>
            <p>
              IZU lives in the conversation between the two. A Paros silhouette finished by an Indian hand. A linen dyed with a pigment older than the village it comes from.
            </p>
            <p style={{ fontStyle: "italic", color: "var(--earth)", fontFamily: "var(--serif)", fontSize: "1.05rem", marginTop: "1.4rem" }}>
              "We don't outsource the care. It's the only part we'll never compromise on."
            </p>
          </div>
          <figure className="os-f-img">
            <img src={storyFabric} alt="Stacks of natural-dyed linen — ochre, terracotta, cream" loading="lazy" />
            <figcaption>Pigments · Ochre, Terracotta, Cream</figcaption>
          </figure>
        </section>

        {/* Heritage numbers band */}
        <section className="os-band">
          <div className="nums">
            <div className="num"><strong>22+</strong><span>Years on Paros</span></div>
            <div className="num"><strong>2</strong><span>Heritage Boutiques</span></div>
            <div className="num"><strong>10+</strong><span>Years in India</span></div>
            <div className="num"><strong>1</strong><span>Family. One Promise.</span></div>
          </div>
          <p className="os-band-tag">"Two rooms, one island, twenty years. Some things you only build slowly."</p>
        </section>

        {/* CTA */}
        <section className="os-cta">
          <h3>Begin where the story is told.</h3>
          <div className="os-cta-actions">
            <a href="/shop" className="btn-brand">Shop the Collection</a>
            <a href="/boutiques" className="btn-outline">Visit the Boutiques</a>
          </div>
        </section>
      </div>
    </IzuLayout>
  );
}
