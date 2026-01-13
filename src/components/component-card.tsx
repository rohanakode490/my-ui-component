import type { Component } from "@/data/components-data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

type ComponentProp = {
  component: Component;
  index: number;
};

export const ComponentCard = ({ component, index }: ComponentProp) => {
  const PreviewComponent = component.preview;
  return (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/*Preview Section*/}
      <div className="group border border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg h-full flex flex-col">
        <div className="p-8 bg-muted/30 flex justify-center items-center min-h-[200px]">
          <PreviewComponent />
        </div>

        {/*Information Section*/}
        <Link
          to={`/component/${component.id}`}
          className="group/link p-6 flex-1 cursor-pointer transition-colors relative overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {component.name}
            </h3>
            <Badge variant="secondary" className="shrink-0">
              {component.category}
            </Badge>
          </div>
          {/* Hover arrow overlay - right side with blur background */}
          <div className="absolute inset-y-0 right-2 left-3/4 flex items-center opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="ml-auto h-full w-full flex items-center justify-end px-6 backdrop-blur-sm bg-background/60">
              <span className="text-2xl font-bold text-primary">&gt;</span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
