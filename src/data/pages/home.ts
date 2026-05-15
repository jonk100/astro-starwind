export const homeHero = {
	h: "The Life You Want to Live is Near",
	p: "Small habits compound into lasting change. Track your progress, reflect in your journal, and find calm through meditation. Everything you need to care for yourself is here.",
	imgSrc: "https://res.cloudinary.com/dikyfam2c/image/upload/v1734536831/flower_gvof2g.webp",
	imgAlt: "Hero image",
	width: 2688,
	height: 1920,
} as const;

export const homeNewsletterTop = {
	heading: "Never miss an update",
	class: "h-em ",
} as const;

export const homeFeatures = {
	heading: "Three ways to grow",
	subheading: "Build better habits with our simple, powerful tools",
	features: [
		{
			title: "Focus",
			phrase: "Watch your habits take shape",
			description:
				"Monitor your daily progress with intuitive visualizations that help you stay motivated and on track.",
			link: "/app/habit/track",
		},
		{
			title: "Growth",
			phrase: "Write your way to clarity",
			description:
				"Journal your thoughts and experiences to gain deeper insights into your patterns and behaviors.",
			// TODO: confirm final journal route; current tree suggests /app/write/pad
			link: "/app/write/pad",
		},
		{
			title: "Breathework",
			phrase: "Find stillness when you need it",
			description:
				"Take mindful breaks with guided breathing exercises designed to reduce stress and improve focus.",
			link: "/app/relax/happy-place",
		},
	],
} as const;

export const homeTestimonials = {
	heading: "Real stories",
	subheading: "People who have changed their lives with Mindful Habits Studio.",
	testimonials: [
		{
			name: "Sarah M.",
			title: "Product Manager",
			quote:
				"I finally understand what's driving my behavior. The journal app helped me see patterns I'd been missing for years.",
		},
		{
			name: "John D.",
			title: "Software Engineer",
			quote:
				"The habit tracker made me see what I was actually doing, not what I thought I was doing.",
		},
		{
			name: "Emily R.",
			title: "Marketing Specialist",
			quote:
				"Writing in the journal became the thing I looked forward to each night. It settled me.",
		},
	],
} as const;

export const homePricing = {
	heading: "Simple pricing",
	subheading: "Choose the plan that fits your journey",
	plans: [
		{
			title: "Starter",
			price: "Free",
			features: [
				"Basic habit tracking",
				"Daily journal entries",
				"5 meditation sessions",
				"Community access",
			],
			ctaText: "Get started",
		},
		{
			title: "Professional",
			price: "$12",
			period: "/mo",
			features: [
				"Unlimited habit tracking",
				"Unlimited journal entries",
				"All meditation sessions",
				"Advanced analytics",
				"Priority support",
			],
			highlighted: true,
			ctaText: "Get started",
		},
		{
			title: "Premium",
			price: "$24",
			period: "/mo",
			features: [
				"Everything in Professional",
				"1-on-1 coaching session",
				"Custom habit plans",
				"API access",
				"White-label options",
			],
			ctaText: "Get started",
		},
	],
} as const;

export const homeNewsletterBottom = {
	heading: "Stay in the loop",
	class: "h-em ",
} as const;