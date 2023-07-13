import Clickable from '~/components/shared/core/Clickable';
import { cx } from 'class-variance-authority';
import {
	useBasicCollectionsHandleFilterManager,
	useGetEdgeNodes,
} from '~/utils/hooks';
import { useEffect, useMemo } from 'react';
import { HomeScreenProps } from '..';
import { CardsSlider } from '~/components/shared/core/Shopify/Cards/Slider';
import {
	ProductBundleCard,
	ProductCard,
} from '~/components/shared/core/Shopify/Cards/Card';
import { BasicProduct } from '~/utils/shopify/types';

const FilteredProducts = ({
	collectionsBasic,
}: {
	collectionsBasic: NonNullable<HomeScreenProps['collectionsBasic']>;
}) => {
	const {
		categories,
		collectionsByHandle,
		selectedHandles: selectedCategories,
		setSelectedHandles: setSelectedCategories,
		flattenedCollectionsEdges,
	} = useBasicCollectionsHandleFilterManager({
		collectionsEdges: collectionsBasic,
	});

	const selectedCategory = selectedCategories[0];

	const filteredCollections = useMemo(
		() =>
			collectionsByHandle.filter(
				(item) => item[0] === selectedCategory,
			)?.[0]?.[1],
		[collectionsByHandle, selectedCategory],
	);
	const firstCategory = categories[0];

	useEffect(() => {
		if (!firstCategory) return;
		setSelectedCategories([firstCategory]);
	}, [firstCategory, setSelectedCategories]);

	return (
		<article className="px-4 flex flex-col gap-8">
			<header className="flex flex-col gap-4 px-8">
				<h2 className="text-h1 leading-h2 font-semibold">New Releases</h2>
				<div className="flex flex-wrap gap-x-4 gap-y-3 text-base">
					{categories.map((item) => (
						<Clickable
							key={item}
							variants={null}
							onClick={() => setSelectedCategories([item])}
							className={cx(
								'relative capitalize',
								selectedCategory === item
									? 'text-text-primary-400/90 font-bold'
									: 'text-text-primary-400/70 duration-100 hover:text-text-primary-500 focus:text-text-primary-500 outline-none font-medium',
							)}
						>
							{item.replaceAll('-', ' ')}
							<div className="absolute inset-0 flex items-end justify-start">
								<div
									className={cx(
										'h-1 translate-y-full bg-special-primary-500',
										selectedCategory === item ? 'w-11/12' : 'w-0',
									)}
								/>
							</div>
						</Clickable>
					))}
				</div>
			</header>
			<CardsSlider
				collections={filteredCollections || flattenedCollectionsEdges}
				CardElem={ProductCard}
				nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
				previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
			/>
		</article>
	);
};

const HomeShowcaseSection = ({
	collectionsBasic,
}: {
	collectionsBasic: NonNullable<HomeScreenProps['collectionsBasic']>;
}) => {
	const flattenedCollectionEdges = useGetEdgeNodes(collectionsBasic);
	const bundlesCollections = useMemo(
		() => flattenedCollectionEdges.filter((item) => item.handle === 'bundles'),
		[flattenedCollectionEdges],
	);
	const selectedBundlesCollections = useMemo(() => {
		const handlesMap: Record<string, boolean> = {};
		const products: BasicProduct[] = [];

		flattenedCollectionEdges.forEach((collection) =>
			collection.products.edges.forEach(({ node }) => {
				if (
					[
						'schlump-loops-bundle',
						'drums-out-the-sp404-bundle',
						'schlump-shots-bundle',
						'the-classic-era-bundle',
					].includes(node.handle) &&
					!handlesMap[node.handle]
				) {
					products.push(node);
					handlesMap[node.handle] = true;
				}
			}),
		);
		return products;
	}, [flattenedCollectionEdges]);

	return (
		<section className="sm:p-main-p-3">
			<div className="flex flex-col gap-16 bg-bg-primary-100 py-main-p-2 px-main-p-4 dark:bg-bg-primary-900 sm:rounded-xl">
				<FilteredProducts collectionsBasic={collectionsBasic} />
				<article className="flex flex-col gap-4 px-4">
					<header>
						<h2 className="text-h1 leading-h2 font-semibold px-8">Bundles</h2>
					</header>
					<div className="flex flex-col gap-8">
						<CardsSlider
							collections={bundlesCollections}
							CardElem={ProductCard}
							nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
							previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[200%]"
						/>
						<div
							className={cx(
								'grid gap-8 px-8',
								'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
							)}
						>
							{selectedBundlesCollections.map((item) => (
								<ProductBundleCard
									key={item.id}
									product={item}
									containerVariants={{ flex: 'grow', w: null }}
								/>
							))}
						</div>
					</div>
				</article>
			</div>
		</section>
	);
};

const HomeShowcaseSectionHolder = (props: HomeScreenProps) => {
	if (props.isSuccess)
		return <HomeShowcaseSection collectionsBasic={props.collectionsBasic} />;

	if (props.isError) return <>{props.error.message}</>;

	return <>Loading...</>;
};

export default HomeShowcaseSectionHolder;
