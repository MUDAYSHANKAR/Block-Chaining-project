import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Cosmos AI assistant. Ask me anything about transactions, blocks, or give me portfolio commands like 'Swap 100 ATOM to OSMO' or 'What's the status of transaction hash ABC123?'",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response for now
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: "I'm analyzing your request. In the full version, I'll connect to the Cosmos blockchain and AI services to provide real-time insights and execute commands.",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      toast.success("AI response received");
    }, 1500);
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cosmic-purple to-cosmic-cyan">
            AI Assistant
          </h2>
          <p className="text-muted-foreground">
            Ask questions, analyze transactions, or manage your portfolio with natural language
          </p>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-md border-primary/20 shadow-glow">
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-cosmic flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-cosmic"
                      : "bg-secondary/50"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-cosmic flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-secondary/50 p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cosmic-blue rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-cosmic-cyan rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about a transaction, request a swap, or analyze a contract..."
              className="bg-secondary/30 border-primary/20 focus:border-primary/50"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-cosmic hover:shadow-cosmic transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
