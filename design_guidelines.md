# Design Guidelines: Real-Time Order Transcription App

## Architecture Decisions

### Authentication
**Required** - This is a business application for staff members.

**Implementation:**
- Use SSO with Apple Sign-In (iOS requirement) and Google Sign-In for cross-platform support
- Mock auth flow in prototype using local state
- Include login screen with:
  - Business branding area at top
  - SSO buttons (Apple, Google)
  - Privacy policy & terms of service links (placeholder)
- Account screen accessible from Settings with:
  - Staff member name and role display
  - Log out with confirmation alert
  - Delete account nested under Settings > Account > Delete with double confirmation

### Navigation Architecture
**Tab Navigation** - 3 tabs to organize core workflows:

1. **Record Tab** (Home) - Primary workflow for recording and transcribing orders
2. **History Tab** - View and search past transcribed orders
3. **Profile Tab** - Staff settings, account management, and app preferences

### Information Architecture

**Tab 1: Record (Home)**
- Stack: RecordScreen → ConfirmOrderScreen → OrderSuccessScreen

**Tab 2: History**
- Stack: HistoryListScreen → OrderDetailScreen

**Tab 3: Profile**
- Stack: ProfileScreen → SettingsScreen → AccountScreen

## Screen Specifications

### 1. RecordScreen (Home Tab)
**Purpose:** Capture customer voice orders in real-time

**Layout:**
- Header: Transparent, default navigation header
  - Title: "New Order"
  - Right button: Settings icon
- Main content: Non-scrollable centered layout
- Safe area insets: top = headerHeight + Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components:**
- Large circular record button (floating, centered vertically)
  - Shows microphone icon when idle
  - Pulsing animation during recording
  - Uses drop shadow (shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2)
- Recording timer display above button (shows MM:SS during recording)
- Waveform visualization below button (animated during recording)
- Status text below waveform ("Tap to start recording" / "Recording..." / "Processing...")
- Transcription progress indicator (appears after stopping recording)

### 2. ConfirmOrderScreen (Modal)
**Purpose:** Display transcribed text for staff review and editing

**Layout:**
- Header: Default navigation header (non-transparent)
  - Title: "Confirm Order"
  - Left button: Cancel
  - Right button: Confirm (primary color, enabled when text is not empty)
- Main content: Scrollable form
- Safe area insets: top = Spacing.xl, bottom = insets.bottom + Spacing.xl

**Components:**
- Audio playback card at top:
  - Play/pause button with waveform
  - Duration display
  - Replay icon button
- Editable text area displaying transcribed order:
  - Large, readable font
  - Multi-line input
  - Auto-focus on load
- Timestamp display (small, subtle)
- Action buttons in header (not below form)

### 3. HistoryListScreen (History Tab)
**Purpose:** Browse previously transcribed orders

**Layout:**
- Header: Default navigation header (non-transparent)
  - Title: "Order History"
  - Right button: Filter icon
  - Search bar integrated below title
- Main content: Scrollable list
- Safe area insets: top = Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components:**
- Search bar for filtering orders
- List of order cards with:
  - Order preview text (truncated to 2 lines)
  - Timestamp
  - Staff member name (small, secondary text)
  - Chevron right indicator
- Pull-to-refresh functionality
- Empty state (when no orders): Icon + "No orders yet" message

### 4. OrderDetailScreen (History Stack)
**Purpose:** View full details of a past order

**Layout:**
- Header: Default navigation header (non-transparent)
  - Title: "Order Details"
  - Left button: Back
  - Right button: Share icon
- Main content: Scrollable
- Safe area insets: top = Spacing.xl, bottom = insets.bottom + Spacing.xl

**Components:**
- Audio playback card (same as ConfirmOrderScreen)
- Full transcribed text in read-only card
- Metadata section:
  - Timestamp
  - Staff member name
  - Duration of recording
- Actions: Share button (export as text)

### 5. ProfileScreen (Profile Tab)
**Purpose:** Manage staff profile and app settings

**Layout:**
- Header: Transparent, default navigation header
  - Title: "Profile"
- Main content: Scrollable list
- Safe area insets: top = headerHeight + Spacing.xl, bottom = tabBarHeight + Spacing.xl

**Components:**
- Profile header card:
  - Staff avatar (customizable from preset avatars - professional, service industry themed)
  - Display name
  - Role/position (if applicable)
- Settings list items:
  - Audio Quality
  - Language Settings
  - Notification Preferences
  - Account (navigates to AccountScreen)
  - Privacy Policy
  - Terms of Service
  - App Version (non-interactive, bottom of list)

## Design System

### Color Palette
- **Primary:** Professional blue (#2563EB) - for CTAs, active states
- **Background:** Clean white (#FFFFFF)
- **Surface:** Light gray (#F9FAFB) - for cards
- **Text Primary:** Dark gray (#111827)
- **Text Secondary:** Medium gray (#6B7280)
- **Success:** Green (#10B981) - for confirmed orders
- **Recording:** Red (#EF4444) - for active recording state
- **Border:** Light border (#E5E7EB)

### Typography
- **Headers:** SF Pro Display (iOS) / Roboto (Android), Bold, 28pt
- **Titles:** SF Pro Text (iOS) / Roboto (Android), Semibold, 20pt
- **Body:** SF Pro Text (iOS) / Roboto (Android), Regular, 17pt
- **Caption:** SF Pro Text (iOS) / Roboto (Android), Regular, 13pt, secondary color

### Visual Design
- Use Feather icons from @expo/vector-icons for all UI icons
- Record button uses microphone icon from Feather set
- Floating record button has subtle drop shadow (shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2)
- Cards have 1px border with Border color, rounded corners (12px radius)
- All touchable elements provide visual feedback (opacity 0.6 on press)
- No blurred drop shadows except for the floating record button
- Use haptic feedback for record start/stop actions

### Critical Assets
1. **Professional Avatars (3 presets):**
   - Server/waitstaff themed avatar
   - Retail worker themed avatar  
   - Manager/supervisor themed avatar
   - Style: Flat, minimalist, matching app's professional aesthetic

### Interaction Design
- Record button: Tap to start, tap again to stop (with haptic feedback)
- Pulsing animation during active recording (scale animation 1.0 to 1.05)
- Smooth transitions between screens (slide animations)
- Loading states during transcription (spinner + status text)
- Confirmation alerts for:
  - Canceling order before confirmation
  - Deleting account
  - Logging out

### Accessibility
- Minimum touch target size: 44x44pt
- High contrast between text and backgrounds (WCAG AA compliant)
- Voice feedback for recording status (optional setting)
- Large, readable fonts throughout
- Clear visual indicators for recording state (color + animation)
- Support for Dynamic Type (iOS) / Font Scaling (Android)