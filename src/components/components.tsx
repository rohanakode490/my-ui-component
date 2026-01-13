import { components } from "@/data/components-data";
import { ComponentCard } from "./component-card";

export const Components = () => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {components.map((component, index) => (
          <ComponentCard component={component} index={index} />
        ))}
      </div>
    </div>
  );
};
