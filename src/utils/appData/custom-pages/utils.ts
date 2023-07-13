import { type VariantProps, cva } from 'class-variance-authority';
import {
	SECTIONS_TYPES_map,
	type StandardSection,
} from '~/utils/types/custom-page';

export const createStandardSection = (
	params: Pick<
		StandardSection,
		| 'order'
		| 'body'
		| 'title'
		| 'description'
		| 'customPageClassesKeys'
		| 'twClassNameVariants'
	>,
): StandardSection => ({
	___type: SECTIONS_TYPES_map['standard-section'],
	twClassNameVariants: { 'gap-x': '2', 'gap-y': '2' },
	...params,
});

export enum ProductsTags {
	'New Releases' = 'New Releases',
	'Drum Kits' = 'Drum Kits',
	'Sample Packs' = 'Sample Packs',
	'Vinyl' = 'Vinyl',
	'Bundles' = 'Bundles',
	'Loops' = 'Loops',
	'One Shot Drums' = 'One Shot Drums',
	'Instrument Kits' = 'Instrument Kits',
	'Presets' = 'Presets',
	FreeLabel = 'Free Label',
}

export const boxVariants = {
	'max-w': {
		'100ch': 'max-w-[100ch]',
		'125ch': 'max-w-[125ch]',
		xs: 'max-w-xs',
		sm: 'max-w-sm',
		md: 'max-w-md',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		'3xl': 'max-w-3xl',
		'4xl': 'max-w-4xl',
		'5xl': 'max-w-5xl',
		'6xl': 'max-w-6xl',
		'7xl': 'max-w-7xl',
		'screen-sm': 'max-w-screen-sm',
		'screen-md': 'max-w-screen-md',
		'screen-xl': 'max-w-screen-xl',
		'screen-2xl': 'max-w-screen-2xl',
	},
	w: {
		'4': 'w-4',
		'5': 'w-5',
		'6': 'w-6',
		'7': 'w-7',
		'8': 'w-8',
		'9': 'w-9',
		'10': 'w-10',
		'11': 'w-11',
		'12': 'w-12',
		'14': 'w-14',
		'16': 'w-16',
		'20': 'w-20',
		'24': 'w-24',
		'28': 'w-28',
		'32': 'w-32',
		'36': 'w-36',
		'40': 'w-40',
		'44': 'w-44',
		'48': 'w-48',
		'52': 'w-52',
		'56': 'w-56',
		'60': 'w-60',
		'64': 'w-64',
		'72': 'w-72',
		'80': 'w-80',
		'96': 'w-96',
		'1/2': 'w-1/2',
		'1/3': 'w-1/3',
		'2/3': 'w-2/3',
		'1/4': 'w-1/4',
		'2/4': 'w-2/4',
		'3/4': 'w-3/4',
		'1/5': 'w-1/5',
		'2/5': 'w-2/5',
		'3/5': 'w-3/5',
		'4/5': 'w-4/5',
		'1/6': 'w-1/6',
		'2/6': 'w-2/6',
		'3/6': 'w-3/6',
		'4/6': 'w-4/6',
		'5/6': 'w-5/6',
		'1/12': 'w-1/12',
		'2/12': 'w-2/12',
		'3/12': 'w-3/12',
		'4/12': 'w-4/12',
		'5/12': 'w-5/12',
		'6/12': 'w-6/12',
		'7/12': 'w-7/12',
		'8/12': 'w-8/12',
		'9/12': 'w-9/12',
		'10/12': 'w-10/12',
		'11/12': 'w-11/12',
		full: 'w-full',
		auto: 'w-auto',
	},
	h: {
		'4': 'h-4',
		'5': 'h-5',
		'6': 'h-6',
		'7': 'h-7',
		'8': 'h-8',
		'9': 'h-9',
		'10': 'h-10',
		'11': 'h-11',
		'12': 'h-12',
		'14': 'h-14',
		'16': 'h-16',
		'20': 'h-20',
		'24': 'h-24',
		'28': 'h-28',
		'32': 'h-32',
		'36': 'h-36',
		'40': 'h-40',
		'44': 'h-44',
		'48': 'h-48',
		'52': 'h-52',
		'56': 'h-56',
		'60': 'h-60',
		'64': 'h-64',
		'72': 'h-72',
		'80': 'h-80',
		'96': 'h-96',
		'1/2': 'h-1/2',
		'1/3': 'h-1/3',
		'2/3': 'h-2/3',
		'1/4': 'h-1/4',
		'2/4': 'h-2/4',
		'3/4': 'h-3/4',
		'1/5': 'h-1/5',
		'2/5': 'h-2/5',
		'3/5': 'h-3/5',
		'4/5': 'h-4/5',
		'1/6': 'h-1/6',
		'2/6': 'h-2/6',
		'3/6': 'h-3/6',
		'4/6': 'h-4/6',
		'5/6': 'h-5/6',
		'1/12': 'h-1/12',
		'2/12': 'h-2/12',
		'3/12': 'h-3/12',
		'4/12': 'h-4/12',
		'5/12': 'h-5/12',
		'6/12': 'h-6/12',
		'7/12': 'h-7/12',
		'8/12': 'h-8/12',
		'9/12': 'h-9/12',
		'10/12': 'h-10/12',
		'11/12': 'h-11/12',
		full: 'h-full',
		auto: 'h-auto',
	},
	'gap-x': {
		'1': 'gap-x-1',
		'2': 'gap-x-2',
		'3': 'gap-x-3',
		'4': 'gap-x-4',
		'5': 'gap-x-5',
		'6': 'gap-x-6',
		'7': 'gap-x-7',
		'8': 'gap-x-8',
		'9': 'gap-x-9',
		'10': 'gap-x-10',
		'11': 'gap-x-11',
		'12': 'gap-x-12',
		'14': 'gap-x-14',
		'16': 'gap-x-16',
		'18': 'gap-x-18',
		'20': 'gap-x-20',
	},
	'gap-y': {
		'1': 'gap-y-1',
		'2': 'gap-y-2',
		'3': 'gap-y-3',
		'4': 'gap-y-4',
		'5': 'gap-y-5',
		'6': 'gap-y-6',
		'7': 'gap-y-7',
		'8': 'gap-y-8',
		'9': 'gap-y-9',
		'10': 'gap-y-10',
		'11': 'gap-y-11',
		'12': 'gap-y-12',
		'14': 'gap-y-14',
		'16': 'gap-y-16',
		'18': 'gap-y-18',
		'20': 'gap-y-20',
	},
	mx: {
		auto: 'mx-auto',
	},
	px: {
		'1': 'px-1',
		'2': 'px-2',
		'3': 'px-3',
		'4': 'px-4',
		'5': 'px-5',
		'6': 'px-6',
		'7': 'px-7',
		'8': 'px-8',
		'9': 'px-9',
		'10': 'px-10',
		'11': 'px-11',
		'12': 'px-12',
		'14': 'px-14',
		'16': 'px-16',
		'18': 'px-18',
		'20': 'px-20',
	},
	py: {
		'1': 'py-1',
		'2': 'py-2',
		'3': 'py-3',
		'4': 'py-4',
		'5': 'py-5',
		'6': 'py-6',
		'7': 'py-7',
		'8': 'py-8',
		'9': 'py-9',
		'10': 'py-10',
		'11': 'py-11',
		'12': 'py-12',
		'14': 'py-14',
		'16': 'py-16',
		'18': 'py-18',
		'20': 'py-20',
	},
	leading: {
		3: 'leading-3',
		4: 'leading-4',
		5: 'leading-5',
		6: 'leading-6',
		7: 'leading-7',
		8: 'leading-8',
		9: 'leading-9',
		10: 'leading-10',
		none: 'leading-none',
		tight: 'leading-tight',
		snug: 'leading-snug',
		normal: 'leading-normal',
		relaxed: 'leading-relaxed',
		loose: 'leading-loose',
	},
	rounded: {
		sm: 'rounded-sm',
		rounded: 'rounded',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		'4xl': 'rounded-[2rem]',
		'5xl': 'rounded-[2.5rem]',
		full: 'rounded-full',
	},
	'aspect-ratio': {
		square: 'aspect-square',
		video: 'aspect-video',
	},
	'object-fit': {
		cover: 'object-cover',
		contain: 'object-contain',
	},
	'text-align': {
		center: 'text-center',
		justify: 'text-justify',
		left: 'text-left',
		right: 'text-right',
	},
} as const;

export const handleBoxVariants = cva('', {
	variants: boxVariants,
});

export type BoxVariants = VariantProps<typeof handleBoxVariants>;
