import { FaMinus, FaPlus } from 'react-icons/fa';
import { z } from 'zod';
import Clickable from '~/components/shared/core/Clickable';

const ProductQuantityControllers = ({
	handleIncreaseByOne,
	handleDecreaseByOne,
	handleSetSelectedQuantity,
	quantity,
	isLoading
}: {
	handleIncreaseByOne(): void;
	handleDecreaseByOne(): void;
	handleSetSelectedQuantity(value: number): void;
	quantity: number;
	isLoading?: boolean;
}) => {
	return (
		<div className="flex rounded-xl overflow-hidden">
			<Clickable
				variants={{ btn: null, px: null, py: null, rounded: null }}
				className="bg-bg-primary-600 px-2 flex items-center justify-center"
				onClick={handleDecreaseByOne}
				disabled={quantity === 0 || isLoading}
			>
				<FaMinus className="text-[60%]" />
			</Clickable>
			<input
				className="w-fit px-2 focus:outline-none"
				style={{
					width: `${quantity.toString().length + 2}ch`
				}}
				value={quantity}
				onChange={(event) => {
					const valueAsNumberSchema = z
						.number()
						.min(0)
						.finite()
						.safeParse(Number(event.target.value));

					if (valueAsNumberSchema.success)
						handleSetSelectedQuantity(valueAsNumberSchema.data);
				}}
				name="quantity"
				readOnly={isLoading}
			/>
			<Clickable
				variants={{ btn: null, px: null, py: null, rounded: null }}
				className="bg-bg-primary-600 px-2 flex items-center justify-center"
				onClick={handleIncreaseByOne}
				disabled={isLoading}
			>
				<FaPlus className="text-[60%]" />
			</Clickable>
		</div>
	);
};

export default ProductQuantityControllers;

/*


const QuantityInputField = (props: {
	selectedQuantity: number
	setSelectedQuantity: Dispatch<SetStateAction<number>>

}) => {
	return (<div className="flex rounded-xl overflow-hidden">
	<Clickable
		variants={{ btn: null, px: null, py: null, rounded: null }}
		className="bg-bg-primary-600 px-2 flex items-center justify-center"
		onClick={() =>
			props.setSelectedQuantity((prev) =>
				prev === 0 ? prev : prev - 1
			)
		}
		disabled={props.selectedQuantity === 0}
	>
		<FaMinus className="text-[60%]" />
	</Clickable>
	<input
		className="w-fit px-2"
		style={{
			width: `${props.selectedQuantity.toString().length + 2}ch`
		}}
		value={props.selectedQuantity}
		onChange={(event) =>
			props.setSelectedQuantity((prev) => {
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
		onClick={() => props.setSelectedQuantity((prev) => prev + 1)}
	>
		<FaPlus className="text-[60%]" />
	</Clickable>
</div>)
}
*/
