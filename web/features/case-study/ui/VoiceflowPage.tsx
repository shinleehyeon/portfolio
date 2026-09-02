import "@/features/case-study/styles/index.css";

export function VoiceflowPage() {
  return (
    <>
      {/* Mobile Header */}
        <header className="mobile-header">
          <a href="/" className="mobile-logo cs-back-mobile reveal-load" data-reveal-delay="60"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="currentColor" /></svg> Back</a>
          <nav className="mobile-header__nav">
            <a href="#overview" className="mobile-header__link active reveal-load" data-reveal-delay="140" data-section="overview">Overview</a>
            <a href="#research" className="mobile-header__link reveal-load" data-reveal-delay="180" data-section="research">Research</a>
            <a href="#building-blocks" className="mobile-header__link reveal-load" data-reveal-delay="220" data-section="building-blocks">Blocks</a>
            <a href="#message" className="mobile-header__link reveal-load" data-reveal-delay="260" data-section="message">Message</a>
            <a href="#variables" className="mobile-header__link reveal-load" data-reveal-delay="300" data-section="variables">Variables</a>
            <a href="#model" className="mobile-header__link reveal-load" data-reveal-delay="340" data-section="model">Model</a>
            <a href="#outcome" className="mobile-header__link reveal-load" data-reveal-delay="380" data-section="outcome">Outcome</a>
          </nav>
          <button className="menu-toggle" aria-label="Menu" aria-expanded="false">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </header>

        {/* Mobile Menu */}
        <div className="mobile-menu" aria-hidden="true">
          <a href="/#hero" className="mobile-menu-link">Hero</a>
          <a href="/#about" className="mobile-menu-link">About</a>
          <a href="/#project" className="mobile-menu-link">Projects</a>
          <a href="/#experience" className="mobile-menu-link">Experience</a>
          <a href="/#highlights" className="mobile-menu-link">Highlights</a>
          <div className="mobile-menu-bottom">
            <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="mobile-menu-link">LinkedIn</a>
            <a href="#" className="mobile-menu-link" id="mobileMenuCopyEmail">Email</a>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar cs-sidebar reveal-load">
          <div className="sidebar-top">
            <a href="/" className="cs-back reveal-load" data-reveal-delay="60"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="currentColor" /></svg> Back</a>
            <nav className="sidebar-nav">
              <a href="#overview" className="nav-link active reveal-load" data-reveal-delay="140" data-section="overview">Overview</a>
              <a href="#research" className="nav-link reveal-load" data-reveal-delay="180" data-section="research">Research</a>
              <a href="#building-blocks" className="nav-link reveal-load" data-reveal-delay="220" data-section="building-blocks">Building blocks</a>
              <a href="#message" className="nav-link reveal-load" data-reveal-delay="260" data-section="message">Message</a>
              <a href="#voice" className="nav-link reveal-load" data-reveal-delay="300" data-section="voice">Voice effects</a>
              <a href="#variables" className="nav-link reveal-load" data-reveal-delay="340" data-section="variables">Variables</a>
              <a href="#actions" className="nav-link reveal-load" data-reveal-delay="380" data-section="actions">Actions</a>
              <a href="#input" className="nav-link reveal-load" data-reveal-delay="420" data-section="input">User input</a>
              <a href="#model" className="nav-link reveal-load" data-reveal-delay="460" data-section="model">Model</a>
              <a href="#outcome" className="nav-link reveal-load" data-reveal-delay="500" data-section="outcome">Outcome</a>
            </nav>
          </div>
          <div className="sidebar-bottom">
            <button className="cs-summarize__btn reveal-load" data-reveal-delay="540" id="summarizeBtn">
              <span className="cs-summarize__text">Summarize</span>
            </button>
          </div>
        </aside>

        {/* Summary panel (fixed overlay) */}
        <div className="cs-summarize__panel" id="summarizePanel">
          <div className="cs-summarize__panel-inner">
            <button className="cs-summarize__panel-close" id="summarizePanelClose">&times;</button>
            <p>Gregory joined Voiceflow to redesign the conversation builder — the core product — from the ground up. He rethought how conversations are structured (Turns, unified Messages, inline conditions), reduced canvas clutter, and built a scalable design system the team used for two years after he left.</p>
            <p>The work was research-driven: usability audits, session recordings, UEQ scores, and interviews shaped every decision. He borrowed patterns from tools designers already knew (Figma, Sketch) to flatten the learning curve.</p>
            <p>Results: 35% more daily active users, 3x more projects on the platform, 40% faster deploys, a new funding round closed, and enterprise clients onboarded. The redesign held up at scale without performance issues.</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="content">

          {/* Hero / Overview */}
          <section id="overview" className="section cs-hero">
            <div className="centered">
              <h1 className="cs-hero__title cs-hero__title--logo reveal-load" data-reveal-delay="100">
                <a href="https://www.voiceflow.com" target="_blank" rel="noopener" className="cs-hero__logo-link">
                  <img src="/images/vf/vf-logo.svg" alt="Voiceflow" className="cs-hero__logo" />
                </a>
                <span className="cs-hero__year-badge">2021 – 2022</span>
              </h1>

              <div className="cs-hero__intro reveal-load" data-reveal-delay="200">
                <p>Voiceflow is a platform for building AI agents: customer support bots, voice assistants, and multi-channel conversational experiences. In 2018 the company acquired Invocable, where I had designed the original UI. Three years later I came back to redesign it.</p>
              </div>

              <div className="cs-hero__contributions">
                <span className="cs-hero__tag reveal-load" data-reveal-delay="300" data-tip="Rebuilt the conversation builder from the ground up. New block system, unified message component, inline conditions, and reusable Components.">Full platform redesign</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="360" data-tip="Created an atomic design system with shared components and UI shortcuts. The team used it for two years of product growth after I left.">Scalable design system</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="420" data-tip="Ran interviews, usability tests, and session recordings. Found that most users also used Figma, so I borrowed patterns they already knew.">User research</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="480" data-tip="Restructured how conversations are built. Grouped separate steps into Turns, unified messages, and moved actions inline to cut canvas clutter.">Information architecture</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="540" data-tip="More team members started using the platform daily. The redesign also helped close a new funding round and bring in enterprise clients.">35% DAU increase</span>
              </div>
            </div>
          </section>

          {/* Hero image */}
          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-image__wrap reveal-load" data-reveal-delay="300">
                <img src="/images/vf/vf-main.png" alt="Voiceflow conversation builder overview" loading="lazy" />
              </div>
            </div>
          </section>

          {/* Focus */}
          <section className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Focus</h2>
              <div className="cs-body">
                <p>Voiceflow started as an Alexa skill builder. By 2021 the business had moved past that. The app needed to work for a wider range of use cases and customer types.</p>
                <p>I needed to rethink the underlying systems. Not just fix what was broken, but build something that could scale as the product grew.</p>
                <p>The core question: how do you let someone build a non-linear conversation using a mind-map interface?</p>
                <p>I focused on four things:</p>
              </div>
              <div className="cs-focus-list">
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Usability and accessibility</h3>
                  <p className="cs-focus-item__desc">Rebuild the UI to cut the number of actions needed to do anything. Bring the product and brand identity closer together.</p>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Learning and adoption</h3>
                  <p className="cs-focus-item__desc">Make onboarding teach best practices for building conversations. Document every feature. Push people toward shortcuts.</p>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Multiple user roles</h3>
                  <p className="cs-focus-item__desc">Designers, developers, and business owners all use the tool differently. The interface had to serve each role without drowning anyone in options.</p>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Error tolerance</h3>
                  <p className="cs-focus-item__desc">People build things we don't expect. The design had to handle any combination of features and make recovery easy when something breaks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Scope</h2>
              <div className="cs-body">
                <p>Most of the work went into rethinking features, improving usability, testing, and visual design. This case study covers only the conversation design tool — signup, dashboards, and other flows are left out.</p>
              </div>
              <div className="cs-focus-list cs-focus-list--outline" style={{marginTop: "24px"}}>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Observation</h3>
                  <ul className="cs-list">
                    <li>Watching user sessions</li>
                    <li>Working with support and backlog</li>
                    <li>Defining areas of improvement</li>
                    <li>Analyzing competitors</li>
                  </ul>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Hypothesis validation</h3>
                  <ul className="cs-list">
                    <li>User experience questionnaire</li>
                    <li>Tracking of product events</li>
                    <li>Customer development sessions</li>
                    <li>User segmentation</li>
                  </ul>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Analysis &amp; decomposition</h3>
                  <ul className="cs-list">
                    <li>Describing user flows</li>
                    <li>Converging UI and business metrics</li>
                    <li>Designing information architecture</li>
                    <li>Conducting usability audit</li>
                    <li>Prioritization and estimation</li>
                    <li>Scoping of the first versions</li>
                  </ul>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">Implementation</h3>
                  <ul className="cs-list">
                    <li>Building an atomic design system</li>
                    <li>Designing UI mechanics &amp; shortcuts</li>
                    <li>Migrating existing projects</li>
                    <li>Writing specifications</li>
                    <li>Mapping feature dependencies</li>
                    <li>Creating a rollout plan</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Product Research */}
          <section id="research" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Product research</h2>
              <div className="cs-body">
                <p>The team already had structured personas and a backlog of feedback when I joined. My first job was to define which usability metrics mattered most and connect them to business goals.</p>
                <span className="cs-label">Areas of improvement</span>
                <ul className="cs-list">
                  <li>Engagement and functionality</li>
                  <li>Ease of use and intuitiveness</li>
                  <li>Adoption</li>
                  <li>Aesthetics and accessibility</li>
                </ul>
                <span className="cs-label">For each area, I asked</span>
                <ul className="cs-list">
                  <li>What do customers and the business expect?</li>
                  <li>What's preventing that right now?</li>
                  <li>What could fix it?</li>
                </ul>
                <span className="cs-label">Measuring with</span>
                <ul className="cs-list">
                  <li>Engagement metrics: session length, session count, test runs</li>
                  <li>UEQ scores before and after the redesign</li>
                  <li>Support requests and qualitative feedback</li>
                </ul>
                <span className="cs-label">Methods</span>
                <ul className="cs-list">
                  <li>Team interviews</li>
                  <li>User interviews and usability testing</li>
                  <li>Usability audit</li>
                  <li>Session recordings and product analytics</li>
                  <li>Competitor analysis</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Research mind map */}
          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-diagram cs-tree" id="researchTree"></div>
            </div>
          </section>

          {/* User Research */}
          <section className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">User research</h2>
              <div className="cs-body">
                <p>The redesign had to work for designers, content managers, and engineers. I started with the people using the product.</p>
                <span className="cs-label">Qualitative</span>
                <p>Customer interviews, feedback sessions, and session recordings. I watched how people actually used the tool and where they got stuck.</p>
                <span className="cs-label">Quantitative</span>
                <p>UEQ surveys for usability scores, event tracking for feature adoption, quick surveys for sentiment.</p>
                <span className="cs-label">What I found</span>
                <p>Many conversation designers also used Figma, FigJam, and Sketch. I borrowed patterns they already knew: reusable styles, component-based structure, keyboard shortcuts.</p>
              </div>
            </div>
          </section>

          {/* Building Blocks */}
          <section id="building-blocks" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Rethinking conversation building blocks</h2>
              <div className="cs-body">
                <p>In Voiceflow, the basic unit is a block: a grouped list of steps the system runs in order.</p>
                <p>I grouped what used to be separate steps into Turns. A Turn is a template with configurable properties. The structure underneath stayed the same: blocks connected by transitions.</p>
              </div>
            </div>
          </section>

          {/* Building blocks diagram */}
          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-diagram cs-tree" id="blocksTree"></div>
            </div>
          </section>

          {/* Conversation structure gallery */}
          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/conversation-structure-01.png" alt="Conversation structure" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/conversation-structure-04.png" alt="Conversation structure" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/conversation-structure-02.png" alt="Conversation structure" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/conversation-structure-03.png" alt="Conversation structure" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/conversation-structure-05.png" alt="Conversation structure" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* Message */}
          <section id="message" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Message</h2>
              <div className="cs-body">
                <p>A Message is what the assistant sends to a user, either automatically or in response to input.</p>
                <p>Before the redesign, there was no single message entity. Text, image, and audio were separate steps. I unified them into one component, same as the Turn approach.</p>
              </div>
            </div>
          </section>

          {/* Message map diagram */}
          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-diagram cs-tree" id="messageTree"></div>
            </div>
          </section>

          {/* Attachments */}
          <section className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Attachments</h2>
              <div className="cs-body">
                <p>Once messages had a single structure, I added attachments: reusable content blocks that can be combined with any message. This was the first step toward a content management system.</p>
                <p>I also added video and document attachment types for text channels, since the product was scaling toward those formats.</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/attachment4.png" alt="Attachment types" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/attachment2.png" alt="Attachment types" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/attachment3.png" alt="Attachment types" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/attachment1.png" alt="Attachment types" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* Voice Effects */}
          <section id="voice" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Voice effects</h2>
              <div className="cs-body">
                <span className="cs-label">Challenge</span>
                <p>SSML effects were applied by typing raw tags into message inputs. Users had to memorize tag names and spell them right. Selecting accents and voice providers meant navigating a 3-level nested menu.</p>
                <span className="cs-label">Solution</span>
                <ul className="cs-list">
                  <li>Right-click menus, autocomplete, and text selection for applying effects</li>
                  <li>Simpler naming throughout</li>
                  <li>Clean display for applied tags, even with multiple effects stacked</li>
                  <li>Error prevention for conflicting effects</li>
                  <li>Flat list of accents and voice providers instead of nested menus</li>
                  <li>Quick filters by channel (Google, Alexa, Custom) and project language</li>
                </ul>
                <span className="cs-label">Impact</span>
                <p>Applying voice effects went from a memorization exercise to a visual workflow. The nested menu was gone.</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/voice04.png" alt="Voice effects" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/voice05.png" alt="Voice effects" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/voice01.png" alt="Voice effects" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/voice03.png" alt="Voice effects" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/voice02-2.png" alt="Voice effects" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/voice06.png" alt="Voice effects" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* Variables and Conditions */}
          <section id="variables" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Variables and conditions</h2>
              <div className="cs-body">
                <span className="cs-label">Challenge</span>
                <p>Showing different messages based on conditions required a separate branch for each outcome. Complex projects filled the canvas with branches, and some laptops ran out of memory.</p>
                <span className="cs-label">Solution</span>
                <p>I moved conditions inside message steps.</p>
                <ul className="cs-list">
                  <li>Inline conditions cut the number of canvas items</li>
                  <li>Fixed memory issues on lower-spec machines</li>
                  <li>Added a dedicated condition builder for complex logic</li>
                  <li>Auto-complete for variables with access to the shared library</li>
                  <li>Inline editing so variables can be changed without leaving the step</li>
                </ul>
                <span className="cs-label">Impact</span>
                <p>Simpler canvases, fewer clicks, and teams could build complex branching without the canvas becoming unreadable.</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/content-menu.png" alt="Variables and conditions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/typing-default.png" alt="Variables and conditions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/default.png" alt="Variables and conditions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/operator-selector.png" alt="Variables and conditions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/operator-hover.png" alt="Variables and conditions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/added-voice-ssml.png" alt="Variables and conditions" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section id="actions" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Actions</h2>
              <div className="cs-body">
                <span className="cs-label">Challenge</span>
                <p>Actions (set a variable, run JS, call an API) were separate blocks on the canvas. Every action added clutter and made flows harder to follow.</p>
                <span className="cs-label">Solution</span>
                <p>I moved actions inside existing blocks. No more separate action items on the canvas.</p>
                <p>I also built Components: reusable logic units. A flow can jump to a Component, run its logic, and return with updated data. This made non-linear conversations possible without duplicating blocks.</p>
                <span className="cs-label">Impact</span>
                <p>Creators could build context-aware flows that branch and return. The canvas stayed clean even for complex projects.</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/actions-1-3.png" alt="Actions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/actions-1.png" alt="Actions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/actions-2-2.png" alt="Actions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/actions-4.png" alt="Actions" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/actions-5.png" alt="Actions" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* User Input */}
          <section id="input" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">User input</h2>
              <div className="cs-body">
                <span className="cs-label">Challenge</span>
                <p>User replies were limited to a predefined list at each step. The conversation followed one fixed path. Creators needed separate canvas items for background actions like setting variables or running code.</p>
                <span className="cs-label">Solution</span>
                <ul className="cs-list">
                  <li><strong>Input capturing</strong> — Pulls data from replies into variables. If something's missing, the bot asks follow-up questions automatically.</li>
                  <li><strong>Listening mode</strong> — The bot picks up intents outside the current block. Users can switch flows mid-conversation and come back.</li>
                  <li><strong>Automatic actions</strong> — Setting variables, opening links, running code now happens inside the reply step. No extra canvas items.</li>
                </ul>
                <span className="cs-label">Impact</span>
                <p>Users stopped hitting dead ends. Creators stopped managing dozens of extra blocks for simple actions.</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/input-1-1.png" alt="User input" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/input-ddd.png" alt="User input" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/input-2.png" alt="User input" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/input-5-2.png" alt="User input" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/input-5-1.png" alt="User input" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* Centralized Model Management */}
          <section id="model" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Centralized model management</h2>
              <div className="cs-body">
                <span className="cs-label">Challenge</span>
                <p>Content managers, designers, and engineers all needed to work in the same project. People who used the app less often couldn't find what they needed without digging through the full canvas.</p>
                <span className="cs-label">Solution</span>
                <ul className="cs-list">
                  <li><strong>Content view</strong> — Find and edit content without opening the canvas</li>
                  <li><strong>Conflict resolution</strong> — See and fix script conflicts across the team</li>
                  <li><strong>Model training</strong> — Train and refine the conversational model without writing code</li>
                  <li><strong>Notifications</strong> — Flags issues with the model and suggests fixes</li>
                </ul>
                <span className="cs-label">Impact</span>
                <p>Team members who used to avoid the app started using it. Content updates that took 20 minutes now took 3.</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <div className="cs-gallery">
                <div className="cs-gallery__item"><img src="/images/vf/model-1-2.png" alt="Model management" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/model-2-1.png" alt="Model management" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/model-3-2.png" alt="Model management" loading="lazy" /></div>
                <div className="cs-gallery__item"><img src="/images/vf/model-4-1.png" alt="Model management" loading="lazy" /></div>
              </div>
            </div>
          </section>

          {/* Outcome */}
          <section id="outcome" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">Outcome</h2>
              <div className="cs-body">
                <p>The redesign shipped and kept working long after I left.</p>
              </div>
              <div className="cs-outcome-grid">
                <div className="cs-outcome-card">
                  <span className="cs-outcome-card__metric">35%</span>
                  <span className="cs-outcome-card__label">More daily users</span>
                  <p className="cs-outcome-card__desc">More team members across roles started using the platform daily. Retention went up with it.</p>
                </div>
                <div className="cs-outcome-card">
                  <span className="cs-outcome-card__metric">3x</span>
                  <span className="cs-outcome-card__label">More projects</span>
                  <p className="cs-outcome-card__desc">The architecture held. Performance stayed consistent as usage grew.</p>
                </div>
                <div className="cs-outcome-card">
                  <span className="cs-outcome-card__metric">40%</span>
                  <span className="cs-outcome-card__label">Faster deploys</span>
                  <p className="cs-outcome-card__desc">Teams built and shipped conversational flows in less than half the time.</p>
                </div>
                <div className="cs-outcome-card">
                  <span className="cs-outcome-card__metric">&uarr;</span>
                  <span className="cs-outcome-card__label">New funding &amp; enterprise clients</span>
                  <p className="cs-outcome-card__desc">The updated product helped close a new round and brought in enterprise accounts.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer">
            <div className="centered">
              <div className="footer__inner">
                <span className="footer__copyright">©<span id="footerYear"></span> <strong>Leehyeon Shin</strong>. All rights reserved.</span>
                <div className="footer__socials">
                  <a href="https://github.com/shinleehyeon" target="_blank" rel="noopener" className="footer__social" aria-label="GitHub">
                    <img src="/images/icon-github.svg" alt="" width="20" height="20" />
                  </a>
                  <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="footer__social" aria-label="LinkedIn">
                    <img src="/images/icon-linkedin.svg" alt="" width="20" height="20" />
                  </a>
                  <a href="https://instagram.com/hyun._.s08" target="_blank" rel="noopener" className="footer__social" aria-label="Instagram">
                    <img src="/images/icon-instagram.svg" alt="" width="20" height="20" />
                  </a>
                </div>
              </div>
            </div>
          </footer>

        </main>
    </>
  );
}
