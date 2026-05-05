import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Terminal, Code2, Cpu, Database, Zap, Layers, Server, ShieldCheck, ChevronRight, CheckCircle2, ArrowUpRight, Palette, Briefcase, Brain, Box, Network, Cloud, Lock, ChartBar } from "lucide-react";
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

const strengths = [
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Sécurité & Fiabilité",
    desc: "Nous appliquons les standards de sécurité les plus stricts pour protéger vos données et assurer une disponibilité maximale de vos systèmes."
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Performance Maximale",
    desc: "Des architectures optimisées, des temps de réponse ultra-rapides et une efficacité énergétique pensée dès la conception."
  },
  {
    icon: <ChartBar className="w-6 h-6 text-primary" />,
    title: "Architecture Scalable",
    desc: "Nos solutions sont construites pour évoluer avec votre entreprise, supportant sans faille votre croissance future."
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
        title: "Demande envoyée",
        description: "Nous vous contacterons sous 24h.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur d'envoi";
      toast({
        title: "Échec de l'envoi",
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
                src="/logo%20.png"
                alt="OA-DEV Logo"
                className="w-16 h-16 object-contain opacity-100 saturate-125 contrast-110 drop-shadow-[0_0_22px_rgba(46,101,149,0.7)]"
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">OA-DEV</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#forces" className="hover:text-primary transition-colors">Nos Forces</a>
            <a href="#services" className="hover:text-primary transition-colors">Expertise</a>
            <a href="#technologies" className="hover:text-primary transition-colors">Technologies</a>
            <a href="#process" className="hover:text-primary transition-colors">Méthodologie</a>
            <a href="#work" className="hover:text-primary transition-colors">Réalisations</a>
          </div>
          <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-none h-10 px-6">
            <a href="#contact">Démarrer un projet</a>
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
            className="max-w-5xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-wider mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Ingénierie Logicielle & Développement d'Entreprise
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-display leading-[1.05] tracking-tighter mb-8">
              Solutions Digitales & <span className="text-primary italic font-light">Ingénierie</span> d'Excellence.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed font-light">
              OA-DEV accompagne les entreprises dans leur transformation technologique à travers des plateformes web robustes, l'intégration d'Intelligence Artificielle avancée et le développement de systèmes logiciels sur-mesure.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base h-14 px-8 rounded-none font-bold" asChild>
                <a href="#contact">
                  Planifier une consultation <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-none text-base border-border hover:bg-white/5" asChild>
                <a href="#forces">Découvrir nos atouts</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nos Forces (Strengths) */}
      <section id="forces" className="py-20 md:py-24 px-6 border-y border-border/50 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(46,101,149,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">01 / Nos Forces</p>
              <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Pourquoi choisir OA-DEV ?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Une approche centrée sur la qualité, la fiabilité technique et la valeur ajoutée pour votre entreprise.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {strengths.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group border border-border bg-card/40 backdrop-blur p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="mb-5 p-3 bg-primary/10 inline-block rounded-none">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-display font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
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
              <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">02 / Notre Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Qualité et Maîtrise de bout en bout.</h3>
            </div>
            <p className="text-muted-foreground max-w-md text-lg">Nos services sont conçus pour offrir des résultats tangibles, durables et alignés sur les exigences du monde professionnel.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="h-8 w-8 text-primary" />,
                title: "Développement Web d'Entreprise",
                desc: "Création de plateformes web hautement performantes, applications SaaS et portails B2B avec une architecture moderne."
              },
              {
                icon: <Brain className="h-8 w-8 text-primary" />,
                title: "Intelligence Artificielle & Automatisation",
                desc: "Intégration de LLMs (GPT, Claude), agents conversationnels intelligents et automatisation des flux de travail complexes."
              },
              {
                icon: <Box className="h-8 w-8 text-primary" />,
                title: "Ingénierie Logicielle & Systèmes",
                desc: "Développement de logiciels métiers sur-mesure, ERP, CRM et outils de gestion internes robustes."
              },
              {
                icon: <Cloud className="h-8 w-8 text-primary" />,
                title: "Infrastructure & Cloud",
                desc: "Déploiement cloud, DevOps, CI/CD et gestion d'infrastructures scalables et sécurisées."
              },
              {
                icon: <Palette className="h-8 w-8 text-primary" />,
                title: "UX/UI Design Premium",
                desc: "Interfaces utilisateurs élégantes, modernes et pensées pour maximiser l'engagement et la conversion."
              },
              {
                icon: <Briefcase className="h-8 w-8 text-primary" />,
                title: "Conseil & Stratégie Technologique",
                desc: "Audit technique, choix des architectures, et accompagnement stratégique pour vos décisions informatiques."
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

      {/* Maîtrise des Technologies (Tech Stack) */}
      <section id="technologies" className="py-24 md:py-32 px-6 border-t border-border relative overflow-hidden">
        <div className="container mx-auto z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">03 / Maîtrise Technologique</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Construit avec les meilleurs outils.</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">Nous utilisons les technologies les plus avancées et fiables de l'industrie pour garantir la pérennité de vos projets.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="border border-border p-8 bg-card relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Layers className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-4 font-display">Frontend</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> React & Next.js</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> TypeScript</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Tailwind CSS</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Framer Motion</li>
                </ul>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-border p-8 bg-card relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Server className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-4 font-display">Backend</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Node.js & Express</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Python & FastAPI</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Rust</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> PostgreSQL & Redis</li>
                </ul>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="border border-border p-8 bg-card relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Brain className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-4 font-display">IA & Data</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> OpenAI & Anthropic API</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> RAG & Vector DBs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> LangChain</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Modèles Open Source</li>
                </ul>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="border border-border p-8 bg-card relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Cloud className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-4 font-display">Infrastructure</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Vercel & AWS</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Docker & CI/CD</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Cloudflare</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary"/> Monitoring de Performance</li>
                </ul>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-border/50 overflow-hidden bg-primary text-primary-foreground relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex w-1/2 justify-around items-center font-display text-2xl md:text-3xl font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-3"><Code2 className="w-8 h-8"/> TypeScript</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><Layers className="w-8 h-8"/> Next.js</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><Brain className="w-8 h-8"/> IA Intégrée</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3"><Database className="w-8 h-8"/> Architecture Robuste</span>
            </div>
          ))}
        </div>
      </section>

      {/* Processus de Développement de l'Entreprise */}
      <section id="process" className="py-24 md:py-32 px-6 border-t border-border bg-white/[0.01]">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">04 / Notre Méthodologie</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Le Développement d'Entreprise, maîtrisé.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-6xl mx-auto">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border -z-10" />
            {[
              { num: "01", title: "Cadrage Stratégique", desc: "Analyse approfondie de vos objectifs métiers, de vos contraintes techniques et de votre marché." },
              { num: "02", title: "Architecture & Sécurité", desc: "Conception de l'architecture système, des modèles de données et des protocoles de sécurité avant toute ligne de code." },
              { num: "03", title: "Développement Agile", desc: "Itérations rapides, intégration continue et démonstrations régulières pour une transparence totale." },
              { num: "04", title: "Déploiement & Pérennité", desc: "Mise en production sécurisée, documentation complète et transfert de compétences pour une maintenance sereine." }
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="relative bg-background pt-8 md:pt-0"
              >
                <div className="w-12 h-12 bg-card border border-primary flex items-center justify-center font-mono text-primary font-bold mb-6 mx-auto md:mx-0 shadow-[0_0_15px_rgba(46,101,149,0.3)]">
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
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">05 / Réalisations</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Excellence en Production.</h3>
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
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-mono mb-6 bg-white/5 uppercase tracking-wider text-primary">
                  FinTech • Dashboard B2B
                </div>
                <h4 className="text-3xl md:text-5xl font-display font-bold mb-6">LedgerFlow</h4>
                <p className="text-xl text-muted-foreground mb-8 font-light">Moteur de réconciliation financière en temps réel à haute performance.</p>
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary/50 shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">Le Défi</strong>
                      <p className="text-foreground/80 leading-relaxed">Moderniser un processus de réconciliation manuel chronophage, sujette aux erreurs humaines, pour une institution financière majeure.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">La Solution</strong>
                      <p className="text-foreground leading-relaxed">Développement d'une plateforme sécurisée réduisant le temps de traitement de 14 heures à 47 secondes avec une fiabilité de 99.99%.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-card border border-border text-xs font-mono">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 border border-border p-2 bg-card relative group overflow-hidden shadow-xl">
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
              <div className="lg:col-span-7 border border-border p-2 bg-card relative group overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-10 mix-blend-overlay" />
                <img src={project2} alt="Synapse AI Interface" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-mono mb-6 bg-white/5 uppercase tracking-wider text-primary">
                  Intelligence Artificielle • Automatisation
                </div>
                <h4 className="text-3xl md:text-5xl font-display font-bold mb-6">Synapse Node</h4>
                <p className="text-xl text-muted-foreground mb-8 font-light">Interface de programmation visuelle pour les flux de travail complexes d'agents LLM.</p>
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary/50 shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">Le Défi</strong>
                      <p className="text-foreground/80 leading-relaxed">Démocratiser la création d'agents d'intelligence artificielle pour des équipes non techniques sans compromettre la puissance.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-primary shrink-0" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-widest text-primary mb-2">La Solution</strong>
                      <p className="text-foreground leading-relaxed">Une architecture cloud native supportant des millions d'inférences par semaine, accélérant l'adoption de l'IA à l'échelle de l'entreprise.</p>
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
              <p className="text-xs font-mono uppercase tracking-widest opacity-80 mb-6">06 / Contact</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">Concrétisons<br/>votre <span className="italic font-light">vision.</span></h2>
              <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-md font-medium leading-snug">
                Discutons de votre projet de développement web, d'intégration IA ou de transformation digitale.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-6">
                  <div className="w-3 h-3 bg-primary-foreground rounded-none" />
                  <a
                    href="mailto:oa.for.dev@gmail.com"
                    className="font-mono text-base uppercase font-bold tracking-wider hover:opacity-80 transition-opacity"
                  >
                    oa.for.dev@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-6">
                  <div className="w-3 h-3 bg-primary-foreground rounded-none" />
                  <a
                    href="tel:+21629763603"
                    className="font-mono text-base uppercase font-bold tracking-wider hover:opacity-80 transition-opacity"
                  >
                    +216 29 763 603
                  </a>
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
                  <h3 className="text-3xl font-display font-bold">Demande Reçue</h3>
                  <p className="text-muted-foreground text-lg max-w-xs">
                    Merci. L'un de nos ingénieurs analysera votre demande et vous contactera dans les plus brefs délais.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-none border-border hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setIsSuccess(false)}
                  >
                    Nouvelle demande
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-display font-bold mb-8">Démarrer un Projet</h3>
                  <p className="text-muted-foreground text-base -mt-4">
                    Remplissez ce formulaire et nous vous répondrons sous 24h.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Nom</label>
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
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Détails du projet</label>
                      <Textarea
                        required
                        value={formState.project}
                        onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                        className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none min-h-[150px] resize-none text-base p-4"
                        placeholder="Décrivez vos besoins, objectifs et enjeux technologiques..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-lg font-bold transition-colors mt-4"
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}{" "}
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
                src="/logo%20.png"
                alt="OA-DEV"
                className="w-14 h-14 object-contain opacity-100 saturate-125 contrast-110 drop-shadow-[0_0_20px_rgba(46,101,149,0.65)]"
              />
            </div>
            <span className="font-display font-bold tracking-tight text-lg">OA-DEV © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground font-mono uppercase tracking-wider">
            <a href="https://github.com/OA-FOR-DEV" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://x.com/OAFORDEV" className="hover:text-primary transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/in/oa-dev-b41726407/" className="hover:text-primary transition-colors">LinkedIn</a>
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
