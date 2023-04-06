import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import CustomNextImage from '~/components/shared/CustomNextImage';
import Clickable from '~/components/shared/core/Clickable';
import ProductPrice from '~/components/shared/core/ProductPrice';
import ProductQuantityControllers from '~/components/shared/core/ProductQuantityControllers';
import { useGlobalStore } from '~/store';
import { ShopifyProduct } from '~/utils/types';

const CartDropdown = () => {
	const isCartDropdownOpen = useGlobalStore(
		(store) => store.cart.isCartDropdownOpen
	);
	const cartItems = useGlobalStore((store) => store.cart.items);

	return (
		<AnimatePresence>
			{isCartDropdownOpen && (
				<motion.div
					initial={{ opacity: 0, y: '0%' }}
					animate={{ opacity: 1, y: '100%' }}
					exit={{ opacity: 0, y: '0%' }}
					transition={{ duration: 0.5 }}
					className={cx(
						'absolute bottom-0 right-0 rounded-bl-md origin-top p-4 -z-10',
						'bg-bg-primary-200 dark:bg-bg-primary-500',
						'w-full max-w-screen-xl-2-sm max-h-[75vh] overflow-x-hidden',
						'flex flex-col gap-8'
					)}
				>
					<header>
						<h3 className="text-h3 font-medium">Cart</h3>
					</header>
					<div
						className={cx(
							'flex flex-col gap-y-4 flex-grow overflow-y-auto overflow-x-hidden',
							cartItems.length >= 3 ? 'min-h-[5rem]' : ''
						)}
					>
						{cartItems.length === 0 ? (
							<article className="bg-bg-primary-600/50 dark:bg-bg-primary-700 p-8 text-center">
								<p>
									<strong className="font-bold">Empty</strong>
								</p>
							</article>
						) : (
							cartItems.map((item) => <CartItem key={item.id} item={item} />)
						)}
					</div>
					<CartDetails />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const CartDetails = () => {
	const { quantity, totalPrice } = useGlobalStore((store) =>
		store.cart.items.reduce(
			(acc, item) => {
				acc.totalPrice += item.price * item.quantity;
				acc.quantity += item.quantity;
				return acc;
			},
			{ totalPrice: 0, quantity: 0 }
		)
	);

	return (
		<div className="flex flex-col gap-2">
			<div className="bg-bg-primary-600/50 dark:bg-bg-primary-700 p-4 flex flex-wrap gap-4 justify-between">
				<p>
					Total Price:&nbsp;
					<ProductPrice price={totalPrice} compare_at_price={null} />
				</p>
				<p>Quantity: {quantity}</p>
			</div>
			{quantity !== 0 && (
				<Clickable variants={{ w: 'full', rounded: 'md' }} className="mt-2">
					Proceed To Checkout
				</Clickable>
			)}
		</div>
	);
};

const CartItem = ({
	item
}: {
	item: ShopifyProduct & { quantity: number };
}) => {
	const addToCart = useGlobalStore((store) => store.cart.addToCart);

	return (
		<article key={item.id} className="flex">
			<div className="rounded-sm aspect-square w-24 h-24">
				<div className="overflow-hidden">
					<CustomNextImage
						src={item.featured_image}
						alt={item.title}
						width={100}
						height={100}
						className="hover:scale-110 duration-300 transition-all w-full h-full object-cover"
					/>
				</div>
			</div>
			<div className="px-4 flex flex-col gap-2 overflow-hidden flex-grow">
				<h4 className="text-base max-w-[90%] ellipse-text" title={item.title}>
					{item.title}
				</h4>
				<div className="flex flex-wrap gap-2 justify-between">
					<ProductPrice
						price={item.price}
						compare_at_price={item.compare_at_price}
					/>
					<ProductQuantityControllers
						handleIncreaseByOne={() => addToCart(item, 1)}
						handleDecreaseByOne={() => addToCart(item, -1)}
						handleSetSelectedQuantity={(value) => addToCart(item, () => value)}
						quantity={item.quantity}
					/>
				</div>
			</div>
		</article>
	);
};

export default CartDropdown;