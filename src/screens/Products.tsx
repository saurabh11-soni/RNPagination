import {
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, { FC } from 'react';
import { styles } from './products.style';
import ProductCard from '../components/ProductCard';
import useProducrts from './useProducrts';

const Products: FC = () => {
  const { productList, loading, error, loadMore, isEnd } = useProducrts();

  return (
    <View style={styles.products_container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content_container}>
        {error && productList.length === 0 ? (
          <Text>{error}</Text>
        ) : productList.length === 0 && loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={productList}
            numColumns={2}
            columnWrapperStyle={styles.column_wrapperStyle}
            contentContainerStyle={styles.list_container}
            renderItem={({ item }) => (
              <ProductCard key={item.id} product={item} />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              !isEnd && loading ? (
                <ActivityIndicator size="large" color="black" />
              ) : null
            }
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                No products found.
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default Products;
