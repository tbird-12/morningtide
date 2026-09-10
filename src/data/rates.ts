/**
 * Rates: Standardized pricing and rate configuration
 */

export const rates = {
	consultation: {
		name: 'Initial Consultation',
		price: 150,
		currency: 'USD',
		duration: '60 minutes',
		description: 'Comprehensive initial consultation session',
	},
	hourly: {
		name: 'Hourly Rate',
		price: 150,
		currency: 'USD',
		duration: '1 hour',
		description: 'Standard hourly consulting rate',
	},
	packages: {
		starter: {
			name: 'Starter Package',
			price: 500,
			currency: 'USD',
			sessions: 4,
			sessionsPerMonth: 1,
			description: 'Perfect for getting started with consulting services',
			savings: '5% discount',
		},
		professional: {
			name: 'Professional Package',
			price: 1200,
			currency: 'USD',
			sessions: 10,
			sessionsPerMonth: 2.5,
			description: 'Ideal for ongoing professional development',
			savings: '10% discount',
		},
		enterprise: {
			name: 'Enterprise Package',
			price: 2500,
			currency: 'USD',
			sessions: 24,
			sessionsPerMonth: 6,
			description: 'Comprehensive program for organizations',
			savings: '15% discount',
		},
	},
	ceuTrainings: {
		name: 'CEU Training Programs',
		pricePerHour: 75,
		currency: 'USD',
		description: 'Continuing Education Units for clinicians',
		minHours: 3,
		maxHours: 30,
	},
};

export type Rates = typeof rates;
