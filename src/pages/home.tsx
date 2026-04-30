import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Terminal, Code2, Cpu, Database, Zap, Layers, Server, ShieldCheck, ChevronRight, CheckCircle2, HelpCircle, ArrowUpRight, Palette, Briefcase, Wrench, Brain, Box, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendInquiry } from "@/lib/contact";

// Generated images
import heroBg from "@/assets/images/hero-bg.png";
import project1 from "@/assets/images/project-1.png";
import project2 from "@/assets/images/project-2.png";
import teamBg from "@/assets/images/team.png";

const appEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: appEase } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const signals = [
  {
    ref: "Ref. 01",
    date: "Apr 2026",
    title: "Security-first builds",
    desc: "Sensible defaults, OWASP-minded reviews, and secure deployment practices from day one."
  },
  {
    ref: "Ref. 02",
    date: "Apr 2026",
    title: "Performance budgets",
    desc: "Fast by design: image discipline, caching, and measurable performance targets on every release."
  },
  {
    ref: "Ref. 03",
    date: "Apr 2026",
    title: "Clean UX systems",
    desc: "Consistent components, accessible patterns, and brand-aligned visuals that feel premium."
  }
];

export default function Home() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({ name: "", email: "", project: "", budget: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendInquiry(formState);
      setIsSuccess(true);
      setFormState({ name: "", email: "", project: "", budget: "" });
      toast({
        title: "Inquiry received",
        description: "We'll be in touch within 24 hours.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send inquiry";
      toast({
        title: "Could not send",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="p-1 rounded-md bg-primary/5 border border-primary/15 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <img
                src="/logo.png"
                alt="OA-DEV"
                className="w-16 h-16 object-contain opacity-100 saturate-125 contrast-110 drop-shadow-[0_0_22px_rgba(46,101,149,0.7)]"
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">OA-DEV</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#team" className="hover:text-primary transition-colors">Studio</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-none h-10 px-6">
            <a href="#contact">Start a Project</a>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover object-center mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </motion.div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-wider mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              OA-DEV Studio · v2026 · Open for projects
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-display leading-[1.05] tracking-tighter mb-8">
              Fresh studio. <span className="text-primary italic font-light">Serious</span> code.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
              OA-DEV is a young development studio offering web design, web & AI development, software systems, IT services, and digital consulting. We are 2 months in, hungry, and building real products for real clients.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base h-14 px-8 rounded-none font-bold" asChild>
                <a href="#contact">
                  Book a Discovery Call <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-none text-base border-border hover:bg-white/5" asChild>
                <a href="#work">View our work</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Signals */}
      <section className="py-20 md:py-24 px-6 border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(46,101,149,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">01 / Signals</p>
              <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Proof of work, in public.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Short, practical updates about how we build: quality, performance, and product thinking.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {signals.map((item) => (
                <motion.a
                  key={item.ref}
                  href="#contact"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group border border-border bg-card/40 backdrop-blur p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{item.ref}</span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{item.date}</span>
                  </div>
                  <h4 className="text-xl font-display font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
                  <div className="inline-flex items-center text-sm font-mono uppercase tracking-widest text-primary">
                    Talk to us <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 px-6 bg-grid-pattern relative">
        <div className="absolute inset-0 bg-background/90" />
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">02 / Services</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Everything your project needs, under one roof.</h3>
            </div>
            <p className="text-muted-foreground max-w-md text-lg">From the first wireframe to the last deployed line of code — design, development, AI, and IT support, all handled by OA-DEV.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Palette className="h-8 w-8 text-primary" />,
                title: "Web Design",
                desc: "Modern, responsive, and conversion-focused interfaces. Wireframes, mockups, and pixel-perfect UI crafted for your brand."
              },
              {
                icon: <Code2 className="h-8 w-8 text-primary" />,
                title: "Web Development",
                desc: "Custom websites, landing pages, dashboards, and e-commerce built with React, Next.js, and modern frameworks."
              },
              {
                icon: <Brain className="h-8 w-8 text-primary" />,
                title: "AI Development",
                desc: "Chatbots, LLM integrations, automation flows, and AI-powered features tailored to your business."
              },
              {
                icon: <Box className="h-8 w-8 text-primary" />,
                title: "Software & Systems",
                desc: "Custom internal tools, management software, and back-office systems that fit how you actually work."
              },
              {
                icon: <Network className="h-8 w-8 text-primary" />,
                title: "IT & Information Services",
                desc: "Hosting, deployment, domain setup, email, and ongoing technical maintenance — your IT department on call."
              },
              {
                icon: <Briefcase className="h-8 w-8 text-primary" />,
                title: "Tech Consulting",
                desc: "Architecture reviews, stack selection, and digital strategy. Honest advice before you spend on the wrong solution."
              }
            ].map((service, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                key={i} 
                className="p-8 border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors group"
              >
                <div className="mb-6 p-4 bg-white/5 inline-block group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold font-display mb-4">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 md:py-32 px-6 border-t border-border bg-white/[0.01]">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">03 / Process</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight max-w-2xl">How we ship.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border -z-10" />
            {[
              { num: "01", title: "Discovery", desc: "We map your technical constraints, business goals, and architecture requirements." },
              { num: "02", title: "Architecture", desc: "We design the data models, API contracts, and system architecture before writing code." },
              { num: "03", title: "Development", desc: "Sprint-based delivery with continuous integration and weekly demo calls." },
              { num: "04", title: "Handoff", desc: "Full documentation, infrastructure deployment, and seamless team transfer." }
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="relative bg-background pt-8 md:pt-0"
              >
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center font-mono text-primary font-bold mb-6 mx-auto md:mx-0">
                  {step.num}
                </div>
                <h4 className="text-xl font-display font-bold mb-3 text-center md:text-left">{step.title}</h4>
                <p className="text-muted-foreground text-center md:text-left leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Case Studies */}
      <section id="work" className="py-24 md:py-32 px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">04 / Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Shipped to production.</h3>
          </motion.div>

          <div className="space-y-32 md:space-y-48">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-mono mb-6 bg-white/5">
                  FinTech • SaaS • Dashboard
                </div>
                <h4 className="text-3xl md:text-5xl font-display font-bold mb-6">LedgerFlow</h4>
                <p className="text-xl text-muted-foreground mb-8 font-light">Real-time financial reconciliation engine processing $40M+ daily.</p>
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary/50 shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">The Problem</strong>
                      <p className="text-foreground/80 leading-relaxed">Manual reconciliation took 14 hours per day using legacy excel sheets, severely bottlenecking operations and prone to costly human error.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">The Result</strong>
                      <p className="text-foreground leading-relaxed">Cut processing time to 47 seconds. Zero downtime since launch. Saved the client $320k annually in operational costs.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-card border border-border text-xs font-mono">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 border border-border p-2 bg-card relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-10 mix-blend-overlay" />
                <img src={project1} alt="LedgerFlow Dashboard" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 border border-border p-2 bg-card relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-10 mix-blend-overlay" />
                <img src={project2} alt="Synapse AI Interface" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-mono mb-6 bg-white/5">
                  AI • Automation • Infrastructure
                </div>
                <h4 className="text-3xl md:text-5xl font-display font-bold mb-6">Synapse Node</h4>
                <p className="text-xl text-muted-foreground mb-8 font-light">Visual programming interface for complex LLM agent workflows.</p>
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary/50 shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">The Problem</strong>
                      <p className="text-foreground/80 leading-relaxed">Prompt engineering was isolated to engineers; domain experts couldn't build workflows, creating a massive internal bottleneck.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">The Result</strong>
                      <p className="text-foreground leading-relaxed">Enabled non-technical teams to deploy 500+ custom agents in the first month. Scaled to 2M+ inference calls per week.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'Python', 'FastAPI', 'Vector DB', 'WebSockets'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-card border border-border text-xs font-mono">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-16 border-y border-border/50 overflow-hidden bg-primary text-primary-foreground relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex w-1/2 justify-around items-center font-display text-2xl md:text-4xl font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-3"><Code2 className="w-8 h-8"/> TypeScript</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><Layers className="w-8 h-8"/> Next.js</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><Server className="w-8 h-8"/> Node.js</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><Database className="w-8 h-8"/> PostgreSQL</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><ShieldCheck className="w-8 h-8"/> Rust</span>
            </div>
          ))}
        </div>
      </section>

      {/* About / Team */}
      <section id="team" className="py-24 md:py-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">05 / The Studio</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-8">Small team. Senior execution.</h3>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                <p>
                  OA-DEV launched 2 months ago with a simple idea: most small businesses don't need a giant agency — they need one team that genuinely cares about their project.
                </p>
                <p>
                  We are small, focused, and direct. When you work with us, you talk to the people actually writing your code and designing your screens. No layers, no middle-men, no upsells.
                </p>
                <p>
                  We're new, and that means we work harder. Every project we take on is a chance to prove ourselves, so we treat it like our own product.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8 pt-10 border-t border-border">
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">2 mo</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase">Studio Age</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">100%</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase">Founder-led work</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-card border border-border p-2">
                 <img src={teamBg} alt="Helix Labs Studio" className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-background border border-border p-6 md:p-8 max-w-sm shadow-2xl z-10">
                <div className="text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="inline-block w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
                <p className="font-display font-bold text-xl md:text-2xl mb-4">"Fast, friendly, and the site looks better than I imagined."</p>
                <p className="text-sm text-muted-foreground font-mono">— Sarah J., Local Business Owner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 border-t border-border bg-white/[0.01]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">06 / FAQ</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Common questions.</h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "You're a new studio — should I trust you with my project?",
                a: "Fair question. We're 2 months old, but we're transparent about it. We work fast, communicate daily, and price our first projects fairly so you take less risk on us. Every client we land now is one we plan to keep for years."
              },
              {
                q: "What kinds of projects do you take on?",
                a: "Web design and development, AI integrations, custom software and management systems, IT and hosting setup, and digital consulting. From a one-page site for a local shop to a full SaaS MVP — if it's on the web, we can build it."
              },
              {
                q: "How much does a project cost?",
                a: "It depends on scope. Simple websites start small, custom software and AI projects cost more. Tell us what you need in the form below and we'll send back an honest, itemized quote within 24 hours — no obligation."
              },
              {
                q: "Which technologies do you use?",
                a: "On the web we use React, Next.js, and Node.js. For AI we work with OpenAI, Anthropic, and modern automation tools. For hosting and IT we set up cloud infrastructure on Vercel, AWS, and similar providers. We pick the right tool for your project, not the trendiest one."
              },
              {
                q: "Do you offer ongoing maintenance after launch?",
                a: "Yes. We offer monthly support packages that cover bug fixes, updates, hosting, security patches, and small feature requests — so your project keeps running smoothly long after launch."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-lg md:text-xl font-display font-bold py-6 hover:text-primary transition-colors data-[state=open]:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-mono uppercase tracking-widest opacity-80 mb-6">07 / Contact</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">Let's start<br/>your <span className="italic font-light">project.</span></h2>
              <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-md font-medium leading-snug">
                Tell us what you need — website, software, AI, or technical guidance. We respond within 24 hours with clear next steps.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-6">
                  <div className="w-3 h-3 bg-primary-foreground rounded-none" />
                  <span className="font-mono text-base uppercase font-bold tracking-wider">hello@oa-dev.com</span>
                </div>
                <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-6">
                  <div className="w-3 h-3 bg-primary-foreground rounded-none" />
                  <span className="font-mono text-base uppercase font-bold tracking-wider">Open studio · Remote</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-background text-foreground p-8 md:p-12 border border-border shadow-2xl relative"
            >
              {isSuccess ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Inquiry Received</h3>
                  <p className="text-muted-foreground text-lg max-w-xs">
                    Thanks for reaching out. One of our lead engineers will review your details and get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-none border-border hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit another
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-display font-bold mb-8">Project Inquiry</h3>
                  <p className="text-muted-foreground text-base -mt-4">
                    Fill the form and we’ll reply within 24 hours with clear next steps.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name</label>
                        <Input
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none h-14 text-base"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email</label>
                        <Input
                          required
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none h-14 text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Budget Range</label>
                      <select
                        required
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none h-14 px-4 outline-none appearance-none text-base"
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="under-1k">Under $1k</option>
                        <option value="1-5k">$1k - $5k</option>
                        <option value="5-15k">$5k - $15k</option>
                        <option value="15k+">$15k+</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project Details</label>
                      <Textarea
                        required
                        value={formState.project}
                        onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                        className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none min-h-[150px] resize-none text-base p-4"
                        placeholder="Tell us about the problem you're trying to solve..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-lg font-bold transition-colors mt-4"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}{" "}
                      {!isSubmitting && <ArrowUpRight className="ml-2 w-6 h-6" />}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="p-1 rounded-md bg-primary/5 border border-primary/15 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <img
                src="/logo.png"
                alt="OA-DEV"
                className="w-14 h-14 object-contain opacity-100 saturate-125 contrast-110 drop-shadow-[0_0_20px_rgba(46,101,149,0.65)]"
              />
            </div>
            <span className="font-display font-bold tracking-tight text-lg">OA-DEV © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground font-mono uppercase tracking-wider">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Marquee Animation CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[marquee_20s_linear_infinite\\] {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}
