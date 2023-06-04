import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure
} from '~/server/api/trpc';
import { customerAccessTokenCreateInputSchema } from '~/utils/shopify/client/auth';
import {
	ACCESS_TOKEN_KEY,
	handleShopifyErrors
} from '~/utils/shopify/client/utils';

export const shopifyAuthRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				firstName: z.string().min(2),
				lastName: z.string().min(2),
				email: z.string().email(),
				password: z.string().min(8),
				phone: z.string().optional(),
				acceptsMarketing: z.boolean()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const data = await ctx.shopifyClient.auth.customer.mutations
				.create(input)
				.then((result) => {
					handleShopifyErrors(result.customerCreate.customerUserErrors, {
						code: 'BAD_REQUEST',
						errorCodeMessageMap: {
							TAKEN: 'account already exists check your email for confirmation'
						}
					});

					return result;
				});

			const accessTokenInfo = await ctx.shopifyClient.auth.customer.mutations
				.accessTokenCreate(input)
				.then((result) => {
					handleShopifyErrors(
						result.customerAccessTokenCreate.customerUserErrors,
						{
							code: 'BAD_REQUEST',
							customMessage: 'please check your email and password'
						}
					);

					return result.customerAccessTokenCreate.customerAccessToken;
				});

			return {
				customer: data.customerCreate.customer,
				accessToken: accessTokenInfo.accessToken
			};
		}),

	login: publicProcedure
		.input(customerAccessTokenCreateInputSchema)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.cookieManger)
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

			const accessTokenInfo = await ctx.shopifyClient.auth.customer.mutations
				.accessTokenCreate(input)
				.then((result) => {
					handleShopifyErrors(
						result.customerAccessTokenCreate.customerUserErrors,
						{
							code: 'BAD_REQUEST',
							customMessage: 'please check your email and password'
						}
					);

					return result.customerAccessTokenCreate.customerAccessToken;
				});

			const data =
				await ctx.shopifyClient.auth.customer.queries.dataByAccessToken({
					customerAccessToken: accessTokenInfo.accessToken
				});

			ctx.cookieManger.setOne(ACCESS_TOKEN_KEY, accessTokenInfo.accessToken, {
				maxAge:
					(new Date(accessTokenInfo.expiresAt).getTime() - Date.now()) / 1000,
				httpOnly: true,
				secure: true,
				sameSite: 'strict'
			});

			return {
				customer: data.customer,
				accessToken: accessTokenInfo.accessToken
			};
		}),

	checkAccessToken: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.cookieManger)
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

		const customerAccessToken = ctx.cookieManger.getOne(ACCESS_TOKEN_KEY);

		if (
			typeof customerAccessToken !== 'string' ||
			customerAccessToken.length < 3
		)
			throw new TRPCError({ code: 'FORBIDDEN' });

		const data =
			await ctx.shopifyClient.auth.customer.queries.dataByAccessToken({
				customerAccessToken
			});

		return {
			customer: data.customer,
			accessToken: customerAccessToken
		};
	}),

	signOut: protectedProcedure.mutation(async ({ ctx }) => {
		const data =
			(await ctx.shopifyClient.auth.customer.mutations.accessTokenDelete({
				customerAccessToken: ctx.accessToken
			})) as {
				customerAccessTokenDelete: {
					deletedAccessToken: string;
					deletedCustomerAccessTokenId: string;
					userErrors: [];
				};
			};

		ctx.cookieManger.deleteOne(ACCESS_TOKEN_KEY);

		return data;
	})
});
