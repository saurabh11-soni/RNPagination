import { View, Text, Image } from 'react-native';
import React, { FC, memo } from 'react';
import { ProductProps } from '../screens/useProducrts';
import { styles } from './productCard.style';

interface ProductCardProps {
  product: ProductProps;
  index?: number;
}

const ProductCard: FC<ProductCardProps> = ({ product, index }) => {
  return (
    <View style={styles.card}>
      <View style={styles.image_bg}>
        <Image
          source={{ uri: product.thumbnail }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <Text numberOfLines={2} allowFontScaling={false} style={styles.title}>{product.title}</Text>
      </View>
    </View>
  );
};

export default memo(ProductCard);
