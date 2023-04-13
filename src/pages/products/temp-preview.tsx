import {
	schlumpLoopsBundleProduct as productData,
	shopifyFakeProductsData
} from '~/utils/appData';
import CustomProductScreen from '~/components/shared/core/CustomProductScreen';

const media = productData.media[0]!;

const medias = '_'
	.repeat(4)
	.split('_')
	.map(() => media);

const products = shopifyFakeProductsData.filter(
	(product) => product.id !== productData.id
);

const TempPreviewProductPage = () => {
	return (
		<CustomProductScreen
			productData={productData}
			medias={medias}
			products={products}
		/>
	);
};

export default TempPreviewProductPage;
