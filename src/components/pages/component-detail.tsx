import { components } from "@/data/components-data";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CopyButton } from "../ui/copy-button";
import { ShikiHighlighter } from "react-shiki";

export const ComponentDetail = () => {
  const { id } = useParams();
  const component = components.find((component) => component.id === id);

  if (!component) {
    return <div>Not Found</div>;
  }
  const PreviewComponent = component.preview;

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto text-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button asChild variant="ghost" className="mb-6">
            <Link to={"/"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Components
            </Link>
          </Button>

          <div className="mb-8">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-bold">{component.name}</h1>
                <p className="text-lg text-muted-foreground">
                  {component.description}
                </p>
              </div>
              <Badge className="bg-primary text-sm">{component.category}</Badge>
            </div>
          </div>

          <Tabs defaultValue="preview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>See the component in Action</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex min-h-[300px] justify-center items-center rounded-lg border-border/50 bg-muted/30 p-12">
                    {PreviewComponent ? (
                      <PreviewComponent />
                    ) : (
                      <div className="text-center">
                        <div className="mb-4 text-sm text-muted-foreground">
                          Component preview coming soon
                        </div>
                        <Badge className="bg-primary">{component.name}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Installation & Usage</CardTitle>
                  <CardDescription>{component.usage}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/*Install Code*/}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      Install Dependencies
                    </h4>
                    <div className="space-y-2">
                      {component.installation.map((cmd) => (
                        <div key={cmd} className="relative">
                          <CopyButton
                            text={cmd}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                          />
                          <ShikiHighlighter
                            theme="monokai"
                            language="bash"
                            showLanguage={false}
                            style={{
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                              border: "1px solid hsl(var(--border) / 0.5)",
                            }}
                          >
                            {cmd}
                          </ShikiHighlighter>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/*React Code*/}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      Component Code
                    </h4>
                    <div className="relative">
                      <CopyButton
                        text={component.code}
                        className="absolute right-2 top-2 z-10"
                      />
                      <ShikiHighlighter
                        theme="monokai"
                        language="tsx"
                        showLanguage={false}
                        style={{
                          borderRadius: "0.5rem",
                          fontSize: "0.875rem",
                          border: "1px solid hsl(var(--border) / 0.5)",
                        }}
                      >
                        {component.code}
                      </ShikiHighlighter>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
