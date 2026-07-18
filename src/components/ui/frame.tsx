import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/hooks/use-theme';

interface FrameProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  children: React.ReactNode;
}

export function Frame({ children, ...props }: FrameProps) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const { theme } = useTheme();

  useEffect(() => {
    if (!contentRef?.contentWindow?.document) return;

    const doc = contentRef.contentWindow.document;

    // Copy stylesheets and style tags
    const updateStyles = () => {
      const sourceStyles = Array.from(
        document.querySelectorAll('link[rel="stylesheet"], style')
      );
      const targetHead = doc.head;

      // Clear existing to avoid duplicates on re-renders
      const existingClones = Array.from(
        targetHead.querySelectorAll('link[data-cloned], style[data-cloned]')
      );
      existingClones.forEach((el) => el.remove());

      sourceStyles.forEach((style) => {
        if (style.tagName === 'LINK') {
          const link = style as HTMLLinkElement;
          const newLink = doc.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = link.href;
          newLink.setAttribute('data-cloned', 'true');
          targetHead.appendChild(newLink);
        } else if (style.tagName === 'STYLE') {
          const s = style as HTMLStyleElement;
          const newStyle = doc.createElement('style');
          newStyle.textContent = s.textContent;
          newStyle.setAttribute('data-cloned', 'true');
          targetHead.appendChild(newStyle);
        }
      });
    };

    updateStyles();

    // Sync Theme class

    const root = doc.documentElement;

    root.classList.remove('light', 'dark');

    // Reset backgrounds to transparent so parent's bg-muted/30 shows through

    if (root) {
      root.style.setProperty('background-color', 'transparent', 'important');
    }

    if (doc.body) {
      doc.body.style.setProperty(
        'background-color',
        'transparent',
        'important'
      );
    }

    // Ensure body takes full height and centers content
    doc.body.classList.add(
      'm-0',
      'min-h-screen',
      'flex',
      'flex-col',
      'justify-center',
      'bg-card/10'
    );

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Optional: Observer for new styles? For now, run once on mount.
  }, [contentRef, theme]);

  return (
    <iframe {...props} ref={setContentRef} className={props.className}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
