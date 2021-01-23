import React,{useState,useEffect,useCallback} from 'react';
import {View,
        FlatList,
        Platform,
        ActivityIndicator,
        StyleSheet,
        Text,
        Button} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';


const ProductsOverviewScreen = props => {
    
    const [isLoading,setIsLoading] = useState(false)
    const [isRefreshing,setIsRefreshing] = useState(false)
    const [error,setError] = useState(false)
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
      setError(null)
      setIsRefreshing(true)
      try {
        await dispatch(productActions.fetchProducts())
      }
      catch(err){
        setError(err.message)
      }
      setIsRefreshing(false)
    },[dispatch,setIsLoading,setError])

    useEffect(() => {
      const willFocusSub = props.navigation.addListener(
        'willFocus',
        loadProducts
      )
      return () => {
        willFocusSub.remove()
      }
    },[loadProducts])


    useEffect(() => {
      setIsLoading(true)
      loadProducts().then(() => {
        setIsLoading(false)
      })
    },[dispatch,loadProducts])

    const selectItemHandler = (id,title) => {
      props.navigation.navigate('ProductDetail',{
        productId: id,
        productTitle: title
      })
    }

    if(error){
      return(
        <View style={styles.centered}>
          <Text>An error occurred</Text>
          <Button 
            title="Try again"
            color={Colors.primary}
            onPress={loadProducts}/>
        </View>
      )
    }

    if(isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
      )
    }

    if(!isLoading && products.length === 0){
      return(
        <View style={styles.centered}>
          <Text>No products found!! Try to Start adding products</Text>
        </View>
      )
    }
    return(
        <FlatList
            onRefresh={loadProducts} 
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
            <ProductItem 
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                   selectItemHandler(itemData.item.id,
                    itemData.item.title)
                }}
                >
                  <Button 
                    title="View Details"
                    color={Colors.primary}
                    onPress={() => {
                      selectItemHandler(itemData.item.id,
                        itemData.item.title)
                    }}
                    />
                    <Button 
                      title="To Cart"
                      color={Colors.primary}
                      onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                      }}
                      />
                </ProductItem>
            )}
            />
    )
}


ProductsOverviewScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Products',
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
              title="Menu"
              iconName="menu"
              onPress={() => {
                navData.navigation.toggleDrawer()
              }}/>
        </HeaderButtons>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
                navData.navigation.navigate('Cart')
            }}
          />
        </HeaderButtons>
      )
    };
  };

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
 
})

export default ProductsOverviewScreen;