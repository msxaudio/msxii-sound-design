import { createTRPCRouter } from '~/server/api/trpc';
import { shopifyAuthRouter } from './auth';
import { shopifyCollectionsRouter } from './collections';
import { shopifyProductsRouter } from './products';

export const shopifyRouter = createTRPCRouter({
	auth: shopifyAuthRouter,
	collections: shopifyCollectionsRouter,
	products: shopifyProductsRouter
});