/**
 * Social Media: Standardized social media accounts and contact information
 */

import type { LucideIcon } from 'lucide-react';

export interface SocialLink {
	label: string;
	href: string;
	platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
	ariaLabel: string;
}

export interface ContactInfo {
	email: string;
	phone: string;
	phoneDisplay: string;
	location: string;
	locationDisplay: string;
}

export interface LogoConfig {
	lightMode: string;
	darkMode: string;
	alt: string;
}

export const socialMedia: SocialLink[] = [
	{
		label: 'Morningtide on X',
		href: 'https://twitter.com/morningtideCC',
		platform: 'twitter',
		ariaLabel: 'Follow Morningtide Consulting on X (formerly Twitter)',
	},
	{
		label: 'Morningtide on LinkedIn',
		href: 'https://www.linkedin.com/company/morningtide-consulting-collective',
		platform: 'linkedin',
		ariaLabel: 'Connect with Morningtide Consulting on LinkedIn',
	},
	{
		label: 'Morningtide on Facebook',
		href: 'https://facebook.com/people/Morningtide-Consulting-and-Collective/61588504391741/',
		platform: 'facebook',
		ariaLabel: 'Follow Morningtide Consulting on Facebook',
	},
];

export const contactInfo: ContactInfo = {
	email: 'info@morningtidecc.com',
	phone: '+16067662809',
	phoneDisplay: '+1 (606) 766-2809',
	location: 'Remote',
	locationDisplay: 'Remote / Virtual Sessions',
};

export const logoConfig: LogoConfig = {
	lightMode: 'logo-light.jpg',
	darkMode: 'logo-dark.jpg',
	alt: 'Morningtide Consulting and Collective Logo',
};

export const clinicalServicesUrl = 'https://twilightpsychology.com';

export type SocialMediaConfig = {
	socialLinks: SocialLink[];
	contactInfo: ContactInfo;
	logoConfig: LogoConfig;
	clinicalServicesUrl: string;
};
