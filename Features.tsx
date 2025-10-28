import { Card } from "@/components/ui/card";
import { Shield, Activity, Search, Zap, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Block Explorer",
    description: "Paste any transaction hash and get instant plain-English explanations of swaps, liquidity pools, and MEV activities.",
    color: "from-cosmic-purple to-cosmic-blue",
  },
  {
    icon: Zap,
    title: "Portfolio Manager",
    description: "Execute complex DeFi operations with simple commands. 'Get 10% yield' or 'Swap half OSMO to USDC' - we handle the rest.",
    color: "from-cosmic-blue to-cosmic-cyan",
  },
  {
    icon: Shield,
    title: "Smart Contract Auditor",
    description: "AI scans CosmWasm and SDK contracts for vulnerabilities including ICA issues, IBC bugs, and replay attacks.",
    color: "from-cosmic-cyan to-cosmic-pink",
  },
  {
    icon: Activity,
    title: "Chain Health Monitor",
    description: "Predictive analytics for validator performance, network upgrades, and potential issues before they impact you.",
    color: "from-cosmic-pink to-cosmic-purple",
  },
  {
    icon: Globe,
    title: "IBC Intelligence",
    description: "Navigate cross-chain transactions with ease. Track IBC transfers and optimize routes automatically.",
    color: "from-cosmic-purple to-cosmic-blue",
  },
  {
    icon: Lock,
    title: "Security First",
    description: "Built with enterprise-grade security. Your keys never leave your device, all operations are transparent.",
    color: "from-cosmic-blue to-cosmic-cyan",
  },
];

export const Features = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-cyan">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge AI to make Cosmos blockchain accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="p-6 bg-card/30 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-cosmic`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
