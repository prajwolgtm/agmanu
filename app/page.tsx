"use client";

import { useMemo, useState } from "react";
import { categories, products, type ProductCategory } from "./products";

const company = {
  phonePrimary: "+977 9867756460",
  phoneOffice: "071-438662",
  phoneSales: "+977 9857028662",
  email: "info@agmanufacturing.com.np",
  address: "Tilottama–5, Manigram, Rupandehi, Nepal",
};

const productShowcase = [
  {
    name: "Turbo Power",
    detail: "Loaded-40 engine oil",
    image: "/products/loaded-40.png",
    tone: "orange",
  },
  {
    name: "Executive 4T",
    detail: "20W-50 motorcycle oil",
    image: "/products/executive-4t.png",
    tone: "blue",
  },
  {
    name: "ECO AW-68",
    detail: "Hydraulic oil",
    image: "/products/eco-aw68.png",
    tone: "red",
  },
  {
    name: "Ultra Gear Guard",
    detail: "EP-140 gear oil",
    image: "/products/gear-ep140.png",
    tone: "cyan",
  },
  {
    name: "RAD50T",
    detail: "Long-life coolant",
    image: "/products/coolant.png",
    tone: "green",
  },
];

const applications = [
  {
    number: "01",
    title: "Engines",
    copy: "Passenger cars, diesel fleets and heavy-duty engines.",
    categories: "CI-4 · CH-4 · CF · SL · SP",
  },
  {
    number: "02",
    title: "Two-wheelers",
    copy: "Purpose-built oils for motorcycles and scooters.",
    categories: "2T · 4T · 10W-30 · 20W-50",
  },
  {
    number: "03",
    title: "Transmission",
    copy: "Protection for gears, axles, ATF and agricultural drivetrains.",
    categories: "GL-1 to GL-5 · ATF · UTTO",
  },
  {
    number: "04",
    title: "Hydraulics",
    copy: "Reliable flow and wear protection for hard-working systems.",
    categories: "10W · ISO VG 46 · ISO VG 68",
  },
  {
    number: "05",
    title: "Industry",
    copy: "Specialized fluids for compressors, turbines and transformers.",
    categories: "ISO · IEC · Premium fluids",
  },
  {
    number: "06",
    title: "Grease & care",
    copy: "Multipurpose, lithium and cooling solutions across pack sizes.",
    categories: "NLGI 2 · EP · RTU · DOT",
  },
];

const compactNumber = new Intl.NumberFormat("en-IN");

function Arrow() {
  return null;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();

    return products.filter((product) => {
      const inCategory = activeCategory === "All" || product.category === activeCategory;
      const searchable = [
        product.name,
        product.category,
        product.sae,
        product.grade,
        product.type,
        ...Object.keys(product.packs),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return inCategory && (!term || searchable.includes(term));
    });
  }, [activeCategory, query]);

  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, 9);

  const chooseCategory = (category: "All" | ProductCategory) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  return (
    <main>
      <div className="topline">
        <div className="shell topline-inner">
          <span>ISO 9001:2015 certified company</span>
          <span className="topline-location">Manigram · Rupandehi · Nepal</span>
          <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
            Sales {company.phonePrimary} <Arrow />
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand-lockup" href="#home" aria-label="A.G. Manufacturing and Trading home">
            <img src="/ag-logo.png" alt="A.G. Manufacturing and Trading logo" />
            <span>
              <strong>A.G. Manufacturing</strong>
              <small>& Trading Pvt. Ltd.</small>
            </span>
          </a>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            <a href="#company" onClick={() => setMenuOpen(false)}>Company</a>
            <a href="#brands" onClick={() => setMenuOpen(false)}>Brands</a>
            <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#brochure" onClick={() => setMenuOpen(false)}>Brochure</a>
            <a href="#quality" onClick={() => setMenuOpen(false)}>Quality</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>

          <a className="header-cta" href="#dealer">
            Become a dealer <Arrow />
          </a>

          <button
            className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Automotive · Agriculture · Industry</div>
            <h1>Performance that keeps <em>Nepal moving.</em></h1>
            <p className="hero-lede">
              High-performance lubricants and greases manufactured in Nepal with modern German
              technology—engineered for our roads, climate and working conditions.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">
                Explore products <Arrow />
              </a>
              <a className="button button-ghost" href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
                Talk to sales <Arrow />
              </a>
            </div>
            <div className="hero-proof" aria-label="Product catalogue highlights">
              <div><strong>44</strong><span>Current variants</span></div>
              <div><strong>10</strong><span>Product categories</span></div>
              <div><strong>175 mL–200 L</strong><span>Pack range</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Loaded lubricant product range">
            <div className="hero-wordmark" aria-hidden="true">LOADED</div>
            <div className="hero-orbit orbit-one" aria-hidden="true" />
            <div className="hero-orbit orbit-two" aria-hidden="true" />
            <div className="hero-product hero-product-left">
              <img src="/products/executive-4t.png" alt="Loaded Executive 4T lubricant packaging" />
            </div>
            <div className="hero-product hero-product-main">
              <img src="/products/loaded-40.png" alt="Loaded Turbo Power engine oil packaging" />
            </div>
            <div className="hero-product hero-product-right">
              <img src="/products/eco-aw68.png" alt="Loaded ECO AW-68 hydraulic oil packaging" />
            </div>
            <div className="hero-label">
              <span>Flagship brand</span>
              <strong>LOADED</strong>
              <small>This is us.</small>
            </div>
            <div className="made-in-nepal">
              <span>Made in</span>
              <strong>Nepal</strong>
            </div>
          </div>
        </div>
        <div className="hero-bottomline">
          <div className="shell hero-bottomline-inner">
            <span>Modern German technology</span>
            <span>Manufactured in Nepal</span>
            <span>Built for demanding conditions</span>
            <span>Dealer network expanding nationwide</span>
          </div>
        </div>
      </section>

      <section className="section company-section" id="company">
        <div className="shell company-layout">
          <div className="section-kicker">
            <span>01</span>
            <p>About A.G.</p>
          </div>
          <div className="company-heading">
            <h2>Local manufacturing.<br /><em>World-class ambition.</em></h2>
          </div>
          <div className="company-copy">
            <p>
              A.G. Manufacturing and Trading Pvt. Ltd. is a Nepali lubricant manufacturer based in
              Tilottama–5, Manigram. We formulate automotive and industrial oils, grease and specialty
              fluids for the machines that move the country.
            </p>
            <p>
              Our focus is straightforward: reliable protection, consistent performance and products
              made for Nepal’s terrain, temperatures and real working environments.
            </p>
            <a className="text-link" href="#quality">How we build quality <Arrow /></a>
          </div>
        </div>
        <div className="shell feature-ledger">
          <div><span>01</span><strong>Made here</strong><p>Locally manufactured in Manigram, Nepal.</p></div>
          <div><span>02</span><strong>Made for here</strong><p>Formulations suited to Nepal’s operating conditions.</p></div>
          <div><span>03</span><strong>Made to perform</strong><p>Automotive, agricultural and industrial coverage.</p></div>
          <div><span>04</span><strong>Made to scale</strong><p>Retail packs through to 200-litre drums.</p></div>
        </div>
      </section>

      <section className="section brands-section" id="brands">
        <div className="shell section-heading-row">
          <div>
            <div className="eyebrow eyebrow-light"><span /> Our brands</div>
            <h2>One manufacturer.<br />Distinct performance brands.</h2>
          </div>
          <p>
            A focused brand portfolio for everyday mobility, commercial fleets and industrial machinery.
            More A.G. brands will join this portfolio over time.
          </p>
        </div>

        <div className="shell brand-cards">
          <article className="brand-card brand-loaded">
            <div className="brand-card-top">
              <span>Flagship lubricant brand</span>
              <small>01 / 02</small>
            </div>
            <div className="loaded-mark">
              <i aria-hidden="true">L.</i>
              <strong>LOADED</strong>
              <span>This is us.</span>
            </div>
            <p>
              A wide-ranging lubricant family spanning engine oils, gear oils, hydraulic fluids,
              greases, coolants and specialty products.
            </p>
            <a href="#products">Explore Loaded catalogue <Arrow /></a>
            <div className="brand-card-product" aria-hidden="true">
              <img src="/products/superia-15w40.png" alt="" />
            </div>
          </article>

          <article className="brand-card brand-aglube">
            <div className="brand-card-top">
              <span>A.G. lubricant brand</span>
              <small>02 / 02</small>
            </div>
            <div className="aglube-mark">
              <span>AG</span>
              <strong>LUBE</strong>
            </div>
            <p>
              The A.G. Lube line serves automotive and industrial lubrication needs, backed by the
              same local manufacturing focus.
            </p>
            <span className="brand-status">Portfolio expansion coming soon</span>
            <div className="brand-card-product" aria-hidden="true">
              <img src="/products/ag-hydra-aw46.png" alt="" />
            </div>
          </article>
        </div>
      </section>

      <section className="section applications-section">
        <div className="shell section-heading-row section-heading-dark">
          <div>
            <div className="eyebrow"><span /> Built around applications</div>
            <h2>Protection for every<br />working system.</h2>
          </div>
          <p>
            From the morning commute to the factory floor, the portfolio covers the essential systems
            that keep vehicles and machinery working.
          </p>
        </div>
        <div className="shell application-grid">
          {applications.map((application) => (
            <article className="application-card" key={application.number}>
              <span>{application.number}</span>
              <h3>{application.title}</h3>
              <p>{application.copy}</p>
              <small>{application.categories}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="product-showcase" aria-label="Representative product packaging">
        <div className="shell showcase-heading">
          <div>
            <span>Product range</span>
            <h2>Built to work. Packaged to move.</h2>
          </div>
          <p>Representative packaging from the brand archive. Current product names, labels and packs may vary.</p>
        </div>
        <div className="showcase-track">
          {productShowcase.map((product, index) => (
            <article className={`showcase-card tone-${product.tone}`} key={product.name}>
              <span className="showcase-index">0{index + 1}</span>
              <img src={product.image} alt={`${product.name} lubricant packaging`} />
              <div>
                <strong>{product.name}</strong>
                <span>{product.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brochure-section" id="brochure">
        <div className="shell brochure-layout">
          <div className="brochure-visual">
            <img
              className="brochure-cover"
              src="/brochures/loaded-catalogue-cover.png"
              alt="Cover of the LOADED lubricant product catalogue"
            />
            <span className="brochure-edition">Product catalogue · 2026</span>
          </div>
          <div className="brochure-content">
            <div className="eyebrow eyebrow-light"><span /> Technical brochure</div>
            <h2>Everything LOADED.<br />In one catalogue.</h2>
            <p>
              Review the complete lubricant range, pack sizes, applications and technical grade guide
              for automotive, agricultural and industrial use.
            </p>
            <div className="brochure-facts" aria-label="Catalogue highlights">
              <div><strong>44</strong><span>Product SKUs</span></div>
              <div><strong>10</strong><span>Core categories</span></div>
              <div><strong>175 mL–200 L</strong><span>Pack range</span></div>
            </div>
            <div className="brochure-actions">
              <a
                className="button button-yellow"
                href="/brochures/AG-Manufacturing-LOADED-Product-Catalogue.pdf"
                download
              >
                Download brochure
              </a>
              <a
                className="button button-outline-light"
                href="https://wa.me/9779867756460?text=Hello%20A.G.%20Manufacturing%2C%20I%20reviewed%20the%20LOADED%20product%20catalogue%20and%20would%20like%20product%20or%20dealership%20information."
                target="_blank"
                rel="noreferrer"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section catalogue-section" id="products">
        <div className="shell catalogue-heading">
          <div>
            <div className="eyebrow"><span /> Current catalogue</div>
            <h2>Find the right fluid.</h2>
          </div>
          <div className="catalogue-meta">
            <span>Price list effective</span>
            <strong>Shrawan 01, 2083</strong>
            <small>Prices may change without prior notice.</small>
          </div>
        </div>

        <div className="shell catalogue-controls">
          <label className="search-box">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAll(false);
              }}
              placeholder="Product, grade or pack size"
              aria-label="Search the product catalogue"
            />
            <i aria-hidden="true">⌕</i>
          </label>
          <div className="category-filters" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={activeCategory === category.name ? "is-active" : ""}
                aria-pressed={activeCategory === category.name}
                onClick={() => chooseCategory(category.name)}
              >
                {category.short}
              </button>
            ))}
          </div>
        </div>

        <div className="shell catalogue-result-bar">
          <span>
            Showing <strong>{filteredProducts.length}</strong> formulation{filteredProducts.length === 1 ? "" : "s"}
          </span>
          <span>Rates shown in NPR</span>
        </div>

        <div className="shell product-grid">
          {visibleProducts.map((product, index) => (
            <article className="catalogue-card" key={`${product.name}-${product.sae}-${product.grade}-${index}`}>
              <div className="catalogue-card-head">
                <span>{product.category}</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
              <h3>{product.name}</h3>
              <div className="spec-row">
                {product.sae && <span>{product.sae}</span>}
                {product.grade && <span>{product.grade}</span>}
                {product.type && <span>{product.type}</span>}
              </div>
              <p className="pack-summary">
                <strong>{Object.keys(product.packs).length}</strong> pack size{Object.keys(product.packs).length === 1 ? "" : "s"}
                <span>{Object.keys(product.packs).join(" · ")}</span>
              </p>
              <details>
                <summary>View sizes & prices <span aria-hidden="true">+</span></summary>
                <div className="price-list">
                  {Object.entries(product.packs).map(([pack, price]) => (
                    <div key={pack}>
                      <span>{pack}</span>
                      <strong>NPR {compactNumber.format(price)}</strong>
                    </div>
                  ))}
                </div>
              </details>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <strong>No matching product yet.</strong>
              <p>Try a broader product name, API grade or pack size.</p>
              <button type="button" onClick={() => { setQuery(""); chooseCategory("All"); }}>Clear filters</button>
            </div>
          )}
        </div>

        {filteredProducts.length > 9 && (
          <div className="shell catalogue-more">
            <button className="button button-dark" type="button" onClick={() => setShowAll((value) => !value)}>
              {showAll ? "Show fewer products" : `View all ${filteredProducts.length} products`} <Arrow />
            </button>
          </div>
        )}
      </section>

      <section className="section quality-section" id="quality">
        <div className="quality-pattern" aria-hidden="true">AG</div>
        <div className="shell quality-layout">
          <div className="quality-title">
            <div className="eyebrow eyebrow-light"><span /> Quality at every stage</div>
            <h2>Confidence,<br />sealed in every pack.</h2>
            <p>Quality you can trust. Performance you can feel.</p>
          </div>
          <div className="quality-system">
            <article>
              <span>01</span>
              <div><h3>Purpose-led formulation</h3><p>Grades chosen for automotive, agricultural and industrial operating demands.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>Controlled manufacturing</h3><p>Local production focused on repeatable quality and consistent performance.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>Practical pack range</h3><p>From workshop-ready small packs to drums for fleets and industry.</p></div>
            </article>
            <article>
              <span>04</span>
              <div><h3>Technical support</h3><p>Help for product selection, bulk requirements and dealer enquiries.</p></div>
            </article>
          </div>
          <div className="iso-seal">
            <small>Certified company</small>
            <strong>ISO</strong>
            <span>9001:2015</span>
            <i>Quality management</i>
          </div>
        </div>
      </section>

      <section className="dealer-section" id="dealer">
        <div className="shell dealer-card">
          <div className="dealer-copy">
            <div className="eyebrow eyebrow-light"><span /> Grow with A.G.</div>
            <h2>Build the next chapter of Nepal’s lubricant network.</h2>
            <p>
              We’re inviting distributors, workshops, retailers, fleet operators and industrial buyers
              to partner with us across Nepal.
            </p>
          </div>
          <div className="dealer-actions">
            <a
              className="button button-yellow"
              href="https://wa.me/9779867756460?text=Hello%20A.G.%20Manufacturing%2C%20I%20am%20interested%20in%20a%20dealership%20or%20bulk%20order."
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp <Arrow />
            </a>
            <a className="dealer-mail" href={`mailto:${company.email}?subject=Dealership%20Enquiry`}>
              {company.email} <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="shell contact-layout">
          <div className="contact-heading">
            <div className="eyebrow"><span /> Contact</div>
            <h2>Let’s talk about what keeps your machines moving.</h2>
          </div>
          <div className="contact-list">
            <a href={`tel:${company.phoneOffice.replace(/\s/g, "")}`}>
              <span>Office</span><strong>{company.phoneOffice}</strong><Arrow />
            </a>
            <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}>
              <span>Sales</span><strong>{company.phonePrimary}</strong><Arrow />
            </a>
            <a href={`tel:${company.phoneSales.replace(/\s/g, "")}`}>
              <span>Mobile</span><strong>{company.phoneSales}</strong><Arrow />
            </a>
            <a href={`mailto:${company.email}`}>
              <span>Email</span><strong>{company.email}</strong><Arrow />
            </a>
          </div>
          <div className="contact-office">
            <div>
              <span>Factory & office</span>
              <strong>{company.address}</strong>
            </div>
            <div>
              <span>Business hours</span>
              <strong>Sunday–Friday · 9:00 AM–5:00 PM</strong>
            </div>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=A.G.+Manufacturing+and+Trading+Pvt.+Ltd.+Tilottama+5+Manigram+Rupandehi+Nepal"
              target="_blank"
              rel="noreferrer"
            >
              Open in maps <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <a className="brand-lockup brand-lockup-footer" href="#home">
            <img src="/ag-logo.png" alt="A.G. Manufacturing and Trading" />
            <span><strong>A.G. Manufacturing</strong><small>& Trading Pvt. Ltd.</small></span>
          </a>
          <p>
            Premium lubricants, greases and specialty fluids manufactured in Nepal for automotive,
            agricultural and industrial performance.
          </p>
          <div className="footer-links">
            <a href="#company">Company</a>
            <a href="#brands">Brands</a>
            <a href="#products">Products</a>
            <a href="#brochure">Brochure</a>
            <a href="#quality">Quality</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 A.G. Manufacturing and Trading Pvt. Ltd.</span>
          <span>Manigram · Nepal</span>
          <a href="https://www.facebook.com/profile.php?id=61586257090204" target="_blank" rel="noreferrer">
            Facebook <Arrow />
          </a>
        </div>
      </footer>
    </main>
  );
}
