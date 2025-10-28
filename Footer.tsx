import { Github, Twitter, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-primary/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-cosmic">
              Artificial Cosmos Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-powered tools for the Cosmos ecosystem. Built by developers, for developers.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-cosmic-purple cursor-pointer transition-colors">AI Block Explorer</li>
              <li className="hover:text-cosmic-purple cursor-pointer transition-colors">Portfolio Manager</li>
              <li className="hover:text-cosmic-purple cursor-pointer transition-colors">Contract Auditor</li>
              <li className="hover:text-cosmic-purple cursor-pointer transition-colors">Chain Monitor</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-cosmic-purple transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cosmic-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cosmic-purple transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>© 2025 Artificial Cosmos Intelligence. Built on Lovable.</p>
        </div>
      </div>
    </footer>
  );
};
