import React,{useState} from 'react';
import {View,Text,Button,StyleSheet,FlatList,ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card'

const CartScreen = props => {
    const [isLoading,setIsLoading] = useState(false)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    console.log("@total",cartTotalAmount)
    const cartItems = useSelector(
        state => {
            const transformedCartIems = [];
            for(const key in state.cart.items){
                transformedCartIems.push({
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum
                })
            }
            return transformedCartIems.sort((a,b) => 
                a.productId > b.productId ? 1 : -1);
        }
    )
    const sendOrderHandler = async () => {
        setIsLoading(true)
       await dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
        setIsLoading(false) 
    }
    const dispatch = useDispatch()
    return(
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: {' '}
                    <Text style={styles.amount}>
                    ${Math.round(cartTotalAmount.toFixed(2) * 100 /100 )}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> : 
                <Button 
                color={Colors.accent}
                title="Order Now"
                disabled={cartItems.length === 0}
                onPress={sendOrderHandler}
                />
                }    
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem 
                        quantity= {itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.productId))}}/>
                )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen;