import { createFileRoute } from "@tanstack/react-router";
import { IzuLayout } from "@/components/IzuLayout";
import storyArtisans from "@/assets/story-artisans.jpg";
import storyQuiet from "@/assets/story-quiet-intention.jpg";
import storyHands from "@/assets/story-careful-hands.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — IZU Paros · Twenty Years of Quiet Intention" },
      { name: "description", content: "IZU was born on Paros. For over two decades we have bridged the Aegean and India, making heritage pieces by careful hands." },
      { property: "og:title", content: "Our Story — IZU Paros" },
      { property: "og:description", content: "Twenty years of quiet intention. A synthesis of two worlds — Paros and India." },
    ],
  }),
  component: OurStoryPage,
});

const css = `
.os-wrap{background:var(--white);color:var(--dk)}
.os-hero{padding:6rem 5% 4rem;text-align:center;background:linear-gradient(180deg,var(--cream),var(--white))}
.os-hero .label{font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1.4rem;display:block}
.os-hero h1{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.6rem,6vw,5rem);line-height:1.02;color:var(--dk);margin:0 auto;max-width:14ch}
.os-hero .est{margin-top:1.6rem;font-size:.6rem;letter-spacing:.32em;color:var(--lt);text-transform:uppercase}
.os-narrow{max-width:680px;margin:0 auto;padding:5rem 1.6rem;text-align:left}
.os-narrow .eyebrow{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1.4rem;display:block}
.os-narrow h2{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2rem,4vw,3.2rem);line-height:1.08;color:var(--dk);margin:0 0 2rem;text-align:left}
.os-narrow p{font-size:.95rem;line-height:1.95;color:var(--mid);margin:0 0 1.4rem;text-align:left;font-weight:300}
.os-pull{border-left:2px solid var(--brand);padding:1.2rem 1.6rem;margin:2.4rem 0;font-family:var(--serif);font-style:italic;font-size:1.25rem;line-height:1.55;color:var(--earth);font-weight:400}
.os-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:center;max-width:1280px;margin:0 auto;padding:5rem 5%}
.os-grid.reverse{grid-template-columns:.9fr 1.1fr}
.os-img{position:relative;overflow:hidden;background:var(--parch);aspect-ratio:4/5}
.os-img img{width:100%;height:100%;object-fit:cover}
.os-img.tall{aspect-ratio:3/4}
.os-text .eyebrow{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--terracotta);margin-bottom:1rem;display:block}
.os-text h3{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.8rem,3.6vw,2.8rem);line-height:1.08;margin:0 0 1.4rem;color:var(--dk)}
.os-text p{font-size:.92rem;line-height:1.9;color:var(--mid);margin:0 0 1.2rem;font-weight:300}
.os-text .btn-outline{margin-top:1rem}
.os-asym{display:grid;grid-template-columns:repeat(12,1fr);gap:1rem;max-width:1480px;margin:0 auto;padding:4rem 5%}
.os-asym .a1{grid-column:1/span 5;aspect-ratio:3/4}
.os-asym .a2{grid-column:6/span 4;aspect-ratio:1/1;align-self:end}
.os-asym .a3{grid-column:10/span 3;aspect-ratio:3/4}
.os-asym figure{margin:0;overflow:hidden;background:var(--parch)}
.os-asym img{width:100%;height:100%;object-fit:cover}
.os-band{background:var(--cream);padding:5rem 5%;text-align:center}
.os-band .nums{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;max-width:1100px;margin:0 auto}
.os-band .num{display:flex;flex-direction:column;gap:.5rem}
.os-band .num strong{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.4rem,5vw,3.8rem);color:var(--brand);line-height:1}
.os-band .num span{font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--mid)}
@media(max-width:900px){
  .os-grid,.os-grid.reverse{grid-template-columns:1fr;gap:1.8rem;padding:3rem 1.4rem}
  .os-asym .a1,.os-asym .a2,.os-asym .a3{grid-column:1/-1;aspect-ratio:4/3}
  .os-band .nums{grid-template-columns:repeat(2,1fr);gap:2.4rem}
}
`;

function OurStoryPage() {
  return (
    <IzuLayout>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="os-wrap">
        <header className="os-hero">
          <span className="label">Our Story · Established 2003</span>
          <h1>Twenty years of quiet intention.</h1>
          <div className="est">Paros · India · Worn Everywhere</div>
        </header>

        {/* Centered narrow column — Zimmermann style */}
        <section className="os-narrow">
          <span className="eyebrow">Our Story</span>
          <h2>Twenty years of quiet intention.</h2>
          <p>
            IZU was born on Paros — an island where beauty is not performed but simply lived. For over two decades, we have dressed women who move through the world with ease: women who know what they want, and wear it without effort.
          </p>
          <p>
            From our two boutiques in Paroikia and Naoussa, we have spent twenty years understanding what timeless truly means. Not a trend. Not a season. A feeling — of fabric that moves with you, of colour that belongs to the light, of a garment you reach for, again and again.
          </p>
          <blockquote className="os-pull">
            "IZU is not about dressing for the occasion. It is about knowing yourself well enough that the clothes simply follow."
          </blockquote>
          <p>
            We design for women who travel light. Women who pack one dress and make it work everywhere — from the market in the morning to dinner at dusk. Effortless is not accidental. It takes twenty years of listening.
          </p>
        </section>

        {/* Asymmetric editorial grid */}
        <section className="os-asym" aria-label="Atelier moments">
          <figure className="a1"><img src={storyQuiet} alt="Twenty years of quiet intention — IZU heritage" /></figure>
          <figure className="a2"><img src={storyHands} alt="Made with careful hands — atelier detail" /></figure>
          <figure className="a3"><img src={storyArtisans} alt="The IZU artisans, Paros and India" /></figure>
        </section>

        {/* Synthesis of Two Worlds — left image / right text */}
        <section className="os-grid">
          <div className="os-img tall"><img src={storyArtisans} alt="IZU artisans in India" /></div>
          <div className="os-text">
            <span className="eyebrow">Craft & Production</span>
            <h3>Made with careful hands.</h3>
            <p>
              For more than a decade, we have traveled to India to design and produce every IZU piece. Not remotely. Not through intermediaries. We go ourselves — to the workshops, to the fabric rooms, to the people who sew.
            </p>
            <p>
              These are long-standing relationships built on trust, transparency, and a shared belief that clothing should be made with dignity. We know who makes our pieces. We return to them every season.
            </p>
            <p>
              Every IZU garment begins as a sketch and ends as a collaboration. The design comes from Paros. The craft comes from India. The result belongs to both worlds.
            </p>
            <a href="/boutiques" className="btn-outline">Visit the Boutiques</a>
          </div>
        </section>

        {/* Right image / Left text */}
        <section className="os-grid reverse">
          <div className="os-text">
            <span className="eyebrow">A Synthesis of Two Worlds</span>
            <h3>Paros listens. India answers.</h3>
            <p>
              The Aegean teaches restraint — white walls, blue water, the discipline of light. Indian craft offers the opposite gift: depth of texture, generosity of colour, the patience of a thousand years of hand work.
            </p>
            <p>
              IZU lives in the conversation between the two. A Paros silhouette finished by an Indian hand. A linen dyed with a pigment older than the village it comes from. A kimono that can wear a beach in the morning and a candlelit dinner at night.
            </p>
            <p>
              We don't outsource the care. It's the only part we'll never compromise on.
            </p>
          </div>
          <div className="os-img tall"><img src={storyHands} alt="Hand-finished IZU detail" /></div>
        </section>

        <section className="os-band">
          <div className="nums">
            <div className="num"><strong>22+</strong><span>Years on Paros</span></div>
            <div className="num"><strong>2</strong><span>Heritage Boutiques</span></div>
            <div className="num"><strong>10+</strong><span>Years in India</span></div>
            <div className="num"><strong>1</strong><span>Family. One Promise.</span></div>
          </div>
        </section>
      </div>
    </IzuLayout>
  );
}
