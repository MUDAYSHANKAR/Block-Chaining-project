import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Transactions Analyzed",
    value: "2.4M+",
    change: "+18% this month",
  },
  {
    label: "Contracts Audited",
    value: "1,200+",
    change: "100% security score",
  },
  {
    label: "Portfolio Commands",
    value: "45K+",
    change: "$12M in volume",
  },
  {
    label: "Active Users",
    value: "8,500+",
    change: "Growing daily",
  },
];

export const Stats = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="p-6 bg-card/40 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <TrendingUp className="w-4 h-4 text-cosmic-cyan" />
              </div>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cosmic mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
