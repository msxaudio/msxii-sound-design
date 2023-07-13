import { blogRouter } from './routers/blog';
import { customPagesRouter } from './routers/custom-pages';
import { merchRouter } from './routers/merch';
import { createTRPCRouter } from '~/server/api/trpc';
import { testsRouter } from '~/server/api/routers/tests';
import { shopifyRouter } from './routers/shopify';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	tests: testsRouter,
	customPages: customPagesRouter,
	blog: blogRouter,
	merch: merchRouter,
	shopify: shopifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
