import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Palette, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Components } from "../components";

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-background" />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center gap-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <motion.div
              className="inline-flex rounded-full bg-gradient-primary px-4 py-1.5 text-sm font-medium text-foreground"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Open Source Component Library
            </motion.div>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Beautiful React Components
              <span className="bg-gradient-primary bg-clip-text text-primary">
                {" "}
                Ready to Use
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-foreground sm:text-xl">
              A collection of reusable, accessible, and beautifully designed
              React components. Built with Framer Motion, shadcn/ui, and
              Tailwind CSS.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary hover:text-primary-foreground hover:opacity-90 "
            >
              <Link to="/components">
                Browse Components
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/docs">Read Documentation</Link>
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 px-4 xl:px-0 grid w-full max-w-5xl gap-6 grid-cols-1 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/50"
              >
                <div className="mb-4 inline-flex rounded-lg bg-gradient-primary p-3">
                  <feature.icon className="h-6 w-6 text-foreground " />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/*components Section*/}
      <Components />
    </div>
  );
};

const features = [
  {
    icon: Code2,
    title: "Copy & Paste",
    description:
      "Browse components, copy the code, and paste into your project. It's that simple.",
  },
  {
    icon: Palette,
    title: "Customizable",
    description:
      "Built with a robust design system. Easily customize colors, animations, and styles.",
  },
  {
    icon: Zap,
    title: "Production Ready",
    description:
      "TypeScript support, accessibility built-in, and optimized for performance.",
  },
];
