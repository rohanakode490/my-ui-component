import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6 text-center'>
          <div className='max-w-md space-y-6'>
            <h1 className='text-4xl font-extrabold tracking-tight text-destructive'>
              Something went wrong
            </h1>
            <p className='text-muted-foreground'>
              An unexpected error occurred in the application. Please try reloading the page or returning home.
            </p>
            {this.state.error && (
              <pre className='overflow-auto max-h-40 rounded-lg border bg-muted p-4 text-left text-xs font-mono text-destructive'>
                {this.state.error.toString()}
              </pre>
            )}
            <div className='flex justify-center gap-4'>
              <Button onClick={() => window.location.reload()} variant='outline'>
                Reload Page
              </Button>
              <Button onClick={this.handleReset}>
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
