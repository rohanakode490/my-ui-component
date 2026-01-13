import { Heart } from "lucide-react";
import { GithubIcon } from "./assets/github-icon";
import { XIcon } from "./assets/x-icon";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 fill-primary text-primary" />{" "}
            using React, Framer Motion, and shadcn/ui
          </p>
          <div className="flex items-center gap-4 pr-2">
            <a
              href="https://github.com/rohanakode490"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <GithubIcon />
            </a>
            <a
              href="https://x.com/rohanakode7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <XIcon className="text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
