import { Button } from "@/components/ui/button";
import { Sparkles, Cpu, Database } from "lucide-react";
import heroImage from "@/assets/hero-cosmos.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-gradient-nebula bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse-glow" />
        <div className="absolute inset-0 bg-background/30" />
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cosmic-purple rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-6 animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-cosmic-purple" />
          <span className="text-sm font-medium text-foreground">AI Built for Cosmos Ecosystem</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-cyan animate-shimmer">
          Artificial Cosmos Intelligence
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Your intelligent assistant for the Cosmos blockchain. Natural language queries, smart portfolio management, and AI-powered contract auditing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="bg-gradient-cosmic hover:shadow-cosmic transition-all duration-300 group">
            <Cpu className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Start AI Chat
          </Button>
          <Button size="lg" variant="outline" className="border-primary/30 hover:bg-card/50 backdrop-blur-sm">
            <Database className="w-5 h-5 mr-2" />
            Explore Features
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "🔍",
              title: "AI Block Explorer",
              description: "Paste any transaction and get a plain-English explanation",
            },
            {
              icon: "💼",
              title: "Portfolio Manager",
              description: "Natural language commands for swaps, yields, and DeFi",
            },
            {
              icon: "🛡️",
              title: "Smart Contract Auditor",
              description: "AI-powered security analysis for CosmWasm contracts",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
