import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ChevronUp, Menu, Mail, ExternalLink, Download } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CaseStudy {
  id: number;
  number: string;
  title: string;
  category: string;
  categoryTags: string[];
  summary: string;
  challenge: string;
  contributions: string[];
  impact: string;
  tools?: string[];
  metric?: string;
  color: string;
  textColor: string;
  accentColor: string;
  tag: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    number: "01",
    title: "Creating BFSI conversations that go beyond the event floor",
    category: "Event Marketing · Brand Visibility · CXO Engagement",
    categoryTags: ["Event Marketing", "Brand Visibility", "CXO Engagement"],
    summary: "Planned and coordinated national and international BFSI events designed to position the brand in front of senior decision-makers, industry partners and enterprise audiences.",
    challenge: "An event presence needed to deliver more than visibility. It had to create a clear narrative, attract the right audience and support meaningful business conversations.",
    contributions: ["Event and audience evaluation", "Campaign and communication planning", "Speaker and partner coordination", "Social media promotion", "Email communication", "Branding and collateral coordination", "Vendor and logistics management", "On-ground execution", "Post-event communication"],
    impact: "Managed approximately 4–6 national and international corporate events annually while supporting brand visibility, stakeholder engagement and relationship-building.",
    metric: "4–6 events / year",
    color: "#C7B8FF",
    textColor: "#171717",
    accentColor: "#3D5AFE",
    tag: "FROM SPONSORSHIP TO ENGAGEMENT",
  },
  {
    id: 2,
    number: "02",
    title: "Turning a complex technology offering into a clear marketing story",
    category: "Product Marketing · Content · Integrated Campaigns",
    categoryTags: ["Product Marketing", "Content", "Integrated Campaigns"],
    summary: "Developed communication for B2B technology and CRM offerings across website pages, social campaigns, email outreach, presentations, videos and event assets.",
    challenge: "Complex technology offerings can quickly become feature-heavy. The communication needed to be relevant to business audiences and focused on practical value.",
    contributions: ["Product positioning", "Audience-focused messaging", "Website content", "Social media communication", "Email campaign content", "Presentation development", "Brochure and collateral content", "Video scripts", "Coordination with sales, product and design teams"],
    impact: "Translated product capabilities into business challenges, customer outcomes and clear reasons to engage — making the technology understandable and the value memorable.",
    color: "#FF6B5E",
    textColor: "#fff",
    accentColor: "#171717",
    tag: "MAKE THE VALUE MEMORABLE",
  },
  {
    id: 3,
    number: "03",
    title: "Building an organic growth engine",
    category: "SEO · Website · Content Strategy",
    categoryTags: ["SEO", "Website", "Content Strategy"],
    summary: "Led coordinated SEO, content and website optimisation initiatives to improve organic visibility and support marketing-led demand generation.",
    challenge: "Needed to improve organic search performance sustainably without relying on paid channels, while aligning content to real business audience needs.",
    contributions: ["SEO planning", "Website content optimisation", "Service and solution page development", "Keyword and competitor research", "Search performance monitoring", "Analytics review", "Vendor management", "Internal coordination", "Website improvement planning"],
    impact: "30% increase in website traffic through SEO, content and website optimisation across 12+ months of consistent effort.",
    tools: ["SEMrush", "Google Analytics", "Google Search Console", "Microsoft Clarity"],
    metric: "30% traffic growth",
    color: "#C7F36B",
    textColor: "#171717",
    accentColor: "#171717",
    tag: "30% WEBSITE TRAFFIC GROWTH",
  },
  {
    id: 4,
    number: "04",
    title: "Designing email journeys that earn attention",
    category: "Email Marketing · Segmentation · Automation",
    categoryTags: ["Email Marketing", "Segmentation", "Automation"],
    summary: "Managed segmented B2B email campaigns and nurture workflows designed to improve relevance, engagement and sales follow-up.",
    challenge: "B2B email audiences are saturated. Getting consistent open rates and meaningful click-throughs required genuine relevance and strategic sequence design.",
    contributions: ["Audience segmentation", "Campaign planning", "Email messaging", "Subject-line development", "CTA strategy", "Nurture sequence planning", "Workflow coordination", "CRM campaign management", "Performance analysis", "Campaign optimisation"],
    impact: "25–30% average open rate and 3–5% average click-through rate across B2B email campaigns — consistently above industry benchmarks.",
    tools: ["HubSpot", "Sugar Market", "SugarCRM", "Brevo", "Apollo"],
    metric: "25–30% open rate",
    color: "#171717",
    textColor: "#F7F2E8",
    accentColor: "#C7F36B",
    tag: "25–30% OPEN RATE · 3–5% CTR",
  },
  {
    id: 5,
    number: "05",
    title: "The marketing operations behind the visible campaign",
    category: "Budget · Vendors · Planning · Governance",
    categoryTags: ["Budget", "Vendors", "Planning", "Governance"],
    summary: "Managed the operational foundation required to deliver integrated marketing programmes across campaigns, SEO, events, PR and brand initiatives.",
    challenge: "Marketing operations often go unnoticed — but without them, campaigns stall, vendors underdeliver and budgets drift. The challenge was building structure without slowing execution.",
    contributions: ["Annual budget planning", "Vendor identification", "Proposal evaluation", "Agency comparison", "Commercial negotiation", "Scope assessment", "Timeline management", "Performance monitoring", "Stakeholder reporting", "Cross-functional coordination"],
    impact: "Managed ₹60L annual marketing budget while coordinating vendors, timelines and cross-functional teams across all marketing programmes.",
    metric: "₹60L budget managed",
    color: "#3D5AFE",
    textColor: "#fff",
    accentColor: "#C7F36B",
    tag: "₹60L ANNUAL MARKETING BUDGET",
  },
  {
    id: 6,
    number: "06",
    title: "Building webinar campaigns for an international audience",
    category: "Webinars · US Market · Content Marketing",
    categoryTags: ["Webinars", "US Market", "Content Marketing"],
    summary: "Planned and supported webinar marketing initiatives for US audiences, covering prospect outreach, registrations, communication, participation and follow-up.",
    challenge: "Reaching a US audience from India required precise targeting, time-zone-aware communication and campaigns that felt locally relevant.",
    contributions: ["Target audience outreach", "Webinar invitation campaign", "Registration coordination", "Reminder communication", "Participant engagement", "Speaker and schedule coordination", "Post-event follow-up", "Campaign reporting", "Supporting content development"],
    impact: "Supported lead generation, client engagement and meeting acquisition through coordinated webinar and content campaigns for 100+ targeted invitees.",
    metric: "100+ targeted invitees",
    color: "#F7F2E8",
    textColor: "#171717",
    accentColor: "#3D5AFE",
    tag: "100+ TARGETED INVITEES",
  },
];

const galleryItems = [
  { category: "Events", title: "BFSI Summit Announcement", obj: "Brand visibility at industry summit", channel: "Social Media", year: "2024", color: "#C7B8FF" },
  { category: "Social Media", title: "Product Feature Campaign", obj: "B2B product awareness", channel: "LinkedIn", year: "2024", color: "#FF6B5E" },
  { category: "Email", title: "Nurture Email Sequence", obj: "Lead nurturing & engagement", channel: "Email", year: "2023", color: "#3D5AFE" },
  { category: "Website", title: "Service Page Rewrite", obj: "Organic traffic growth", channel: "Website", year: "2024", color: "#C7F36B" },
  { category: "Presentations", title: "Executive Stakeholder Deck", obj: "Senior stakeholder communication", channel: "Internal", year: "2023", color: "#171717" },
  { category: "Content", title: "B2B Case Study Series", obj: "Thought leadership & trust-building", channel: "Content", year: "2024", color: "#C7B8FF" },
  { category: "Campaigns", title: "Product Launch Campaign", obj: "Market entry & demand creation", channel: "Integrated", year: "2023", color: "#FF6B5E" },
  { category: "Events", title: "Webinar Registration Drive", obj: "US market lead generation", channel: "Email + Social", year: "2023", color: "#3D5AFE" },
  { category: "Social Media", title: "Speaker Announcement Post", obj: "Event promotion & credibility", channel: "LinkedIn", year: "2024", color: "#C7F36B" },
];

const expertiseCards = [
  { title: "Integrated Marketing", desc: "Connecting content, campaigns, events, digital channels and sales priorities into one coordinated marketing plan.", color: "#3D5AFE", textColor: "#fff", span: "col-span-2" },
  { title: "Corporate Communications", desc: "Developing clear, consistent communication for leadership, partners, customers, events and digital audiences.", color: "#C7B8FF", textColor: "#171717", span: "" },
  { title: "Event Marketing", desc: "Managing the complete journey from audience strategy and event branding to stakeholder coordination and on-ground execution.", color: "#FF6B5E", textColor: "#fff", span: "" },
  { title: "Content & Brand Storytelling", desc: "Turning business ideas into relevant website content, campaigns, presentations, case studies, emails and social communication.", color: "#F7F2E8", textColor: "#171717", span: "" },
  { title: "SEO & Website Growth", desc: "Improving discoverability through content optimisation, search insights, analytics and continuous website improvement.", color: "#C7F36B", textColor: "#171717", span: "" },
  { title: "Email & Demand Generation", desc: "Creating segmented campaigns and nurture journeys designed around audience context, engagement and action.", color: "#171717", textColor: "#C7B8FF", span: "" },
  { title: "Marketing Operations", desc: "Managing budgets, vendors, timelines, reporting and cross-functional execution behind marketing programmes.", color: "#FF6B5E", textColor: "#fff", span: "col-span-2" },
  { title: "CRM & Automation", desc: "Supporting campaign workflows, audience segmentation, lead nurturing and performance visibility through marketing platforms.", color: "#3D5AFE", textColor: "#fff", span: "col-span-2" },
];

const journeyData = [
  {
    company: "AMBIT SOFTWARE",
    role: "Marketing Manager",
    period: "November 2023 – Present",
    desc: "Leading integrated marketing and corporate communications across digital campaigns, SEO, content, CRM, website management, brand visibility and corporate events.",
    tags: ["BFSI", "B2B Technology", "Events", "SEO", "CRM", "Communications"],
    color: "#3D5AFE",
  },
  {
    company: "OUTKREATE",
    role: "Marketing Manager",
    period: "April 2022 – October 2023",
    desc: "Led content marketing, webinars, email campaigns and account coordination for the US market while acting as a bridge between clients and creative teams.",
    tags: ["US Market", "Webinars", "Content", "Email", "Client Coordination"],
    color: "#FF6B5E",
  },
  {
    company: "MIT SCHOOL OF DISTANCE EDUCATION",
    role: "Educational Sales Consultant",
    period: "August 2020 – November 2021",
    desc: "Managed lead engagement, counselling, CRM communication, webinars and conversion support for prospective students.",
    tags: ["Lead Engagement", "CRM", "Webinars", "Customer Experience"],
    color: "#C7B8FF",
  },
  {
    company: "COMPREHENSIVE SUPPORT SERVICES",
    role: "Pre-Sales Executive",
    period: "December 2019 – June 2020",
    desc: "Supported lead qualification, requirement gathering, presentations, proposals, CRM reporting and coordination between sales and technical teams.",
    tags: ["Pre-Sales", "Proposals", "CRM", "Coordination"],
    color: "#C7F36B",
  },
];

const toolGroups = [
  { label: "Campaigns & CRM", tools: ["HubSpot", "Sugar Market", "SugarCRM", "Apollo", "Brevo"], color: "#3D5AFE" },
  { label: "Analytics & SEO", tools: ["SEMrush", "Google Analytics", "Google Search Console", "Microsoft Clarity"], color: "#C7F36B" },
  { label: "Content & Creative", tools: ["Canva", "HubSpot", "Sugar Market", "Brevo", "Apollo"], color: "#FF6B5E" },
];

const galleryCategories = ["All", "Social Media", "Events", "Email", "Website", "Presentations", "Content", "Campaigns"];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

function useVisible(ref: React.RefObject<HTMLElement | null>, threshold = 0.25) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return visible;
}

function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Tag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.1em] whitespace-nowrap"
      style={{ fontFamily: "'Manrope', sans-serif", ...style }}
    >
      {children}
    </span>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee({ items, bg = "#171717", textColor = "#F7F2E8", speed = 40, reverse = false }: {
  items: string[]; bg?: string; textColor?: string; speed?: number; reverse?: boolean;
}) {
  const text = items.join(" × ");
  return (
    <div className="overflow-hidden py-3 flex-shrink-0" style={{ background: bg }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ color: textColor, fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em" }}
      >
        {[...Array(8)].map((_, i) => <span key={i} className="mr-10">{text}</span>)}
      </motion.div>
    </div>
  );
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="fixed pointer-events-none z-[200] rounded-full hidden lg:block"
      style={{
        width: "18px", height: "18px",
        background: "#3D5AFE",
        left: pos.x, top: pos.y,
        transform: "translate(-50%, -50%)",
        opacity: 0.28,
        mixBlendMode: "multiply",
        transition: "left 0.1s cubic-bezier(.25,.46,.45,.94), top 0.1s cubic-bezier(.25,.46,.45,.94)",
      }}
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", id: "about" },
    { label: "Work", id: "work" },
    { label: "Expertise", id: "expertise" },
    { label: "Journey", id: "journey" },
    { label: "Contact", id: "contact" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(247,242,232,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(23,23,23,0.08)" : "none",
        padding: scrolled ? "10px 0" : "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "22px", color: "#171717", letterSpacing: "-0.03em" }}
        >
          SK.
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="text-sm font-medium transition-opacity hover:opacity-50"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#171717" }}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://linkedin.com/in/shreya-kavthale" target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full border transition-opacity hover:opacity-60"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#171717", borderColor: "rgba(23,23,23,0.22)" }}>
            LinkedIn
          </a>
          <button onClick={() => scrollTo("contact")}
            className="text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity hover:opacity-85"
            style={{ background: "#3D5AFE", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
            {"Let's Connect"}
          </button>
        </div>

        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={22} color="#171717" /> : <Menu size={22} color="#171717" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden absolute top-full left-0 right-0 px-6 py-6 flex flex-col gap-4"
            style={{ background: "#F7F2E8", borderBottom: "1px solid rgba(23,23,23,0.08)" }}
          >
            {links.map((l) => (
              <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }}
                className="text-left text-base font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#171717" }}>
                {l.label}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm border"
                style={{ fontFamily: "'DM Sans', sans-serif", borderColor: "rgba(23,23,23,0.2)", color: "#171717" }}>
                LinkedIn
              </a>
              <button onClick={() => { scrollTo("contact"); setOpen(false); }}
                className="px-4 py-2 rounded-full text-sm"
                style={{ background: "#3D5AFE", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
                {"Let's Connect"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function FloatingLabel({ text, style, delay }: { text: string; style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 14 }}
      className="absolute px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ fontFamily: "'Manrope', sans-serif", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 10, ...style }}
    >
      {text}
    </motion.div>
  );
}

function Portrait() {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: "440px" }}>
      {/* Decorative blobs */}
      <div className="absolute rounded-[60px]"
        style={{ width: "340px", height: "430px", background: "#C7B8FF", top: "30px", left: "calc(50% - 190px)", transform: "rotate(-4deg)", zIndex: 0 }} />
      <div className="absolute rounded-full"
        style={{ width: "60px", height: "60px", background: "#C7F36B", top: "0px", left: "calc(50% + 80px)", zIndex: 0, opacity: 0.9 }} />
      <div className="absolute rounded-full border-2 border-dashed"
        style={{ width: "90px", height: "90px", borderColor: "#3D5AFE", bottom: "0px", right: "calc(50% - 190px)", zIndex: 0, opacity: 0.5 }} />

      {/* Portrait frame */}
      <div className="relative overflow-hidden"
        style={{ width: "320px", height: "420px", borderRadius: "160px 160px 100px 100px", border: "3px solid #171717", zIndex: 2 }}>
        <img
          src="https://plain-apac-prod-public.komododecks.com/202607/24/WAbnAYViCgEryvxkcV5D/image.jpg"
          alt="Shreya Kavthale"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="px-3 py-1 rounded-full" style={{ background: "rgba(23,23,23,0.85)", backdropFilter: "blur(4px)" }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, color: "#C7F36B", whiteSpace: "nowrap" }}>Shreya Kavthale</span>
          </div>
        </div>
      </div>

      {/* Floating labels */}
      <FloatingLabel text="Integrated Marketing" style={{ top: "20px", right: "0px", background: "#3D5AFE", color: "#fff" }} delay={0.8} />
      <FloatingLabel text="BFSI Events" style={{ top: "100px", right: "-20px", background: "#FF6B5E", color: "#fff" }} delay={1.0} />
      <FloatingLabel text="Corporate Comms" style={{ bottom: "110px", right: "-10px", background: "#171717", color: "#C7F36B" }} delay={1.2} />
      <FloatingLabel text="SEO & Content" style={{ bottom: "50px", left: "0px", background: "#C7F36B", color: "#171717" }} delay={1.1} />
      <FloatingLabel text="Marketing Ops" style={{ top: "170px", left: "-20px", background: "#C7B8FF", color: "#171717" }} delay={0.9} />
      <FloatingLabel text="CRM & Automation" style={{ top: "60px", left: "10px", background: "#fff", color: "#3D5AFE" }} delay={1.3} />

      {/* Handwritten annotation */}
      <div className="absolute" style={{ top: "-10px", left: "50%", transform: "translateX(-90%) rotate(-5deg)", zIndex: 11, whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "12px", color: "#FF6B5E" }}>
          {"\"Strategy is only powerful when it moves.\""}
        </span>
      </div>

      {/* Arrow doodle */}
      <svg className="absolute" style={{ top: "12px", left: "calc(50% - 80px)", width: "40px", height: "28px", zIndex: 11 }}>
        <path d="M2,24 Q20,2 38,10" stroke="#FF6B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
        <path d="M34,6 L38,10 L32,12" stroke="#FF6B5E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 px-6 relative overflow-hidden" style={{ background: "#F7F2E8" }}>
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03,
        backgroundImage: "radial-gradient(#171717 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 mb-8">
          <span className="w-7 h-[1.5px]" style={{ background: "#FF6B5E" }} />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>
            MARKETING · COMMUNICATION · GROWTH
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(34px, 4.5vw, 60px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", marginBottom: "24px" }}
            >
              I turn complex ideas into{" "}
              <span className="relative inline-block">
                <span style={{ color: "#3D5AFE" }}>clear stories</span>
                <svg className="absolute left-0 -bottom-0.5 w-full" height="5" viewBox="0 0 100 5" preserveAspectRatio="none">
                  <path d="M0,3 Q25,0 50,3 T100,2" stroke="#3D5AFE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              ,{" "}
              <mark style={{ background: "#C7F36B", padding: "0 5px", borderRadius: "4px", color: "#171717" }}>connected campaigns</mark>
              {" "}and{" "}
              <span style={{ color: "#FF6B5E" }}>measurable momentum</span>
              <span style={{ color: "#FF6B5E" }}>.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "rgba(23,23,23,0.65)", maxWidth: "530px", marginBottom: "14px" }}>
              Hi, {"I'm"} Shreya — a Marketing Manager with 6+ years of experience working across integrated marketing, corporate communications, B2B campaigns, BFSI events, content, SEO and marketing operations.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "rgba(23,23,23,0.65)", maxWidth: "530px", marginBottom: "32px" }}>
              I work where brand, demand, communication and execution meet — bringing teams, channels and ideas together to create marketing that moves the business forward.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => scrollTo("work")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:gap-4"
                style={{ background: "#171717", color: "#F7F2E8", fontFamily: "'DM Sans', sans-serif" }}>
                Explore My Work <ArrowRight size={15} />
              </button>
              <a href="https://linkedin.com/in/shreya-kavthale" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-opacity hover:opacity-70"
                style={{ borderColor: "#3D5AFE", color: "#3D5AFE", fontFamily: "'DM Sans', sans-serif" }}>
                Connect on LinkedIn
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#C7F36B" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(23,23,23,0.45)" }}>
                Pune, India · Working across national and international markets
              </span>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <Portrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────
function Philosophy() {
  const steps = [
    { num: "01", title: "Understand", sub: "Business, audience & opportunity", color: "#3D5AFE", tc: "#fff" },
    { num: "02", title: "Position", sub: "Create a clear and relevant narrative", color: "#FF6B5E", tc: "#fff" },
    { num: "03", title: "Activate", sub: "Bring the story to life across channels", color: "#C7F36B", tc: "#171717" },
    { num: "04", title: "Optimise", sub: "Measure, learn and improve", color: "#C7B8FF", tc: "#171717" },
  ];
  const R = 130, cx = 160, cy = 160;

  return (
    <section id="about" className="py-24 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>
              PHILOSOPHY
            </span>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "16px 0 20px" }}>
              My approach to marketing
            </h2>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "17px", fontWeight: 600, lineHeight: 1.65, color: "#171717", maxWidth: "480px", marginBottom: "18px", borderLeft: "3px solid #FF6B5E", paddingLeft: "16px" }}>
              "Marketing is not one campaign, one channel or one creative. It is the connection between the right message, the right audience and consistent execution."
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(23,23,23,0.6)", maxWidth: "480px" }}>
              I approach marketing as an integrated system. A strong idea should flow through the website, campaign, email, event, sales presentation and customer conversation without losing its meaning.
            </p>
          </motion.div>

          {/* Circular framework */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex justify-center">
            <div className="relative" style={{ width: "320px", height: "320px" }}>
              <svg className="absolute inset-0 w-full h-full">
                <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(23,23,23,0.08)" strokeWidth="1" strokeDasharray="6 4" />
                {steps.map((_, i) => {
                  const a1 = (i * 90 - 45) * Math.PI / 180;
                  const a2 = ((i + 1) * 90 - 45) * Math.PI / 180;
                  return (
                    <path key={i}
                      d={`M ${cx + 50 * Math.cos(a1)} ${cy + 50 * Math.sin(a1)} L ${cx + 50 * Math.cos(a2)} ${cy + 50 * Math.sin(a2)}`}
                      stroke="rgba(23,23,23,0.08)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  );
                })}
              </svg>
              {/* Center */}
              <div className="absolute rounded-full flex flex-col items-center justify-center"
                style={{ width: "110px", height: "110px", background: "#171717", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2 }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>THE</span>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 800, color: "#fff" }}>MARKETING</span>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 800, color: "#C7F36B" }}>SYSTEM</span>
              </div>
              {/* Step cards */}
              {steps.map((step, i) => {
                const angle = (i * 90 - 45) * Math.PI / 180;
                const x = cx + R * Math.cos(angle);
                const y = cy + R * Math.sin(angle);
                return (
                  <div key={step.num} className="absolute" style={{ left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 3, width: "88px" }}>
                    <div className="rounded-xl p-2.5 text-center" style={{ background: step.color }}>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, color: step.tc, opacity: 0.6 }}>{step.num}</div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", fontWeight: 800, color: step.tc }}>{step.title}</div>
                    </div>
                    <p className="text-center mt-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "rgba(23,23,23,0.5)", lineHeight: 1.4 }}>{step.sub}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Metrics ──────────────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "", prefix = "", active }: { target: number; suffix?: string; prefix?: string; active: boolean }) {
  const n = useCounter(target, 1800, active);
  return <>{prefix}{n}{suffix}</>;
}

function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisible(ref as React.RefObject<HTMLElement>);
  return (
    <section id="metrics" className="py-24 px-6" style={{ background: "#171717" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(247,242,232,0.35)" }}>
            IMPACT
          </span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 900, lineHeight: 1.1, color: "#F7F2E8", marginTop: "14px" }}>
            Impact, not<br />just activity.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large */}
          <div className="col-span-2 rounded-3xl p-8" style={{ background: "#C7F36B", minHeight: "240px" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(23,23,23,0.45)", marginBottom: "16px" }}>
              BUDGET MANAGED
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 1, color: "#171717", marginBottom: "12px" }}>
              ₹<AnimatedNumber target={60} suffix="L" active={visible} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(23,23,23,0.6)" }}>
              Annual marketing budget managed across campaigns, events, SEO, PR and brand
            </p>
          </div>

          {/* Med 1 */}
          <div className="rounded-3xl p-7" style={{ background: "#3D5AFE" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>
              WEBSITE TRAFFIC
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, color: "#fff", marginBottom: "10px" }}>
              <AnimatedNumber target={30} suffix="%" active={visible} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
              Increase through SEO, content & optimisation
            </p>
          </div>

          {/* Med 2 */}
          <div className="rounded-3xl p-7" style={{ background: "#FF6B5E" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>
              YEARS EXPERIENCE
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, color: "#fff", marginBottom: "10px" }}>
              <AnimatedNumber target={6} suffix="+" active={visible} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
              Across marketing, communications & customer engagement
            </p>
          </div>

          {/* Small metrics */}
          <div className="rounded-2xl p-6" style={{ background: "#C7B8FF" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(23,23,23,0.45)", marginBottom: "10px" }}>EMAIL OPEN RATE</div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "30px", color: "#171717" }}>25–30%</div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "rgba(247,242,232,0.06)", border: "1px solid rgba(247,242,232,0.08)" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(247,242,232,0.35)", marginBottom: "10px" }}>EMAIL CTR</div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "30px", color: "#F7F2E8" }}>3–5%</div>
          </div>

          <div className="col-span-2 rounded-2xl p-6" style={{ background: "rgba(247,242,232,0.04)", border: "1px solid rgba(247,242,232,0.06)" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(247,242,232,0.35)", marginBottom: "10px" }}>ANNUAL EVENTS</div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "30px", color: "#C7F36B", marginBottom: "6px" }}>4–6 events</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(247,242,232,0.4)" }}>National and international corporate events planned annually</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Work / Case Studies ──────────────────────────────────────────────────────
function CaseStudyModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(23,23,23,0.82)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ background: "#F7F2E8" }}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 px-8 py-6 flex items-start justify-between rounded-t-3xl" style={{ background: study.color }}>
          <div>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: study.textColor === "#fff" ? "rgba(255,255,255,0.5)" : "rgba(23,23,23,0.45)", display: "block", marginBottom: "6px" }}>
              PROJECT {study.number}
            </span>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, lineHeight: 1.25, color: study.textColor, maxWidth: "480px" }}>
              {study.title}
            </h3>
            {study.metric && (
              <div className="inline-block mt-3 px-3 py-1 rounded-full" style={{ background: study.accentColor }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, color: study.accentColor === "#171717" ? "#C7F36B" : study.accentColor === "#C7F36B" ? "#171717" : "#fff" }}>{study.metric}</span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full flex-shrink-0 hover:opacity-70 transition-opacity" style={{ background: "rgba(0,0,0,0.15)" }}>
            <X size={17} color={study.textColor} />
          </button>
        </div>

        <div className="p-8 space-y-7">
          <div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#3D5AFE", marginBottom: "10px" }}>CONTEXT</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(23,23,23,0.75)" }}>{study.summary}</p>
          </div>
          <div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#FF6B5E", marginBottom: "10px" }}>CHALLENGE</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(23,23,23,0.75)" }}>{study.challenge}</p>
          </div>
          <div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#171717", marginBottom: "12px" }}>MY ROLE & DELIVERABLES</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {study.contributions.map((c) => (
                <div key={c} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]" style={{ background: "#C7F36B" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(23,23,23,0.7)" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6" style={{ background: "#171717" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#C7F36B", marginBottom: "10px" }}>OUTCOME</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(247,242,232,0.8)" }}>{study.impact}</p>
          </div>
          {study.tools && (
            <div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#171717", marginBottom: "10px" }}>TOOLS</p>
              <div className="flex flex-wrap gap-2">
                {study.tools.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: "#3D5AFE", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function WorkCard({ study, onOpen, index }: { study: CaseStudy; onOpen: (s: CaseStudy) => void; index: number }) {
  const isEven = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 lg:mb-28"
    >
      {/* Visual */}
      <div className={isEven ? "lg:order-2" : ""}>
        <div className="relative rounded-3xl overflow-hidden group" style={{ height: "380px", background: study.color, cursor: "pointer" }} onClick={() => onOpen(study)}>
          <div className="absolute top-6 left-6 z-10">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em]"
              style={{ background: "rgba(0,0,0,0.12)", color: study.textColor === "#fff" ? "rgba(255,255,255,0.8)" : "rgba(23,23,23,0.6)", fontFamily: "'Manrope', sans-serif" }}>
              {study.tag}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "clamp(60px, 10vw, 110px)", color: study.textColor, opacity: 0.07 }}>
              {study.number}
            </span>
          </div>
          {study.metric && (
            <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl" style={{ background: study.accentColor }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, color: study.accentColor === "#171717" ? "#C7F36B" : study.accentColor === "#C7F36B" ? "#171717" : "#fff" }}>
                {study.metric}
              </span>
            </div>
          )}
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-1.5" style={{ maxWidth: "65%" }}>
            {study.categoryTags.map((t) => (
              <Tag key={t} style={{ background: "rgba(0,0,0,0.14)", color: study.textColor === "#fff" ? "rgba(255,255,255,0.8)" : "rgba(23,23,23,0.65)" }}>{t}</Tag>
            ))}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "rgba(23,23,23,0.15)" }}>
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: "#F7F2E8", color: "#171717", fontFamily: "'DM Sans', sans-serif" }}>
              See the Story <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className={isEven ? "lg:order-1" : ""}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(23,23,23,0.25)" }}>PROJECT {study.number}</span>
        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, lineHeight: 1.2, color: "#171717", margin: "10px 0 16px" }}>
          {study.title}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(23,23,23,0.6)", marginBottom: "20px" }}>
          {study.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {study.contributions.slice(0, 5).map((c) => (
            <Tag key={c} style={{ background: "rgba(23,23,23,0.06)", color: "#171717" }}>{c}</Tag>
          ))}
          {study.contributions.length > 5 && (
            <Tag style={{ background: "rgba(23,23,23,0.06)", color: "rgba(23,23,23,0.45)" }}>+{study.contributions.length - 5} more</Tag>
          )}
        </div>
        <button onClick={() => onOpen(study)}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:gap-4"
          style={{ background: "#171717", color: "#F7F2E8", fontFamily: "'DM Sans', sans-serif" }}>
          See the Story <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function Work() {
  const [active, setActive] = useState<CaseStudy | null>(null);
  return (
    <section id="work" className="py-24 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>SELECTED WORK</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 14px", maxWidth: "560px" }}>
            Work that connects strategy with execution.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(23,23,23,0.55)", maxWidth: "520px", lineHeight: 1.7 }}>
            A selection of campaigns, programmes and marketing initiatives across events, digital, content, SEO, communication and operations.
          </p>
        </motion.div>
        {caseStudies.map((s, i) => <WorkCard key={s.id} study={s} index={i} onOpen={setActive} />)}
      </div>
      <AnimatePresence>
        {active && <CaseStudyModal study={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const filtered = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);
  return (
    <section className="py-24 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#3D5AFE" }}>CREATIVE WORK</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 20px" }}>
            A little more from the marketing desk.
          </h2>
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: filter === cat ? "#171717" : "transparent",
                  color: filter === cat ? "#F7F2E8" : "#171717",
                  border: "1.5px solid",
                  borderColor: filter === cat ? "#171717" : "rgba(23,23,23,0.18)",
                }}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, idx) => (
            <motion.div
              key={`${item.title}-${filter}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ height: idx % 5 === 0 ? "290px" : "210px", background: item.color }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(23,23,23,0.15)" }}>
                  {item.category.toUpperCase()}
                </span>
              </div>
              <AnimatePresence>
                {hovered === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute inset-0 flex flex-col justify-end p-4"
                    style={{ background: "rgba(23,23,23,0.88)" }}
                  >
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#C7F36B", marginBottom: "4px" }}>
                      {item.category.toUpperCase()} · {item.year}
                    </span>
                    <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "14px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>{item.title}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "4px" }}>{item.obj}</p>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Channel: {item.channel}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Expertise ────────────────────────────────────────────────────────────────
function Expertise() {
  return (
    <section id="expertise" className="py-24 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>EXPERTISE</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 12px" }}>
            What I bring to the table
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(23,23,23,0.55)" }}>
            A mix of strategy, communication, execution and operational discipline.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {expertiseCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-3xl p-6 transition-transform hover:-translate-y-1 hover:shadow-xl ${card.span}`}
              style={{ background: card.color, minHeight: "180px", cursor: "default" }}
            >
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "15px", fontWeight: 800, color: card.textColor, marginBottom: "10px" }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", lineHeight: 1.65, color: card.textColor === "#fff" ? "rgba(255,255,255,0.7)" : "rgba(23,23,23,0.6)" }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Journey ──────────────────────────────────────────────────────────────────
function Journey() {
  return (
    <section id="journey" className="py-24 px-6" style={{ background: "#171717" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#C7F36B" }}>JOURNEY</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#F7F2E8", marginTop: "14px" }}>
            The journey so far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-7 top-4 bottom-4 w-px" style={{ background: "rgba(247,242,232,0.08)" }} />
          <div className="space-y-10">
            {journeyData.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-20"
              >
                {/* Dot */}
                <div className="absolute left-4 top-5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: item.color }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#171717" }} />
                </div>
                <div className="rounded-2xl p-6" style={{ background: "rgba(247,242,232,0.04)", border: "1px solid rgba(247,242,232,0.07)" }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "16px", fontWeight: 900, color: "#F7F2E8", letterSpacing: "0.02em" }}>{item.company}</h3>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: item.color }}>{item.role}</span>
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(247,242,232,0.06)", color: "rgba(247,242,232,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                      {item.period}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "rgba(247,242,232,0.55)", marginBottom: "14px" }}>{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                        style={{ background: "rgba(247,242,232,0.06)", color: "rgba(247,242,232,0.65)", fontFamily: "'Manrope', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tools ────────────────────────────────────────────────────────────────────
function ToolsRow({ tools, color, reverse }: { tools: string[]; color: string; reverse: boolean }) {
  const textColor = color === "#C7F36B" || color === "#C7B8FF" ? "#171717" : "#fff";
  const allTools = [...tools, ...tools, ...tools, ...tools, ...tools];
  return (
    <div className="overflow-hidden py-2">
      <motion.div className="flex items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {allTools.map((tool, i) => (
          <span key={i} className="inline-flex items-center px-5 py-2.5 rounded-full font-semibold text-sm mr-4 flex-shrink-0"
            style={{ background: color, color: textColor, fontFamily: "'Manrope', sans-serif" }}>
            {tool}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Tools() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#3D5AFE" }}>TOOLS & PLATFORMS</span>
        <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", marginTop: "14px" }}>
          The platforms behind the work
        </h2>
      </div>
      <div className="space-y-5">
        {toolGroups.map((g, i) => (
          <div key={g.label}>
            <div className="px-6 mb-2">
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(23,23,23,0.35)" }}>
                {g.label.toUpperCase()}
              </span>
            </div>
            <ToolsRow tools={g.tools} color={g.color} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const tags = [
    { label: "SPORTS", color: "#3D5AFE", tc: "#fff" },
    { label: "EVENTS", color: "#FF6B5E", tc: "#fff" },
    { label: "MUSIC", color: "#C7B8FF", tc: "#171717" },
    { label: "CONTENT CREATION", color: "#C7F36B", tc: "#171717" },
  ];
  return (
    <section className="py-24 px-6" style={{ background: "#C7B8FF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(23,23,23,0.45)" }}>ABOUT</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 32px" }}>
            Curious about the audience.<br />Serious about the outcome.
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                "I have always been drawn to the space where ideas, people and execution come together.",
                "Over the last six years, I have worked across marketing, communications, customer engagement, content, campaigns and events. That experience has taught me that successful marketing is rarely the result of one big idea. It comes from understanding the audience, creating a relevant message and making sure every moving part works together.",
                "I enjoy bringing structure to complex initiatives, turning business requirements into clear communication and working with different teams to move an idea from discussion to delivery.",
                "Whether I am developing a campaign, planning an event, improving a website, evaluating a vendor or coordinating a launch, I bring the same approach: understand the purpose, simplify the message and execute with intent.",
              ].map((para, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.8, color: "rgba(23,23,23,0.72)" }}>{para}</p>
              ))}
            </div>
            <div>
              <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(23,23,23,0.07)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontStyle: "italic", lineHeight: 1.75, color: "rgba(23,23,23,0.65)" }}>
                  "Outside the marketing desk, you will usually find me following sports, exploring events, listening to music or experimenting with content ideas."
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((t) => (
                  <span key={t.label} className="px-4 py-2 rounded-full text-xs font-bold tracking-[0.1em]"
                    style={{ background: t.color, color: t.tc, fontFamily: "'Manrope', sans-serif" }}>{t.label}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  const certs = ["HubSpot Social Media Certification", "HubSpot Email Marketing Certification", "Digital Marketing Certification from LIPS India"];
  return (
    <section className="py-20 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-5xl mx-auto">
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E", display: "block", marginBottom: "24px" }}>EDUCATION</span>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { degree: "MBA IN MARKETING", school: "MIT World Peace University", year: "2017–2019" },
            { degree: "BBA IN MARKETING", school: "DCCL, Latur", year: "2014–2017" },
          ].map((ed) => (
            <div key={ed.degree} className="rounded-2xl p-6" style={{ background: "#171717" }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(247,242,232,0.3)", marginBottom: "10px" }}>{ed.degree}</div>
              <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "15px", fontWeight: 800, color: "#F7F2E8", marginBottom: "6px" }}>{ed.school}</h4>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(247,242,232,0.4)" }}>{ed.year}</span>
            </div>
          ))}
          <div className="rounded-2xl p-6" style={{ background: "#3D5AFE" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)", marginBottom: "10px" }}>CERTIFICATIONS</div>
            <div className="space-y-2.5">
              {certs.map((c) => (
                <div key={c} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]" style={{ background: "#C7F36B" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-28 px-6" style={{ background: "#171717" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(247,242,232,0.35)" }}>
            HAVE A CAMPAIGN, ROLE OR IDEA IN MIND?
          </span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(30px, 5vw, 62px)", fontWeight: 900, lineHeight: 1.1, color: "#F7F2E8", margin: "20px 0 18px" }}>
            {"Let's turn the next idea into something people notice — and remember."}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "rgba(247,242,232,0.48)", maxWidth: "520px", margin: "0 auto 40px" }}>
            {"I'm open to conversations around integrated marketing, corporate communications, brand building, B2B campaigns and marketing operations."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="mailto:shreya.k0405@gmail.com"
              className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold transition-opacity hover:opacity-85"
              style={{ background: "#3D5AFE", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
              <Mail size={17} /> Email Me
            </a>
            <a href="https://linkedin.com/in/shreya-kavthale" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold transition-opacity hover:opacity-70 border"
              style={{ borderColor: "rgba(247,242,232,0.18)", color: "#F7F2E8", fontFamily: "'DM Sans', sans-serif" }}>
              <ExternalLink size={17} /> Connect on LinkedIn
            </a>
            <button className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold transition-opacity hover:opacity-70 border"
              style={{ borderColor: "rgba(247,242,232,0.18)", color: "#F7F2E8", fontFamily: "'DM Sans', sans-serif" }}>
              <Download size={17} /> Download My CV
            </button>
          </div>
          <div className="pt-10 border-t" style={{ borderColor: "rgba(247,242,232,0.07)" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "18px", fontWeight: 800, color: "#F7F2E8", marginBottom: "6px" }}>Shreya Kavthale</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(247,242,232,0.38)", marginBottom: "6px" }}>Pune, Maharashtra, India</p>
            <a href="mailto:shreya.k0405@gmail.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#C7F36B" }}>shreya.k0405@gmail.com</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: "#171717", borderTop: "1px solid rgba(247,242,232,0.06)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(247,242,232,0.35)", textAlign: "center" }}>
          Strategy with clarity. Communication with purpose. Execution with momentum.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(247,242,232,0.2)" }}>
          © Shreya Kavthale
        </p>
      </div>
    </footer>
  );
}

// ─── Back to top ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
          style={{ background: "#171717", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
          <ChevronUp size={20} color="#F7F2E8" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const marqueeItems = ["BRAND STORYTELLING", "CAMPAIGNS", "EVENTS", "CONTENT", "SEO", "CRM", "GROWTH", "COMMUNICATIONS", "BFSI MARKETING"];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <div style={{ background: "#F7F2E8" }}>
      <CursorFollower />
      <Nav />
      <Hero />
      <Marquee items={marqueeItems} />
      <Philosophy />
      <Metrics />
      <Work />
      <Gallery />
      <Expertise />
      <Journey />
      <Tools />
      <About />
      <Education />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
