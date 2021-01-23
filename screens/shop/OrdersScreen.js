import React,{useState,useEffect} from 'react';
import {View,ActivityIndicator,FlatList,Text,Platform,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading,setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    console.log(orders)
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(true)
        dispatch(orderActions.fetchOrders()).then(() => {
        setIsLoading(false)
        })
    },[dispatch])

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }
    if(orders.length === 0){
        return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No order found, maybe start ordering some products?</Text>
      </View>
        )
    }
    return(
        <FlatList 
            data = {orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem 
                    amount = {itemData.item.totalAmount}
                    date = {itemData.item.readableDate}
                    items = {itemData.item.items}
                    />
            )}/>
    )
}

OrdersScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu"
                    iconName='menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                    />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default OrdersScreen;