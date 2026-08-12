import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ChevronUp, Menu, Mail, ExternalLink, Download, Users, Lightbulb, Link2, Zap, Blocks, BarChart3 } from "lucide-react";

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
  process?: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    number: "01",
    title: "Managing the complete operating journey behind BFSI events",
    category: "Event Marketing · Brand Visibility · CXO Engagement",
    categoryTags: ["Event Marketing", "Brand Visibility", "CXO Engagement"],
    summary: "Planned and executed national and international BFSI corporate events involving senior decision-makers, partners and industry leaders — from audience selection and communication to vendors, branding, logistics and on-ground execution.",
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
    title: "Making complex technology communication clear and relevant",
    category: "Content · B2B Communication · Integrated Campaigns",
    categoryTags: ["Content", "B2B Communication", "Integrated Campaigns"],
    summary: "Developed communication content for B2B technology offerings across website pages, email campaigns, social media, presentations, event assets and stakeholder communication.",
    challenge: "Complex technology offerings can quickly become feature-heavy. The communication needed to be relevant to business audiences and focused on practical value.",
    contributions: ["Audience-focused messaging", "Website content", "Social media communication", "Email campaign content", "Presentation development", "Brochure and collateral content", "Video scripts", "Coordination with sales and design teams"],
    impact: "Translated product capabilities into business challenges, customer outcomes and clear reasons to engage — making the technology understandable and the value memorable.",
    color: "#FF6B5E",
    textColor: "#fff",
    accentColor: "#171717",
    tag: "MAKE THE VALUE MEMORABLE",
  },
  {
    id: 3,
    number: "03",
    title: "Coordinating SEO, content and website growth",
    category: "SEO · Website · Content Strategy",
    categoryTags: ["SEO", "Website", "Content Strategy"],
    summary: "Led coordinated SEO, content and website optimisation initiatives to improve organic visibility and support marketing-led demand generation.",
    challenge: "Needed to improve organic search performance sustainably without relying on paid channels, while aligning content to real business audience needs.",
    contributions: ["SEO planning", "Website content optimisation", "Service and solution page development", "Keyword and competitor research", "Search performance monitoring", "Analytics review", "Vendor management", "Internal coordination", "Website improvement planning"],
    impact: "Drove a 30% increase in website traffic through SEO, content and website optimisation across 12+ months of consistent effort.",
    tools: ["SEMrush", "Google Analytics", "Google Search Console"],
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
    summary: "Managed segmented B2B email campaigns and nurture workflows at Ambit Software, achieving 25–30% open rates and 3–5% CTR. Also managed US-market email campaigns at Outkreate with 15–20% open rates and 2–4% CTR.",
    challenge: "B2B email audiences are saturated. Getting consistent open rates and meaningful click-throughs required genuine relevance and strategic sequence design.",
    contributions: ["Audience segmentation", "Campaign planning", "Email messaging", "Subject-line development", "CTA strategy", "Nurture sequence planning", "Workflow coordination", "CRM campaign management", "Performance analysis", "Campaign optimisation"],
    impact: "Ambit: 25–30% average open rate · 3–5% CTR. Outkreate (US market): 15–20% open rate · 2–4% CTR — consistently above industry benchmarks.",
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
    title: "Managing the operational foundation behind integrated marketing",
    category: "Budget · Vendors · Planning · Governance",
    categoryTags: ["Budget", "Vendors", "Planning", "Governance"],
    summary: "Managed the operational foundation required to deliver integrated marketing programmes — covering SEO, paid campaigns, events, PR and brand-building activities including vendor evaluation and management.",
    challenge: "Marketing operations often go unnoticed — but without them, campaigns stall, vendors underdeliver and budgets drift. The challenge was building structure without slowing execution.",
    contributions: ["Annual budget planning (₹45L)", "Vendor identification and evaluation", "Proposal and agency comparison", "Commercial negotiation", "Scope assessment", "Timeline management", "Performance monitoring", "Stakeholder reporting", "Cross-functional coordination"],
    impact: "Managed ₹45L annual marketing budget while coordinating vendors, timelines and cross-functional teams across all marketing programmes.",
    metric: "₹45L budget managed",
    color: "#3D5AFE",
    textColor: "#fff",
    accentColor: "#C7F36B",
    tag: "₹45L ANNUAL MARKETING BUDGET",
  },
  {
    id: 6,
    number: "06",
    title: "Coordinating webinar campaigns for international audiences",
    category: "Webinars · US Market · Content Marketing",
    categoryTags: ["Webinars", "US Market", "Content Marketing"],
    summary: "Managed webinar marketing initiatives for US audiences, covering prospect outreach, registrations, communication, participation scheduling, engagement and follow-up for 100+ targeted invitees.",
    challenge: "Reaching a US audience from India required precise targeting, time-zone-aware communication and campaigns that felt locally relevant.",
    contributions: ["Target audience outreach", "Webinar invitation campaign", "Registration coordination", "Reminder communication", "Participant engagement", "Speaker and schedule coordination", "Post-event follow-up", "Campaign reporting", "Supporting content development"],
    impact: "Supported lead generation, client engagement and meeting acquisition through coordinated webinar and content campaigns for 100+ targeted invitees.",
    metric: "100+ targeted invitees",
    color: "#F7F2E8",
    textColor: "#171717",
    accentColor: "#3D5AFE",
    tag: "100+ TARGETED INVITEES",
  },
  {
    id: 7,
    number: "07",
    title: "Turning client requirements into structured creative delivery",
    category: "Account Management · Client Success · Creative Coordination",
    categoryTags: ["Account Management", "Client Success", "Creative Coordination"],
    summary: "Managed client accounts and ongoing projects for the US market at Outkreate, acting as the primary point of contact between clients and internal design teams — from requirement gathering through to final approved delivery.",
    challenge: "Bridging client expectations and internal creative execution required clear communication, structured briefing and consistent follow-through across multiple simultaneous projects.",
    contributions: ["Requirement gathering", "Creative brief development", "Client communication management", "Design-team coordination", "Timeline follow-up", "Revision management", "Approval coordination", "Final delivery"],
    impact: "Ensured smooth project delivery across US client accounts by maintaining clear briefs, managing revisions and coordinating internal teams — supporting client satisfaction and account growth.",
    process: ["Client Requirement", "Creative Brief", "Internal Coordination", "Design Review", "Revisions", "Approval", "Final Delivery"],
    color: "#C7B8FF",
    textColor: "#171717",
    accentColor: "#171717",
    tag: "REQUIREMENT TO DELIVERY",
  },
];

const galleryItems = [
  {
    category: "Events", title: "BFSI Summit Announcement",
    obj: "Brand visibility at industry summit", channel: "Social Media", year: "2024", color: "#C7B8FF",
    image: "/images/gallery-summit.jpg",
    tags: ["#ambitsoftware", "#sugarcrm", "#bfsiitsummit2025", "#nexafin", "#cxtransformation", "#agenticai", "#agenticai", "#cxleadership", "#enterpriseai"],
    link: "https://www.linkedin.com/posts/ambitsoftware-sugarcrm-bfsiitsummit2025-share-7355836546022825984-wi5k/?utm_source=share&utm_medium=member_desktop&rcm=ACoAABKX-XoB-M2g9yrKoPG3YabAQB8tAGYhDeI",
  },
  {
    category: "Email", title: "Nurture Email Sequence",
    obj: "Lead nurturing & engagement", channel: "Email", year: "2023", color: "#3D5AFE",
    image: "/images/nurture-email-gen.png",
  },
  {
    category: "Website", title: "Products & Service Page Rewrite",
    obj: "Organic traffic growth", channel: "Website", year: "2024", color: "#C7F36B",
    image: "/images/gallery-crm.jpg",
    subtext: "Banking CRM Software | AI-Powered CRM for Banks | nexaFIN",
    link: "https://www.ambitsoftware.com/",
  },
  {
    category: "Content", title: "B2B Case Study Series",
    obj: "Thought leadership & trust-building", channel: "Content", year: "2024", color: "#C7B8FF",
    image: "/images/gallery-case-studies.jpg",
    link: "https://www.ambitsoftware.com/casestudies/",
  },
  {
    category: "Campaigns", title: "Product Launch Campaign",
    obj: "Market entry & demand creation", channel: "Integrated", year: "2023", color: "#FF6B5E",
    image: "/images/gallery-outkreate.jpg",
    link: "https://www.ambitsoftware.com/brochure/",
  },
  {
    category: "Events", title: "Webinar Registration Drive",
    obj: "US market lead generation", channel: "Email + Social", year: "2023", color: "#3D5AFE",
    image: "/images/webinar-reg-gen.png",
    link: "https://www.linkedin.com/posts/outkreate_investordays-investordaypresentations-investorrelations-ac",
  },
  {
    category: "Social Media", title: "Speaker Announcement Post",
    obj: "Event promotion & credibility", channel: "LinkedIn", year: "2024", color: "#C7F36B",
    image: "/images/gallery-speaker.jpg",
    tags: ["#bfsitechsummit2026", "#ambitsoftware", "#sugarai", "#bfsi", "#agenticai", "#exitobfsisingapore", "#bfsiitsummit2025", "#digitalbanking"],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7483813382610149376/",
  },
];

const expertiseCards = [
  {
    title: "Integrated Marketing",
    desc: "Connecting digital campaigns, content, email, events, websites and sales priorities through coordinated marketing planning.",
    color: "#3D5AFE", textColor: "#fff", span: "col-span-2"
  },
  {
    title: "Marketing Operations",
    desc: "Managing timelines, vendors, budgets, deliverables, approvals and reporting behind multiple marketing initiatives.",
    color: "#C7F36B", textColor: "#171717", span: ""
  },
  {
    title: "Corporate Communications",
    desc: "Creating consistent communication for leadership, partners, customers, events and external audiences.",
    color: "#FF6B5E", textColor: "#fff", span: ""
  },
  {
    title: "Corporate Event Management",
    desc: "Planning and executing national and international BFSI events across audience targeting, vendors, branding, logistics and on-ground delivery.",
    color: "#C7B8FF", textColor: "#171717", span: ""
  },
  {
    title: "Content & Campaign Communication",
    desc: "Developing messaging and content for websites, emails, social media, presentations, events and campaign collateral.",
    color: "#F7F2E8", textColor: "#171717", span: ""
  },
  {
    title: "SEO & Website Growth",
    desc: "Coordinating SEO, content and website improvements to increase visibility and support lead generation.",
    color: "#ffffff", textColor: "#171717", span: ""
  },
  {
    title: "CRM & Marketing Automation",
    desc: "Managing segmented email campaigns, nurture workflows, campaign data and performance reporting using marketing platforms.",
    color: "#3D5AFE", textColor: "#fff", span: ""
  },
  {
    title: "Stakeholder & Vendor Coordination",
    desc: "Aligning internal teams, sales, leadership, partners, agencies and vendors to maintain communication and execution quality.",
    color: "#FF6B5E", textColor: "#fff", span: ""
  },
  {
    title: "Account Management & Client Success",
    desc: "Managing client requirements, coordinating internal teams and maintaining clear communication throughout project delivery. Supporting client satisfaction, long-term relationships and account growth.",
    color: "#C7B8FF", textColor: "#171717", span: "col-span-2"
  },
];

const journeyData = [
  {
    company: "AMBIT SOFTWARE",
    role: "Marketing Manager",
    period: "November 2023 – Present",
    desc: "Lead integrated marketing and corporate communications across digital campaigns, SEO, CRM, websites, content, corporate events and brand visibility. Manage an annual marketing budget of approximately ₹60 lakh and coordinate communication among leadership, sales, cross-functional teams, vendors, partners and event stakeholders. Plan and deliver 4–6 national and international BFSI events annually and oversee email nurture campaigns achieving average open rates of 25–30% and click-through rates of 3–5%.",
    tags: ["BFSI", "B2B Technology", "Events", "SEO", "CRM", "Communications"],
    color: "#3D5AFE",
  },
  {
    company: "OUTKREATE",
    role: "Marketing Manager",
    period: "April 2022 – October 2023",
    desc: "Led content marketing, email campaigns, webinars and account coordination for the US market. Managed client requirements and acted as the primary bridge between clients and internal design teams, coordinating briefs, project timelines, revisions, approvals and final outputs.",
    tags: ["US Market", "Webinars", "Content", "Email", "Client Coordination"],
    color: "#FF6B5E",
  },
  {
    company: "MIT SCHOOL OF DISTANCE EDUCATION",
    role: "Educational Sales Consultant",
    period: "August 2020 – November 2021",
    desc: "Managed consultative engagement with approximately 100–150 prospective student leads per month across counselling, programme guidance, conversion support and onboarding. Coordinated CRM campaigns, webinars and follow-up communication while providing post-sales support and relationship management.",
    tags: ["Lead Engagement", "CRM", "Webinars", "Customer Experience"],
    color: "#C7B8FF",
  },
  {
    company: "COMPREHENSIVE SUPPORT SERVICES",
    role: "Pre-Sales Executive",
    period: "December 2019 – June 2020",
    desc: "Supported lead qualification, customer engagement, requirement gathering, proposals, presentations, CRM reporting and coordination between sales and technical teams.",
    tags: ["Pre-Sales", "Proposals", "CRM", "Coordination"],
    color: "#C7F36B",
  },
];

const toolGroups = [
  { label: "CRM & Campaigns", tools: ["HubSpot", "Sugar Market", "SugarCRM", "Apollo", "Brevo"], color: "#3D5AFE" },
  { label: "SEO & Analytics", tools: ["SEMrush", "Google Analytics", "Google Search Console"], color: "#C7F36B" },
  { label: "Content & Creative", tools: ["Canva"], color: "#FF6B5E" },
];

const galleryCategories = ["All", "Social Media", "Events", "Email", "Website", "Content", "Campaigns"];

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
    { label: "Journey", id: "journey" },
    { label: "Tools", id: "tools" },
    { label: "About", id: "about" },
    { label: "SWOT", id: "swot" },
    { label: "Education", id: "education" },
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
          <a href="https://www.linkedin.com/in/shreya-k-/" target="_blank" rel="noopener noreferrer"
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
              <a href="https://www.linkedin.com/in/shreya-k-/" target="_blank" rel="noopener noreferrer"
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

      {/* Floating labels — updated per brief */}
      <FloatingLabel text="Marketing Operations" style={{ top: "20px", right: "0px", background: "#3D5AFE", color: "#fff" }} delay={0.8} />
      <FloatingLabel text="Integrated Marketing" style={{ top: "100px", right: "-20px", background: "#FF6B5E", color: "#fff" }} delay={1.0} />
      <FloatingLabel text="Corporate Communications" style={{ bottom: "110px", right: "-10px", background: "#171717", color: "#C7F36B" }} delay={1.2} />
      <FloatingLabel text="SEO & Digital Growth" style={{ bottom: "50px", left: "0px", background: "#C7F36B", color: "#171717" }} delay={1.1} />
      <FloatingLabel text="CRM & Campaigns" style={{ top: "170px", left: "-20px", background: "#C7B8FF", color: "#171717" }} delay={0.9} />
      <FloatingLabel text="Corporate Events" style={{ top: "60px", left: "10px", background: "#fff", color: "#3D5AFE" }} delay={1.3} />

      {/* Handwritten annotation — updated quote */}
      <div className="absolute" style={{ top: "-10px", left: "50%", transform: "translateX(-90%) rotate(-5deg)", zIndex: 11, whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "12px", color: "#FF6B5E" }}>
          {'"Strong marketing connects the message, the people and the execution."'}
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
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.03,
        backgroundImage: "radial-gradient(#171717 1px, transparent 1px)", backgroundSize: "28px 28px"
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Eyebrow — updated */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 mb-8">
          <span className="w-7 h-[1.5px]" style={{ background: "#FF6B5E" }} />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>
            MARKETING OPERATIONS · CORPORATE COMMUNICATIONS · INTEGRATED MARKETING
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            {/* Headline — updated with styled segments */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(34px, 4.5vw, 60px)", fontWeight: 900, lineHeight: 1.2, color: "#171717", marginBottom: "24px" }}
            >
              {"I bring "}
              {/* "structure to marketing" — cobalt, CSS underline (no SVG width bug) */}
              <span style={{
                color: "#3D5AFE",
                textDecoration: "underline",
                textDecorationColor: "#3D5AFE",
                textDecorationThickness: "3px",
                textUnderlineOffset: "6px",
              }}>{"structure to marketing"}</span>
              {", "}
              {/* "clarity to communication" — lime pill highlight */}
              <span style={{
                background: "#C7F36B",
                color: "#171717",
                padding: "2px 8px",
                borderRadius: "6px",
                display: "inline",
              }}>{"clarity to communication"}</span>
              {" and "}
              {/* "consistency to execution" — coral */}
              <span style={{ color: "#FF6B5E" }}>{"consistency to execution."}</span>
            </motion.h1>

            {/* Intro — updated */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "rgba(23,23,23,0.65)", maxWidth: "530px", marginBottom: "14px" }}>
              Hi, {"I'm"} Shreya — a Marketing Manager with 6+ years of experience leading integrated marketing and corporate communications across B2B technology, BFSI, education and IT services.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "rgba(23,23,23,0.65)", maxWidth: "530px", marginBottom: "32px" }}>
              My work spans campaigns, corporate events, SEO, websites, CRM, content, vendor management and stakeholder engagement. I connect internal teams, external partners and marketing channels to ensure that ideas move from requirement to effective execution.
            </motion.p>

            {/* CTAs — updated */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => scrollTo("work")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:gap-4"
                style={{ background: "#171717", color: "#F7F2E8", fontFamily: "'DM Sans', sans-serif" }}>
                Explore My Work <ArrowRight size={15} />
              </button>
              <button onClick={() => scrollTo("journey")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-opacity hover:opacity-70"
                style={{ borderColor: "#3D5AFE", color: "#3D5AFE", fontFamily: "'DM Sans', sans-serif" }}>
                View My Journey
              </button>
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
    { num: "01", title: "Audience", desc: "Understand the right business, audience & opportunity", color: "#3D5AFE", bg: "rgba(61,90,254,0.08)", icon: <Users size={18} color="#3D5AFE" /> },
    { num: "02", title: "Message", desc: "Create a clear and relevant narrative", color: "#9c27b0", bg: "rgba(156,39,176,0.08)", icon: <Lightbulb size={18} color="#9c27b0" /> },
    { num: "03", title: "Alignment", desc: "Connect teams and priorities", color: "#ff9800", bg: "rgba(255,152,0,0.08)", icon: <Link2 size={18} color="#ff9800" /> },
    { num: "04", title: "Execution", desc: "Bring the story to life across channels", color: "#4caf50", bg: "rgba(76,175,80,0.08)", icon: <Zap size={18} color="#4caf50" /> },
    { num: "05", title: "Integration", desc: "Create one connected experience", color: "#f44336", bg: "rgba(244,67,54,0.08)", icon: <Blocks size={18} color="#f44336" /> },
    { num: "06", title: "Optimisation", desc: "Measure, learn and improve", color: "#00bcd4", bg: "rgba(0,188,212,0.08)", icon: <BarChart3 size={18} color="#00bcd4" /> },
  ];

  return (
    <section id="philosophy" className="py-24 px-6 overflow-hidden" style={{ background: "#FDF8F1" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Left Content */}
        <div className="lg:w-[45%]">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>
              PHILOSOPHY
            </span>
            <h2 className="relative inline-block" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 40px" }}>
              My approach to<br />marketing
              <svg className="absolute -bottom-5 left-0 w-full max-w-[200px]" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 15C50 5 150 2 198 12" stroke="#FF6B5E" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </h2>

            <div className="pl-6 mb-8 border-l-[3px]" style={{ borderColor: "#FF6B5E" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", fontWeight: 500, lineHeight: 1.6, color: "#171717" }}>
                "Marketing is not one campaign, one channel or one creative. It is the connection between the right message, the right audience and consistent execution."
              </p>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(23,23,23,0.7)" }}>
              I approach marketing as an integrated system. A strong idea should flow through the website, campaign, email, event, sales presentation and customer conversation without losing its meaning.
            </p>
          </motion.div>
        </div>

        {/* Right Content - Circular Graphic */}
        <div className="lg:w-[55%] relative flex justify-center items-center mt-12 lg:mt-0 min-h-[450px]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative w-full max-w-[450px] aspect-square flex justify-center items-center">

            {/* Center Circle */}
            <div className="absolute z-10 w-44 h-44 rounded-full bg-white flex flex-col justify-center items-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-[6px]" style={{ borderColor: "#FDF8F1" }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "16px", fontWeight: 800, color: "#171717", textAlign: "center", lineHeight: 1.2 }}>
                Integrated<br />Marketing
              </div>
              <div className="relative mt-1" style={{ fontFamily: "'Caveat', cursive, serif", fontSize: "22px", color: "#171717", fontStyle: "italic" }}>
                in Action
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8C30 3 70 3 95 7" stroke="#FF6B5E" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Connecting dashed circle */}
            <div className="absolute w-[75%] h-[75%] rounded-full border border-dashed border-gray-300"></div>

            {/* Circular Items */}
            {steps.map((step, i) => {
              const angle = (i * 60) - 90; // Start at top
              const radius = 42; // Percentage of container width
              const x = 50 + radius * Math.cos(angle * Math.PI / 180);
              const y = 50 + radius * Math.sin(angle * Math.PI / 180);

              // Small colored arrows on the dashed line
              const arrowAngle = angle + 30;
              const arrowX = 50 + 37.5 * Math.cos(arrowAngle * Math.PI / 180);
              const arrowY = 50 + 37.5 * Math.sin(arrowAngle * Math.PI / 180);

              return (
                <div key={i}>
                  <div className="absolute w-3 h-3 flex items-center justify-center"
                    style={{
                      left: `${arrowX}%`, top: `${arrowY}%`,
                      transform: `translate(-50%, -50%) rotate(${arrowAngle + 90}deg)`,
                      color: step.color
                    }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </div>
                  <div className="absolute flex flex-col items-center justify-center p-3 rounded-[20px] bg-white shadow-lg transition-transform hover:scale-105"
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '130px',
                      border: `1px solid ${step.color}30`,
                      boxShadow: `0 10px 25px -5px ${step.color}15`
                    }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1" style={{ background: step.bg }}>
                      {step.icon}
                    </div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, color: step.color }}>
                      {step.num}
                    </div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", fontWeight: 800, color: "#171717", marginBottom: "2px", textAlign: "center" }}>
                      {step.title}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(23,23,23,0.6)", textAlign: "center", lineHeight: 1.2 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
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
              ₹<AnimatedNumber target={45} suffix="L" active={visible} />
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
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(23,23,23,0.5)", marginTop: "4px" }}>At Ambit Software</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "rgba(247,242,232,0.06)", border: "1px solid rgba(247,242,232,0.08)" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(247,242,232,0.35)", marginBottom: "10px" }}>EMAIL CTR</div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "30px", color: "#F7F2E8" }}>3–5%</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(247,242,232,0.35)", marginTop: "4px" }}>At Ambit Software</p>
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

          {/* Process flow for Project 07 */}
          {study.process && (
            <div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#C7B8FF", marginBottom: "14px" }}>PROCESS</p>
              <div className="flex flex-wrap items-center gap-2">
                {study.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#171717", color: "#F7F2E8", fontFamily: "'Manrope', sans-serif" }}>
                      {step}
                    </span>
                    {i < study.process!.length - 1 && (
                      <ArrowRight size={14} color="rgba(23,23,23,0.3)" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#171717", marginBottom: "12px" }}>CONTRIBUTIONS</p>
            <div className="flex flex-wrap gap-2">
              {study.contributions.map((c) => (
                <Tag key={c} style={{ background: "rgba(23,23,23,0.06)", color: "#171717" }}>{c}</Tag>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "#171717" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#C7F36B", marginBottom: "8px" }}>IMPACT</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(247,242,232,0.8)" }}>{study.impact}</p>
          </div>
          {study.tools && (
            <div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(23,23,23,0.35)", marginBottom: "10px" }}>TOOLS USED</p>
              <div className="flex flex-wrap gap-2">
                {study.tools.map((t) => (
                  <Tag key={t} style={{ background: "#3D5AFE", color: "#fff" }}>{t}</Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Image map for case studies that have project images
const studyImages: Record<number, string> = {
  1: "/images/project-01.jpg",
  2: "/images/project-02.jpg",
  3: "/images/project-03.jpg",
  4: "/images/project-04.jpg",
  5: "/images/project-05.jpg",
  6: "/images/project-06.jpg",
  7: "/images/project-07.jpg",
};

// Full-image lightbox for work section
function WorkImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(23,23,23,0.96)", backdropFilter: "blur(16px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative flex flex-col items-center w-full max-w-5xl"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full hover:opacity-70 transition-opacity"
          style={{ background: "rgba(247,242,232,0.12)" }}
        >
          <X size={22} color="#F7F2E8" />
        </button>
        <div className="w-full rounded-2xl overflow-auto" style={{ maxHeight: "88vh" }}>
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(247,242,232,0.35)", marginTop: "12px" }}>
          Press Esc or click outside to close
        </p>
      </motion.div>
    </div>
  );
}

function WorkCard({ study, index, onOpen, onViewImage }: { study: CaseStudy; index: number; onOpen: (s: CaseStudy) => void; onViewImage: (src: string, alt: string) => void }) {
  const isEven = index % 2 === 0;
  const projectImage = studyImages[study.id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.06 }}
      className={`grid lg:grid-cols-2 gap-12 items-center mb-24 ${isEven ? "" : "lg:flex-row-reverse"}`}
    >
      {/* Visual — clicking image opens full-image lightbox */}
      <div
        className={`relative rounded-3xl overflow-hidden cursor-pointer group ${isEven ? "" : "lg:order-2"}`}
        style={{ background: study.color, minHeight: "380px" }}
        onClick={() => projectImage ? onViewImage(projectImage, study.title) : onOpen(study)}
      >
        {projectImage ? (
          <>
            <img
              src={projectImage}
              alt={study.title}
              style={{ width: "100%", height: "100%", minHeight: "380px", objectFit: "cover", objectPosition: "top", display: "block" }}
            />
            {/* Tag overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(to top, rgba(23,23,23,0.85) 0%, transparent 100%)" }}>
              <div className="inline-block px-4 py-2 rounded-full" style={{ background: study.accentColor }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: study.accentColor === "#171717" ? "#C7F36B" : study.accentColor === "#C7F36B" ? "#171717" : "#fff" }}>
                  {study.tag}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8" style={{ minHeight: "380px" }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "80px", fontWeight: 900, color: study.textColor === "#fff" ? "rgba(255,255,255,0.08)" : "rgba(23,23,23,0.06)", lineHeight: 1 }}>
              {study.number}
            </span>
            <div className="mt-4 px-4 py-2 rounded-full" style={{ background: study.accentColor }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: study.accentColor === "#171717" ? "#C7F36B" : study.accentColor === "#C7F36B" ? "#171717" : "#fff" }}>
                {study.tag}
              </span>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: "rgba(23,23,23,0.55)" }}
        >
          {projectImage ? (
            <>
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: "#F7F2E8", color: "#171717", fontFamily: "'DM Sans', sans-serif" }}>
                View Full Image
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(247,242,232,0.55)" }}>
                Click to expand
              </span>
            </>
          ) : (
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "#F7F2E8", color: "#171717", fontFamily: "'DM Sans', sans-serif" }}>
              See the Story <ArrowRight size={14} />
            </span>
          )}
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
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onOpen(study)}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:gap-4"
            style={{ background: "#171717", color: "#F7F2E8", fontFamily: "'DM Sans', sans-serif" }}>
            See the Story <ArrowRight size={14} />
          </button>
          {projectImage && (
            <button onClick={() => onViewImage(projectImage, study.title)}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-75"
              style={{ border: "1.5px solid rgba(23,23,23,0.22)", color: "#171717", fontFamily: "'DM Sans', sans-serif", background: "transparent" }}>
              View Image
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Work() {
  const [active, setActive] = useState<CaseStudy | null>(null);
  const [imageView, setImageView] = useState<{ src: string; alt: string } | null>(null);
  return (
    <section id="work" className="py-24 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>SELECTED WORK</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 14px", maxWidth: "560px" }}>
            Work that connects strategy with execution.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(23,23,23,0.55)", maxWidth: "520px", lineHeight: 1.7 }}>
            A selection of campaigns, programmes and marketing initiatives across events, digital, content, SEO, communication, client delivery and operations.
          </p>
        </motion.div>
        {caseStudies.map((s, i) => (
          <WorkCard
            key={s.id}
            study={s}
            index={i}
            onOpen={setActive}
            onViewImage={(src, alt) => setImageView({ src, alt })}
          />
        ))}
      </div>
      <AnimatePresence>
        {active && <CaseStudyModal study={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {imageView && (
          <WorkImageLightbox
            src={imageView.src}
            alt={imageView.alt}
            onClose={() => setImageView(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
interface GalleryItem {
  category: string;
  title: string;
  obj: string;
  channel: string;
  year: string;
  color: string;
  image?: string;
  link?: string;
  tags?: string[];
  subtext?: string;
}

function GalleryLightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(23,23,23,0.92)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative flex flex-col items-center max-w-4xl w-full"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 -mt-12 p-2 rounded-full hover:opacity-70 transition-opacity z-10"
          style={{ background: "rgba(247,242,232,0.15)" }}
        >
          <X size={20} color="#F7F2E8" />
        </button>

        {/* Header */}
        <div className="w-full mb-4 flex items-center justify-between">
          <div>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "#C7F36B" }}>
              {item.category.toUpperCase()} · {item.year}
            </span>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, color: "#F7F2E8", marginTop: "4px" }}>{item.title}</h3>
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ background: "#3D5AFE", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
            >
              View Live <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Image or color card */}
        {item.image ? (
          <div className="w-full rounded-2xl overflow-hidden" style={{ maxHeight: "75vh" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", maxHeight: "75vh" }}
            />
          </div>
        ) : (
          <div className="w-full rounded-2xl p-10 flex flex-col items-center justify-center gap-4" style={{ background: item.color, minHeight: "320px" }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "28px", fontWeight: 900, color: "rgba(23,23,23,0.2)" }}>{item.category.toUpperCase()}</span>
            <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "22px", fontWeight: 800, color: "#171717", textAlign: "center" }}>{item.title}</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(23,23,23,0.65)", textAlign: "center" }}>{item.obj}</p>
            {item.subtext && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(23,23,23,0.55)", textAlign: "center" }}>{item.subtext}</p>
            )}
            {item.tags && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(23,23,23,0.12)", color: "rgba(23,23,23,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = filter === "All" ? (galleryItems as GalleryItem[]) : (galleryItems as GalleryItem[]).filter((g) => g.category === filter);
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
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ height: idx % 5 === 0 ? "290px" : "210px", background: item.color }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setLightbox(item)}
            >
              {/* Background image or color placeholder */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(23,23,23,0.15)" }}>
                    {item.category.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <AnimatePresence>
                {hovered === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute inset-0 flex flex-col justify-between p-4"
                    style={{ background: "rgba(23,23,23,0.88)" }}
                  >
                    <div className="flex items-start justify-between">
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#C7F36B" }}>
                        {item.category.toUpperCase()} · {item.year}
                      </span>
                      {item.link && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{ background: "rgba(61,90,254,0.3)", color: "#C7F36B", fontFamily: "'Manrope', sans-serif" }}>
                          <ExternalLink size={9} /> View
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "14px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>{item.title}</h4>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "4px" }}>{item.obj}</p>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Channel: {item.channel}</span>
                      {item.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded text-[9px]"
                              style={{ background: "rgba(199,243,107,0.15)", color: "#C7F36B", fontFamily: "'DM Sans', sans-serif" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#C7F36B", fontFamily: "'DM Sans', sans-serif" }}>
                        Click to view full image <ArrowRight size={10} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <GalleryLightbox item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
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
          {/* Updated heading */}
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 12px" }}>
            What I manage across the marketing function
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
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", lineHeight: 1.65, color: card.textColor === "#fff" ? "rgba(255,255,255,0.7)" : card.textColor === "#C7F36B" ? "rgba(23,23,23,0.7)" : "rgba(23,23,23,0.6)" }}>
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
  // Repeat tools enough times for a seamless scroll
  const repeated = [...tools, ...tools, ...tools, ...tools, ...tools, ...tools, ...tools, ...tools];
  return (
    <div className="overflow-hidden py-2">
      <motion.div className="flex items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {repeated.map((tool, i) => (
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
    <section id="tools" className="py-24 overflow-hidden" style={{ background: "#F7F2E8" }}>
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
    <section id="about" className="py-24 px-6" style={{ background: "#C7B8FF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(23,23,23,0.45)" }}>ABOUT</span>
          {/* Updated heading */}
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 32px" }}>
            From customer conversations to integrated <br />marketing leadership.
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Updated copy */}
            <div className="space-y-4">
              {[
                "My career has evolved across different sides of the business — from pre-sales and customer engagement to account coordination, digital marketing, and now integrated marketing operations. This journey has given me a practical understanding of how customers think, how sales teams operate, how creative and digital teams deliver, and how marketing needs to connect all of these moving parts.",
                "I started in pre-sales, working closely with customers, sales and technical teams on lead qualification, requirements, proposals and follow-ups. At MIT-SDE, I moved into a consultative role where I managed high volumes of prospective customers, supported them through their decision-making journey and worked across CRM communication, webinars, conversions and post-sales engagement. These early roles built my foundation in communication, relationship management and understanding customer needs.",
                "At Outkreate, my career moved deeper into marketing. I managed US-focused client accounts while working across content, email campaigns, webinars and digital initiatives. Acting as the bridge between clients and internal creative teams taught me how to translate business requirements into clear briefs, guide execution, manage feedback and approvals, and take ownership of projects from requirement to final delivery.",
                "Today, at Ambit Software, my role spans integrated marketing, corporate communications and marketing operations across B2B technology and BFSI. I manage multiple marketing workstreams covering corporate events, digital campaigns, website and SEO initiatives, CRM and email marketing, content, vendors, budgets and stakeholder communication. A major part of my role is bringing people and processes together — working across leadership, sales, creative, development teams, partners and vendors to keep marketing initiatives aligned and moving towards execution.",
                "Working across IT services, BFSI, EdTech and service-led businesses has also shaped the way I approach marketing. Different industries have taught me to adapt quickly, understand unfamiliar products and audiences, and communicate value in ways that are relevant to the business.",
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

// ─── Professional SWOT (new section) ─────────────────────────────────────────
function SWOT() {
  const quadrants = [
    {
      label: "Strengths",
      color: "#3D5AFE",
      textColor: "#fff",
      accentColor: "rgba(255,255,255,0.15)",
      icon: "↑",
      copy: "My strongest capabilities lie in implementation, marketing operations and execution. I am skilled at coordinating people, processes, campaigns and events while ensuring that requirements move towards timely delivery. I am also a quick learner who can understand new industries, technologies and business concepts and translate them into effective content, website updates and creative direction.",
    },
    {
      label: "Development Areas",
      color: "#FF6B5E",
      textColor: "#fff",
      accentColor: "rgba(255,255,255,0.15)",
      icon: "→",
      copy: "I am continuously working on strengthening my professional vocabulary and communicating complex ideas more precisely. At times, I may need additional time to understand unfamiliar requirements, become impatient when progress is delayed or feel nervous when an issue does not have an immediate solution.",
    },
    {
      label: "Opportunities",
      color: "#C7F36B",
      textColor: "#171717",
      accentColor: "rgba(23,23,23,0.08)",
      icon: "◇",
      copy: "I see strong opportunities in learning emerging marketing tools, AI platforms, automation techniques and analytics capabilities. Strengthening my strategic planning, data interpretation and leadership communication will help me complement my execution expertise and progress into broader marketing roles.",
    },
    {
      label: "Threats",
      color: "#171717",
      textColor: "#F7F2E8",
      accentColor: "rgba(247,242,232,0.07)",
      icon: "△",
      copy: "Rapid changes in marketing technology and increasing competition make continuous learning essential. There is also a risk of being perceived mainly as an execution-focused professional, making it important to demonstrate my leadership, strategic contribution and measurable business impact.",
    },
  ];

  return (
    <section id="swot" className="py-24 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E" }}>PROFESSIONAL SWOT</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#171717", margin: "14px 0 12px" }}>
            Understanding How I Work and Grow
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(23,23,23,0.55)", maxWidth: "560px", lineHeight: 1.7 }}>
            A clear understanding of my strengths, development areas and future opportunities helps me continuously improve as a marketing professional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {quadrants.map((q, i) => (
            <motion.div
              key={q.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl p-8 transition-transform hover:-translate-y-1 hover:shadow-xl"
              style={{ background: q.color, minHeight: "220px" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: q.accentColor, color: q.textColor, fontFamily: "'Manrope', sans-serif" }}>
                  {q.icon}
                </span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, color: q.textColor, margin: 0 }}>
                  {q.label}
                </h3>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.75, color: q.textColor === "#fff" ? "rgba(255,255,255,0.8)" : q.textColor === "#F7F2E8" ? "rgba(247,242,232,0.75)" : "rgba(23,23,23,0.72)" }}>
                {q.copy}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Summary statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 text-center"
          style={{ background: "#171717" }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(247,242,232,0.7)", maxWidth: "640px", margin: "0 auto" }}>
            My goal is to build on my strength in execution while continuously developing the strategic, communication and leadership capabilities required for broader marketing roles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  const certs = ["HubSpot Social Media Certification", "HubSpot Email Marketing Certification", "Digital Marketing Certification from LIPS India"];
  return (
    <section id="education" className="py-20 px-6" style={{ background: "#F7F2E8" }}>
      <div className="max-w-5xl mx-auto">
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "#FF6B5E", display: "block", marginBottom: "24px" }}>EDUCATION & CERTIFICATIONS</span>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { degree: "MBA IN MARKETING", school: "MIT World Peace University", year: "2017–2019" },
            { degree: "BBA IN MARKETING", school: "DCCL, Latur", year: "2014–2017" },
          ].map((ed, index) => (
            <div key={ed.degree} className="rounded-2xl p-6" style={{ background: index === 0 ? "#C7F36B" : "#C7B8FF" }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(23,23,23,0.5)", marginBottom: "10px" }}>{ed.degree}</div>
              <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "15px", fontWeight: 800, color: "#171717", marginBottom: "6px" }}>{ed.school}</h4>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(23,23,23,0.6)" }}>{ed.year}</span>
            </div>
          ))}
          <div className="rounded-2xl p-6" style={{ background: "#FF6B5E" }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", marginBottom: "10px" }}>CERTIFICATIONS</div>
            <div className="space-y-2.5">
              {certs.map((c) => (
                <div key={c} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]" style={{ background: "#F7F2E8" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{c}</span>
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
            <a href="https://www.linkedin.com/in/shreya-k-/" target="_blank" rel="noopener noreferrer"
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
          Structure with clarity. Communication with purpose. Execution with consistency.
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
  const marqueeItems = ["MARKETING OPERATIONS", "CORPORATE COMMUNICATIONS", "INTEGRATED MARKETING", "BFSI EVENTS", "SEO & GROWTH", "CRM & CAMPAIGNS", "CONTENT", "STAKEHOLDER MANAGEMENT"];

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
      {/* New section order: Journey → Tools → About → SWOT → Education → Contact */}
      <Journey />
      <Tools />
      <About />
      <SWOT />
      <Education />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
