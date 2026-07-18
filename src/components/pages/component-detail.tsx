import { components } from '@/data/components-data';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { CopyButton } from '../ui/copy-button';
import { ShikiHighlighter } from 'react-shiki';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PhoneFrame } from '../ui/phone-frame';

export const ComponentDetail = () => {
  const { id } = useParams();
  const component = components.find((component) => component.id === id);
  const [platform, setPlatform] = useState<'web' | 'native'>('web');

  if (!component) {
    return <div>Not Found</div>;
  }
  const PreviewComponent =
    platform === 'native' && component.nativePreview
      ? component.nativePreview
      : component.preview;

  const usageText =
    platform === 'native' && component.nativeUsage
      ? component.nativeUsage
      : component.usage;

  const installationCmds =
    platform === 'native' && component.nativeInstallation
      ? component.nativeInstallation
      : component.installation;

  const codeToShow =
    platform === 'native' && component.nativeCode
      ? component.nativeCode
      : component.code;

  return (
    <div className='min-h-screen py-12'>
      <div className='container max-w-5xl mx-auto text-start'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button asChild variant='ghost' className='mb-6'>
            <Link to={'/'}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Components
            </Link>
          </Button>

          <div className='mb-8'>
            <div className='mb-4 flex items-start justify-between'>
              <div>
                <h1 className='mb-2 text-4xl font-bold'>{component.name}</h1>
                <p className='text-lg text-muted-foreground'>
                  {component.description}
                </p>
              </div>
              <Badge className='bg-primary text-sm'>{component.category}</Badge>
            </div>
          </div>

          <Tabs defaultValue='preview' className='space-y-6'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <TabsList className='grid w-[200px] grid-cols-2'>
                <TabsTrigger value='preview'>Preview</TabsTrigger>
                <TabsTrigger value='code'>Code</TabsTrigger>
              </TabsList>
              
              <div className='inline-flex bg-muted p-[3px] rounded-lg w-fit text-sm border'>
                <button
                  onClick={() => setPlatform('web')}
                  className={cn(
                    'px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer text-xs sm:text-sm',
                    platform === 'web'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Web
                </button>
                <button
                  onClick={() => setPlatform('native')}
                  className={cn(
                    'px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer text-xs sm:text-sm',
                    platform === 'native'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Mobile (React Native)
                </button>
              </div>
            </div>

            <TabsContent value='preview'>
              <Card className='border-border/50 bg-card/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle>Live Preview ({platform === 'web' ? 'Web' : 'React Native'})</CardTitle>
                  <CardDescription>See the component in Action</CardDescription>
                </CardHeader>

                <CardContent>
                  <div
                    className={cn(
                      'min-h-[400px] relative rounded-lg border-border/50 bg-muted/30 overflow-hidden flex items-center justify-center',
                      component.layout === 'fullscreen' ? 'p-0' : 'p-12'
                    )}
                  >
                    {PreviewComponent ? (
                      platform === 'native' ? (
                        <PhoneFrame>
                          <PreviewComponent />
                        </PhoneFrame>
                      ) : (
                        <div
                          className={cn(
                            'w-full h-full flex items-center justify-center',
                            component.layout === 'fullscreen' &&
                              'absolute inset-0'
                          )}
                        >
                          <PreviewComponent />
                        </div>
                      )
                    ) : (
                      <div className='text-center'>
                        <div className='mb-4 text-sm text-muted-foreground'>
                          Component preview coming soon
                        </div>
                        <Badge className='bg-primary'>{component.name}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='code'>
              <Card className='border-border/50 bg-card/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle>Installation & Usage</CardTitle>
                  <CardDescription>{usageText}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/*Install Code*/}
                  {installationCmds && installationCmds.length > 0 && (
                    <div className='mb-6'>
                      <h4 className='mb-2 text-sm font-semibold'>
                        Install Dependencies
                      </h4>
                      <div className='space-y-2'>
                        {installationCmds.map((cmd) => (
                          <div key={cmd} className='relative'>
                            <CopyButton
                              text={cmd}
                              className='absolute right-2 top-1/2 -translate-y-1/2 z-10'
                            />
                            <ShikiHighlighter
                              theme='monokai'
                              language='bash'
                              showLanguage={false}
                              style={{
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                border: '1px solid hsl(var(--border) / 0.5)',
                              }}
                            >
                              {cmd}
                            </ShikiHighlighter>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/*React Code*/}
                  <div className='space-y-6'>
                    <div>
                      <h4 className='my-2 text-sm font-semibold'>
                        Component Code ({platform === 'web' ? 'Web' : 'React Native'})
                      </h4>
                      <div className='relative'>
                        <CopyButton
                          text={codeToShow}
                          className='absolute right-2 top-2 z-10'
                        />
                        <ShikiHighlighter
                          theme='monokai'
                          language='tsx'
                          showLanguage={false}
                          style={{
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            border: '1px solid hsl(var(--border) / 0.5)',
                          }}
                        >
                          {codeToShow}
                        </ShikiHighlighter>
                      </div>
                    </div>

                    {platform === 'web' && component.hook && (
                      <div>
                        <h4 className='mb-2 text-sm font-semibold'>
                          use-theme Hook
                        </h4>
                        <div className='relative'>
                          <CopyButton
                            text={component.hook}
                            className='absolute right-2 top-2 z-10'
                          />
                          <ShikiHighlighter
                            theme='monokai'
                            language='tsx'
                            showLanguage={false}
                            style={{
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              border: '1px solid hsl(var(--border) / 0.5)',
                            }}
                          >
                            {component.hook}
                          </ShikiHighlighter>
                        </div>
                      </div>
                    )}

                    {platform === 'web' && component.css && (
                      <div>
                        <h4 className='mb-2 text-sm font-semibold'>
                          Global CSS (Circular Reveal)
                        </h4>
                        <div className='relative'>
                          <CopyButton
                            text={component.css}
                            className='absolute right-2 top-2 z-10'
                          />
                          <ShikiHighlighter
                            theme='monokai'
                            language='css'
                            showLanguage={false}
                            style={{
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              border: '1px solid hsl(var(--border) / 0.5)',
                            }}
                          >
                            {component.css}
                          </ShikiHighlighter>
                        </div>
                      </div>
                    )}
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
