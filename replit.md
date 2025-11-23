# Order Transcribe - Real-Time Voice Order Transcription App

## Overview

Order Transcribe is a React Native mobile application built with Expo that enables staff members to record customer voice orders and automatically transcribe them using OpenAI's Whisper API. The app provides a streamlined workflow for capturing, reviewing, and managing order history in a restaurant or food service environment.

The application is cross-platform (iOS, Android, Web) and uses a tab-based navigation structure to organize three core workflows: recording new orders, viewing order history, and managing user profile/settings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54
- Uses the new React Native architecture (newArchEnabled: true)
- Implements React 19 with experimental React Compiler
- Supports iOS, Android, and Web platforms with platform-specific optimizations

**Navigation Pattern**: Tab-based navigation with nested stack navigators
- Three main tabs: Record (home), History, Profile
- Each tab contains a stack navigator for nested screens
- Uses React Navigation v7 with native stack and bottom tabs
- Implements platform-specific blur effects for iOS tab bar

**UI/Component Architecture**:
- Custom theming system with light/dark mode support via `useTheme` hook
- Elevation-based color system (0-3 levels) for visual hierarchy
- Reusable themed components (ThemedView, ThemedText, Card)
- Screen-level wrapper components for consistent layout (ScreenScrollView, ScreenKeyboardAwareScrollView, ScreenFlatList)
- Safe area and inset management using custom `useScreenInsets` hook
- Path aliasing via `@/` for cleaner imports

**State Management**: Local component state with React hooks
- No global state management library
- Focus effects for data refresh on screen navigation
- useState and useEffect for component-level state

**Animations & Gestures**:
- React Native Reanimated for performant animations
- Gesture Handler for touch interactions
- Haptic feedback integration via Expo Haptics

### Audio Recording & Processing

**Audio Capture**: Expo AV module
- Records in HIGH_QUALITY preset
- Manages recording permissions per platform
- Stores recordings in local file system

**Transcription Service**: OpenAI Whisper API integration
- Sends audio files to OpenAI's transcription endpoint
- User provides their own API key (stored securely)
- Includes mock transcription utility for development/testing
- Validates API keys before use

### Data Storage

**Local Database**: SQLite via Expo SQLite
- Single `orders` table schema with fields: id, audioUri, transcribedText, staffName, timestamp, duration
- CRUD operations wrapped in orderStore utility
- Search functionality for order history
- Automatic database initialization on app start

**Secure Storage**: 
- API keys stored using Expo Secure Store (native) or localStorage (web)
- Platform-specific storage strategy in `apiKeyStorage` utility

**File Storage**: 
- Audio recordings stored via Expo File System
- Audio URIs persisted in database for playback

### Styling & Theming

**Design System**: Custom theme constants with semantic tokens
- Color system: Separate light/dark palettes with elevation-based backgrounds
- Spacing scale: xs (4px) through 5xl (48px)
- Typography scale: header, title, body, caption, link
- BorderRadius constants for consistent rounded corners
- Uses Expo Google Fonts for typography

**Responsive Layout**:
- Safe area context for notch/status bar handling
- Tab bar height calculation for proper content padding
- Header height awareness for screen content positioning
- Platform-specific UI adjustments (iOS blur effects, Android edge-to-edge)

### Error Handling

**Error Boundary**: Custom React error boundary component
- Catches rendering errors application-wide
- Development mode: Shows detailed error modal with stack trace
- Production mode: Clean error fallback UI
- App restart functionality via Expo reload

### Development Tooling

**Code Quality**:
- ESLint with Expo config
- Prettier for code formatting
- TypeScript for type safety
- Babel module resolver for path aliases

**Build System**:
- Custom build script for Replit deployment
- Static hosting setup with QR code landing page
- Metro bundler configuration
- Environment variable handling for Replit domains

## External Dependencies

### Core Framework
- **Expo SDK 54**: Managed React Native workflow with extended APIs
- **React Native 0.81.5**: Mobile application framework
- **React 19**: UI library with experimental compiler

### Navigation
- **React Navigation v7**: Navigation library (native-stack, bottom-tabs, elements)
- **React Native Screens**: Native screen management
- **React Native Safe Area Context**: Safe area handling

### Audio & Media
- **Expo AV**: Audio recording and playback
- **Expo File System**: File storage and management

### UI Components & Styling
- **Expo Blur**: Native blur effects for iOS
- **Expo Symbols**: Icon support
- **Expo Image**: Optimized image component
- **Feather Icons** (via @expo/vector-icons): Icon library

### Storage
- **Expo SQLite**: Local database for order persistence
- **Expo Secure Store**: Encrypted key-value storage for API keys

### Interactions
- **React Native Reanimated**: High-performance animations
- **React Native Gesture Handler**: Touch gesture system
- **React Native Keyboard Controller**: Keyboard-aware UI components
- **Expo Haptics**: Haptic feedback

### APIs & Services
- **OpenAI Whisper API**: Speech-to-text transcription service (requires user-provided API key)

### Platform Integration
- **Expo Web Browser**: In-app browser functionality
- **Expo Linking**: Deep linking support
- **Expo Constants**: Environment and device constants
- **Expo Status Bar**: Status bar styling
- **Expo System UI**: System UI customization
- **Expo Splash Screen**: Splash screen management

### Development Dependencies
- **TypeScript**: Type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Babel Plugin Module Resolver**: Import path aliasing