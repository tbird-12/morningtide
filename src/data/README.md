# Data Directory

This directory contains standardized, parameterized configuration data for the Morningtide Consulting application.

## Files

### `designTokens.ts`
Contains the complete design system tokens including:
- **Colors**: Light and dark mode color schemes
- **Shadows**: Predefined shadow depths for consistency
- **Typography**: Font family declarations
- **Spacing**: Standardized spacing scale (xs to xxxl)
- **Border Radius**: Predefined border radius values
- **Header Heights**: Mobile and desktop header dimensions
- **Transitions**: Standard animation durations and easing functions

**Usage:**
```typescript
import { designTokens } from '@/data';

const { colors, shadows, typography } = designTokens;
const lightColors = designTokens.colors.light;
```

### `rates.ts`
Contains all pricing information:
- **Consultation**: Single consultation pricing
- **Hourly**: Standard hourly rate
- **Packages**: Pre-packaged service offerings (Starter, Professional, Enterprise)
- **CEU Trainings**: Continuing education pricing structure

**Usage:**
```typescript
import { rates } from '@/data';

const consultationPrice = rates.consultation.price;
const packages = rates.packages;
```

### `socialMedia.ts`
Contains social media accounts and contact information:
- **socialMedia**: Array of social media platform links
- **contactInfo**: Email, phone, and location
- **clinicalServicesUrl**: Link to clinical services website

**Usage:**
```typescript
import { socialMedia, contactInfo, clinicalServicesUrl } from '@/data';

socialMedia.forEach(link => {
  console.log(link.href, link.platform);
});
```

### `index.ts`
Central export point for all data. Import from here for convenience:
```typescript
import { designTokens, rates, socialMedia, contactInfo } from '@/data';
```

## Guidelines

When adding new data:
1. Create a new file in this directory
2. Export types and data separately
3. Add it to `index.ts` for easy importing
4. Update this README with usage examples

## Updating Values

To update any of these values (e.g., prices, social media links, colors):
1. Edit the corresponding file in this directory
2. The change will automatically propagate to all components using these exports
3. No component file modifications needed for simple value updates
