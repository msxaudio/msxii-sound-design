import Image from 'next/image';
import React, { useState } from 'react';
import { BiPlay } from 'react-icons/bi';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { z } from 'zod';
import CTAButton from '~/components/shared/core/Cards/CTAButton';
import { ProductCard } from '~/components/shared/core/Cards/Card';
import ProductsSlider from '~/components/shared/core/Cards/Slider';
import Clickable from '~/components/shared/core/Clickable';
import ProductPrice from '~/components/shared/core/ProductPrice';
import {
	loopsGoCrazyVol5Product as productData,
	shopifyFakeProductsData
} from '~/utils/appData';

const media = productData.media[0];

if (!media) throw new Error('No media found for the product!');

const medias = '_'
	.repeat(4)
	.split('_')
	.map(() => media);

const products = shopifyFakeProductsData.filter(
	(product) => product.id !== productData.id
);

const TempPreviewProductPage = () => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	return (
		<div className="text-h6 leading-primary-3 p-16 text-text-primary-300 flex flex-col gap-12">
			<section className="w-full flex flex-col-reverse md:flex-row-reverse items-center gap-12 mx-auto max-w-[140ch]">
				<div className="flex-grow my-4 flex flex-col gap-2 text-center md:text-align-initial">
					<div className="flex flex-col gap-6 items-center md:items-start">
						<div className="flex flex-col gap-2 items-center md:items-start">
							<h1 className="text-text-primary-500 text-h3">
								{productData.title}
							</h1>
							<div className="w-fit flex flex-wrap gap-8 mx-auto sm:mx-0">
								<p className="whitespace-nowrap text-text-primary-500/60">
									<ProductPrice
										price={productData.price}
										compare_at_price={productData.compare_at_price}
									/>
								</p>
								<div className="flex rounded-xl overflow-hidden">
									<Clickable
										variants={{ btn: null, px: null, py: null, rounded: null }}
										className="bg-bg-primary-600 px-2 flex items-center justify-center"
										onClick={() =>
											setSelectedQuantity((prev) =>
												prev === 0 ? prev : prev - 1
											)
										}
										disabled={selectedQuantity === 0}
									>
										<FaMinus className="text-[60%]" />
									</Clickable>
									<input
										className="w-fit px-2"
										style={{
											width: `${selectedQuantity.toString().length + 2}ch`
										}}
										value={selectedQuantity}
										onChange={(event) =>
											setSelectedQuantity((prev) => {
												const valueAsNumberSchema = z
													.number()
													.min(0)
													.finite()
													.safeParse(Number(event.target.value));
												return valueAsNumberSchema.success
													? valueAsNumberSchema.data
													: prev;
												// isNaN(valueAsNumber) ||
												// 	!isFinite(valueAsNumber) ||
												// 	valueAsNumber < 0
												// 	? prev
												// 	: valueAsNumber;
											})
										}
										name="selectedQuantity"
									/>
									<Clickable
										variants={{ btn: null, px: null, py: null, rounded: null }}
										className="bg-bg-primary-600 px-2 flex items-center justify-center"
										onClick={() => setSelectedQuantity((prev) => prev + 1)}
									>
										<FaPlus className="text-[60%]" />
									</Clickable>
								</div>
							</div>
						</div>
						<Clickable
							className="uppercase mt-4"
							variants={{ py: 'sm', px: 'lg' }}
							disabled={selectedQuantity === 0}
						>
							Add To Cart
						</Clickable>
						<p className="max-w-[52ch]">
							The worldwide conglomerate @MSXIISOUND continues to keep music
							producers worldwide inspired with the Loops Go Crazy Vol. 5 sample
							pack! Back with the vibes, fans of our Billboard #1, multiple
							Grammy Nominated Lofi Melodics series will find this goldmine game
							changing!
						</p>
					</div>
				</div>
				<div className="aspect-square md:w-4/12 rounded-xl overflow-hidden">
					<Image
						src={productData.featured_image}
						alt=""
						width={800}
						height={800}
						className="w-full object-cover aspect-square"
						priority
					/>
				</div>
			</section>
			<section className="w-full mx-auto max-w-[140ch] flex flex-col py-16 gap-16">
				<div className="px-8 mx-auto max-w-[131ch] flex flex-col gap-2">
					<h2 className="font-normal text-text-primary-400 text-h3">Details</h2>
					<p>
						35 original loops ready to rock in various tempos, keys, and with
						numerous textures and colors. Processed tastefully to add warmth,
						depth, and a creative touch, Loops Go Crazy Vol. 5 boasts more
						creativity, better textures and the MSXII authentication you&apos;re
						looking for!
					</p>
					<p>
						When you need the best, tap in with MSXII. Purchase now & be a
						champ. Demo showcases a selection of these samples in the pack!
					</p>
				</div>
				<iframe
					className="w-full rounded-3xl"
					width="560"
					height="515"
					src="https://www.youtube.com/embed/TDI_97_Gu6c"
					title="YouTube video player"
					frameBorder={0}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			</section>
			<section className="w-full mx-auto max-w-[140ch] bg-initial-primary-0 text-initial-primary-500 flex flex-col gap-10 rounded-3xl py-12 px-16">
				<h2 className="font-normal text-initial-primary-500 text-h3">
					Preview Samples
				</h2>
				<div className="flex flex-col gap-8">
					{medias.map((media) => (
						<article key={productData.id} className="flex gap-8">
							<div className="w-24 h-24 aspect-square overflow-hidden rounded-sm relative">
								<Image
									src={media.src}
									alt={media.alt || ''}
									width={800}
									height={800}
									className="w-full h-full object-cover"
								/>
								<Clickable
									className="absolute bottom-0 right-0 m-2 flex items-center justify-center"
									variants={{ px: 'sm', py: 'sm', rounded: 'full' }}
								>
									<BiPlay className="text-2xl translate-x-[7.5%] scale-110 rtl:-translate-x-[5%] rtl:rotate-180" />
								</Clickable>
							</div>
							<div className="flex flex-col gap-2 flex-grow py-2">
								<div className="rounded-sm py-2 bg-special-primary-500" />
								<h3 className="font-normal text-initial-primary-400 text-[100%]">
									Lorem ipsum
								</h3>
							</div>
						</article>
					))}
				</div>
				<p>+ so many more high quality samples</p>
			</section>
			<div className="text-text-primary-500">
				<CTAButton
					text="Explore more high quality packs"
					isA="next-js"
					href="/products"
				/>
			</div>
			<article>
				<header>
					<h2 className="font-normal text-text-primary-400 text-h3">
						Related products
					</h2>
				</header>
				<ProductsSlider
					products={products}
					CardElem={ProductCard}
					nextSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
					previousSlideButtonClassName="-translate-y-[200%] lg:-translate-y-[225%]"
				/>
			</article>
		</div>
	);
};

export default TempPreviewProductPage;
