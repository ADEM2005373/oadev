import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal, Code2, Cpu, Database, Zap, Layers, Server, ShieldCheck, ChevronRight, CheckCircle2, HelpCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

// Generated images
import heroBg from "@/assets/images/hero-bg.png";
import project1 from "@/assets/images/project-1.png";
import project2 from "@/assets/images/project-2.png";
import teamBg from "@/assets/images/team.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", project: "", budget: "" });
      toast({
        title: "Inquiry received",
        description: "We'll be in touch within 24 hours.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-primary rounded-sm rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <div className="w-2 h-2 bg-background -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Helix Labs</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#team" className="hover:text-primary transition-colors">Studio</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary hover:text-black transition-all rounded-none h-10 px-6">
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
              Accepting new clients for Q3
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-display leading-[1.05] tracking-tighter mb-8">
              We build systems that <span className="text-primary italic font-light">scale</span>, not prototypes that break.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
              A boutique engineering studio in Brooklyn. We partner with ambitious founders to engineer high-performance web platforms, SaaS products, and AI automation infrastructure.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 text-base h-14 px-8 rounded-none font-bold" asChild>
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

      {/* Logos */}
      <section className="py-12 border-y border-border/50 bg-white/[0.01]">
        <div className="container mx-auto px-6 overflow-hidden">
          <p className="text-xs text-center text-muted-foreground font-mono uppercase tracking-widest mb-8">Trusted by engineering teams at</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {["Acme Corp", "Nexus Data", "Ozone", "Vertex AI", "Polymath", "Quantum"].map((name, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={name} 
                className="text-xl font-display font-bold tracking-tight"
              >
                {name}
              </motion.div>
            ))}
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
              <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Technical depth across the stack.</h3>
            </div>
            <p className="text-muted-foreground max-w-md text-lg">We don't do marketing sites or templates. We write custom code for complex business problems.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Terminal className="h-8 w-8 text-primary" />,
                title: "SaaS & Web Platforms",
                desc: "Production-ready web applications built with React, Next.js, and Node. Architected for scale, speed, and maintainability from day one."
              },
              {
                icon: <Cpu className="h-8 w-8 text-primary" />,
                title: "AI Infrastructure",
                desc: "Custom LLM integrations, RAG pipelines, and automated workflows. We turn AI research papers into reliable production systems."
              },
              {
                icon: <Database className="h-8 w-8 text-primary" />,
                title: "Data Engineering",
                desc: "High-throughput data pipelines, real-time analytics dashboards, and robust backend architectures that don't fall over under load."
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
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Process</h2>
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
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Selected Work</h2>
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
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
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
              <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">The Studio</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-8">Engineers, not agencies.</h3>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                <p>
                  Most agencies operate like assembly lines, handing your vision down a chain of account managers, designers, and junior devs until it barely resembles the original idea.
                </p>
                <p>
                  We are a small, senior team based in Brooklyn. When you work with Helix Labs, you speak directly with the engineers architecting your system. No bloat, no middle-men.
                </p>
                <p>
                  We take pride in writing clean, performant code. We obsess over edge cases, database indexing, and network waterfalls so you don't have to. We treat your product like it's our own.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8 pt-10 border-t border-border">
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">12+</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">40+</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase">Products Shipped</div>
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
                <p className="font-display font-bold text-xl md:text-2xl mb-4">"They saved us 6 months of runway. Period."</p>
                <p className="text-sm text-muted-foreground font-mono">— Sarah Jenkins, CTO at Nexus</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 border-t border-border bg-white/[0.01]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">FAQ</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Common questions.</h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Do you work with early-stage startups?",
                a: "Yes, provided you have funding or revenue. We typically partner with Seed to Series B startups that need senior engineering velocity but aren't ready to hire a full internal team yet."
              },
              {
                q: "How do you price your projects?",
                a: "We work on a fixed-bid basis for well-scoped projects, or a weekly retainer for ongoing product development. Our minimum engagement is $25,000. We don't do hourly billing."
              },
              {
                q: "What is your typical tech stack?",
                a: "We default to Next.js/React on the frontend, Node.js or Python on the backend, and PostgreSQL for data. For AI work, we use OpenAI, Anthropic, Pinecone, and LangChain. We choose boring, scalable tech over hype."
              },
              {
                q: "Do you offer design services?",
                a: "We are an engineering-first studio. While we handle technical UI/UX implementation and systems design, for highly branded marketing sites we recommend working with a dedicated brand agency."
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
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">Let's build<br/>something <span className="italic font-light">real.</span></h2>
              <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-md font-medium leading-snug">
                Tell us about your technical challenges. We'll tell you honestly if we're the right team to solve them.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-6">
                  <div className="w-3 h-3 bg-primary-foreground rounded-none" />
                  <span className="font-mono text-base uppercase font-bold tracking-wider">hello@helixlabs.dev</span>
                </div>
                <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-6">
                  <div className="w-3 h-3 bg-primary-foreground rounded-none" />
                  <span className="font-mono text-base uppercase font-bold tracking-wider">Brooklyn, NY</span>
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
                    className="mt-4 rounded-none border-border hover:bg-primary hover:text-black"
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit another
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-display font-bold mb-8">Project Inquiry</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name</label>
                        <Input 
                          required 
                          value={formState.name}
                          onChange={e => setFormState({...formState, name: e.target.value})}
                          className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none h-14 text-base" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email</label>
                        <Input 
                          required 
                          type="email"
                          value={formState.email}
                          onChange={e => setFormState({...formState, email: e.target.value})}
                          className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none h-14 text-base" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Budget Range</label>
                      <select 
                        required
                        value={formState.budget}
                        onChange={e => setFormState({...formState, budget: e.target.value})}
                        className="w-full bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none h-14 px-4 outline-none appearance-none text-base"
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="25-50k">$25k - $50k</option>
                        <option value="50-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project Details</label>
                      <Textarea 
                        required
                        value={formState.project}
                        onChange={e => setFormState({...formState, project: e.target.value})}
                        className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none min-h-[150px] resize-none text-base p-4" 
                        placeholder="Tell us about the problem you're trying to solve..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-16 bg-primary text-black hover:bg-white rounded-none text-lg font-bold transition-colors mt-4"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"} {!isSubmitting && <ArrowUpRight className="ml-2 w-6 h-6" />}
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
            <div className="w-5 h-5 bg-primary rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-background -rotate-45" />
            </div>
            <span className="font-display font-bold tracking-tight text-lg">Helix Labs © {new Date().getFullYear()}</span>
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
