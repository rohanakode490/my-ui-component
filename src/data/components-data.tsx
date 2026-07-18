import React from 'react';
import { AnimatedAvatar } from '@/components/showcase/animated-avatar';
import AnimatedAvatarCode from '@/components/showcase/animated-avatar?raw';
import { AnimatedLoader } from '@/components/showcase/animated-loader';
import AnimatedLoaderCode from '@/components/showcase/animated-loader?raw';
import { DotBackground } from '@/components/showcase/dot-background';
import DotBackgroundCode from '@/components/showcase/dot-background?raw';
import { GridBackground } from '@/components/showcase/grid-background';
import GridBackgroundCode from '@/components/showcase/grid-background?raw';
import { NavigationBar } from '@/components/showcase/navigation-bar';
import NavigationBarCode from '@/components/showcase/navigation-bar?raw';
import { ResponsiveNavbar } from '@/components/showcase/responsive-navbar';
import ResponsiveNavbarCode from '@/components/showcase/responsive-navbar?raw';
import { StatusBadge } from '@/components/showcase/status-badge';
import StatusBadgeCode from '@/components/showcase/status-badge?raw';
import { ThemeToggleBouncyLinearButton } from '@/components/showcase/theme-linear-button';
import ThemeToggleBouncyLinearButtonCode from '@/components/showcase/theme-linear-button?raw';
import { ThemeToggleBouncyLinearSwitch } from '@/components/showcase/theme-linear-switch';
import ThemeToggleBouncyLinearSwitchCode from '@/components/showcase/theme-linear-switch?raw';
import { ThemeToggleSwitch } from '@/components/showcase/theme-classic-switch';
import ThemeToggleSwitchCode from '@/components/showcase/theme-classic-switch?raw';
import { ThemeToggleClassic } from '@/components/showcase/theme-classic';
import ThemeToggleClassicCode from '@/components/showcase/theme-classic?raw';
import { ThemeToggleLRButton } from '@/components/showcase/theme-lr-button';
import ThemeToggleLRButtonCode from '@/components/showcase/theme-lr-button?raw';
import { ThemeToggleLRSwitch } from '@/components/showcase/theme-lr-switch';
import ThemeToggleLRSwitchCode from '@/components/showcase/theme-lr-switch?raw';
import { TiltCard } from '@/components/showcase/tilt-card';
import TiltCardCode from '@/components/showcase/tilt-card?raw';
import useThemeCode from '@/hooks/use-theme?raw';

import { ThemePreviewWrapper } from '@/components/theme-preview-wrapper';

// Native Imports
import { NativeAnimatedLoader } from '@/components/showcase/native-loader';
import NativeAnimatedLoaderCode from '@/components/showcase/native-loader?raw';
import { NativeStatusBadge } from '@/components/showcase/native-status-badge';
import NativeStatusBadgeCode from '@/components/showcase/native-status-badge?raw';
import { NativeAnimatedAvatar } from '@/components/showcase/native-avatar';
import NativeAnimatedAvatarCode from '@/components/showcase/native-avatar?raw';
import { NativeTiltCard } from '@/components/showcase/native-tilt-card';
import NativeTiltCardCode from '@/components/showcase/native-tilt-card?raw';
import { NativeNavigationBar } from '@/components/showcase/native-navigation-bar';
import NativeNavigationBarCode from '@/components/showcase/native-navigation-bar?raw';
import { NativeResponsiveNavbar } from '@/components/showcase/native-responsive-navbar';
import NativeResponsiveNavbarCode from '@/components/showcase/native-responsive-navbar?raw';
import { NativeDotBackground } from '@/components/showcase/native-dot-background';
import NativeDotBackgroundCode from '@/components/showcase/native-dot-background?raw';
import { NativeGridBackground } from '@/components/showcase/native-grid-background';
import NativeGridBackgroundCode from '@/components/showcase/native-grid-background?raw';

import {
  NativeThemeToggleClassic,
  NativeThemeToggleSwitch,
  NativeThemeToggleBouncyLinearButton,
  NativeThemeToggleBouncyLinearSwitch,
  NativeThemeToggleLRButton,
  NativeThemeToggleLRSwitch
} from '@/components/showcase/native-themes';
import NativeThemesCode from '@/components/showcase/native-themes?raw';

export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: React.ComponentType;
  code: string;
  css?: string;
  hook?: string;
  usage: string;
  installation: string[];
  layout?: 'centered' | 'fullscreen';
  isolate?: boolean;
  
  // React Native properties
  nativePreview?: React.ComponentType;
  nativeCode?: string;
  nativeUsage?: string;
  nativeInstallation?: string[];
}

export const components: Component[] = [
  {
    id: 'theme-classic',
    name: 'Circular Reveal Toggle',
    description: 'The official app toggle',
    category: 'animations',
    preview: () => (
      <ThemePreviewWrapper caption='Circular Reveal'>
        <ThemeToggleClassic />
      </ThemePreviewWrapper>
    ),
    code: ThemeToggleClassicCode,
    hook: useThemeCode,
    usage:
      'The standard icon-based theme switcher used in the app navbar. Uses the Web Animations API for a self-contained circular reveal animation.',
    installation: ['npm install motion'],
    nativePreview: NativeThemeToggleClassic,
    nativeCode: NativeThemesCode,
    nativeUsage: 'A React Native spring-based icon animation swapping between Sun and Moon emojis using the Animated API.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'theme-bouncy-switch',
    name: 'Circular Reveal Switch',
    description: 'Sliding switch with bouncy reveal',
    category: 'animations',
    preview: () => (
      <ThemePreviewWrapper caption='Circular Expansion'>
        <ThemeToggleSwitch />
      </ThemePreviewWrapper>
    ),
    code: ThemeToggleSwitchCode,
    hook: useThemeCode,
    usage:
      'A pill-shaped switch that triggers a bouncy-linear circular reveal transition using the Web Animations API.',
    installation: ['npm install motion'],
    nativePreview: NativeThemeToggleSwitch,
    nativeCode: NativeThemesCode,
    nativeUsage: 'A clean sliding switch using spring physics inside the Animated API to translate the switch thumb from left to right.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'theme-linear-button',
    name: 'Linear Elastic Button',
    description: 'Custom complex easing transition',
    category: 'animations',
    preview: () => (
      <ThemePreviewWrapper caption='Vertical Bounce'>
        <ThemeToggleBouncyLinearButton />
      </ThemePreviewWrapper>
    ),
    code: ThemeToggleBouncyLinearButtonCode,
    hook: useThemeCode,
    usage:
      'A button toggle that uses a complex linear() easing function for a top-to-bottom page slide with bounce, powered by the Web Animations API.',
    installation: ['npm install motion'],
    nativePreview: NativeThemeToggleBouncyLinearButton,
    nativeCode: NativeThemesCode,
    nativeUsage: 'Animates the active icon bouncing in vertically when pressed using high bounciness configuration on Animated.spring.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'theme-linear-switch',
    name: 'Vertical Bounce Switch',
    description: 'Switch with custom linear easing',
    category: 'animations',
    preview: () => (
      <ThemePreviewWrapper caption='Vertical Bounce'>
        <ThemeToggleBouncyLinearSwitch />
      </ThemePreviewWrapper>
    ),
    code: ThemeToggleBouncyLinearSwitchCode,
    hook: useThemeCode,
    usage:
      'An industrial-style switch that utilizes the bouncy linear() easing for its top-to-bottom entry effect.',
    installation: ['npm install motion'],
    nativePreview: NativeThemeToggleBouncyLinearSwitch,
    nativeCode: NativeThemesCode,
    nativeUsage: 'A sliding switch that utilizes highly responsive spring parameters to emulate elastic physical switch bounce on mobile devices.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'theme-lr-button',
    name: 'Horizontal Slide Button',
    description: 'Left-to-right sliding transition',
    category: 'animations',
    preview: () => (
      <ThemePreviewWrapper caption='Directional Slide'>
        <ThemeToggleLRButton />
      </ThemePreviewWrapper>
    ),
    code: ThemeToggleLRButtonCode,
    hook: useThemeCode,
    usage:
      'A large button toggle that triggers a sliding clip-path animation. Powered entirely by the Web Animations API within the component.',
    installation: ['npm install motion'],
    nativePreview: NativeThemeToggleLRButton,
    nativeCode: NativeThemesCode,
    nativeUsage: 'Translates a row of icons horizontally under an overflow hidden mask container using linear Animated.timing.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'theme-lr-switch',
    name: 'Horizontal Slide Switch',
    description: 'Sliding switch with directional reveal',
    category: 'animations',
    preview: () => (
      <ThemePreviewWrapper caption='Directional Slide'>
        <ThemeToggleLRSwitch />
      </ThemePreviewWrapper>
    ),
    code: ThemeToggleLRSwitchCode,
    hook: useThemeCode,
    usage:
      'A classic switch component combined with a directional sliding View Transition using the Web Animations API.',
    installation: ['npm install motion'],
    nativePreview: NativeThemeToggleLRSwitch,
    nativeCode: NativeThemesCode,
    nativeUsage: 'Pill-shaped slider component replicating horizontal slide transitions on native mobile apps.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'avatar-change',
    name: 'Animated Avatar',
    description: 'Smooth Avatar Image Change with Progress',
    category: 'avatar',
    preview: AnimatedAvatar,
    code: AnimatedAvatarCode,
    usage:
      'A smooth avatar transition with a circular progress indicator. Requires custom "@keyframes progress" in your global CSS.',
    installation: ['npm install framer-motion', 'npx shadcn@latest add avatar'],
    nativePreview: NativeAnimatedAvatar,
    nativeCode: NativeAnimatedAvatarCode,
    nativeUsage: 'Prefetches and transitions images smoothly while animating a border progress ring on press using the Animated API.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'dot-background',
    name: 'Dot Background',
    description: 'Minimal Dot Pattern',
    category: 'backgrounds',
    preview: DotBackground,
    code: DotBackgroundCode,
    usage: 'A softer alternative to the grid, adding texture without noise.',
    installation: [],
    layout: 'fullscreen',
    nativePreview: NativeDotBackground,
    nativeCode: NativeDotBackgroundCode,
    nativeUsage: 'A lightweight nested row grid rendering uniform dots using pure Flexbox layouts without heavy SVG rendering.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'grid-background',
    name: 'Grid Background',
    description: 'Subtle Grid Pattern',
    category: 'backgrounds',
    preview: GridBackground,
    code: GridBackgroundCode,
    usage: 'Adds a technical, structured feel to any section.',
    installation: [],
    layout: 'fullscreen',
    nativePreview: NativeGridBackground,
    nativeCode: NativeGridBackgroundCode,
    nativeUsage: 'Constructs custom horizontal and vertical hairline dividers positioned absolutely to form a structured layout grid.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'status-badge',
    name: 'Status Badge',
    description: 'Minimal Pulsing Status',
    category: 'badges',
    preview: StatusBadge,
    code: StatusBadgeCode,
    usage:
      'Indicate status (online, offline, busy) with a subtle pulse animation.',
    installation: [],
    nativePreview: NativeStatusBadge,
    nativeCode: NativeStatusBadgeCode,
    nativeUsage: 'A looping Animated pulse scaling up and fading out behind a static status indicator dot.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'tilt-card',
    name: '3D Tilt Card',
    description: 'Interactive 3D Hover Effect',
    category: 'cards',
    preview: TiltCard,
    code: TiltCardCode,
    usage:
      'A card that tilts in 3D space on hover. Great for feature highlights.',
    installation: ['npm install framer-motion'],
    nativePreview: NativeTiltCard,
    nativeCode: NativeTiltCardCode,
    nativeUsage: 'Utilizes PanResponder to track touch gestures, mapping them to 3D perspective transforms (rotateX/rotateY) with smooth spring returns.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'animated-loader',
    name: 'Animated Loader',
    description: 'Smooth Spinning Loader',
    category: 'loaders',
    preview: AnimatedLoader,
    code: AnimatedLoaderCode,
    usage:
      'Perfect for loading states. Add this while fetching data or processing requests.',
    installation: ['npm install framer-motion'],
    nativePreview: NativeAnimatedLoader,
    nativeCode: NativeAnimatedLoaderCode,
    nativeUsage: 'A loop-based rotation animation mapping 0-1 values to degrees, applied directly to a circular border container.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'navigation-bar',
    name: 'Navigation Bar',
    description: 'Smooth Navigation Bar with Animated Hover Effect',
    category: 'navigation',
    preview: NavigationBar,
    code: NavigationBarCode,
    usage:
      'A sleek navigation bar with a sliding underline effect that follows the active and hovered items.',
    installation: ['npm install motion', 'npx shadcn@latest add button'],
    nativePreview: NativeNavigationBar,
    nativeCode: NativeNavigationBarCode,
    nativeUsage: 'A tab strip featuring an active spring-based backplate underline that translates horizontally according to active index.',
    nativeInstallation: ['npm install react-native'],
  },
  {
    id: 'responsive-navbar',
    name: 'Responsive Navbar',
    description: 'Adaptive Navigation Bar',
    category: 'navigation',
    preview: ResponsiveNavbar,
    code: ResponsiveNavbarCode,
    usage:
      'A fully responsive navbar with a mobile toggle and smooth animations.',
    installation: ['npm install framer-motion'],
    layout: 'fullscreen',
    isolate: true,
    nativePreview: NativeResponsiveNavbar,
    nativeCode: NativeResponsiveNavbarCode,
    nativeUsage: 'Collapsible header bar extending menu items with smooth height transitions on mobile toggle presses.',
    nativeInstallation: ['npm install react-native'],
  },
];
