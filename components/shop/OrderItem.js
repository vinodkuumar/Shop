import React,{useState} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../UI/Card';


const OrderItem = props => {
    const [showDetails,setShowDetails] = useState(false)
    return(
        <Card style={styles.OrderItem}> 
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary}
                title= {showDetails ? 'Hidden Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
                />
                {showDetails && (
                    <View style={styles.detailItems}>
                        {props.items.map(cartItem => (
                            <CartItem 
                                key={cartItem.productId}
                                quantity = {cartItem.quantity}
                                amount = {cartItem.sum}
                                title={cartItem.productTitle}/>
                        ))}
                    </View>
                )}
        </Card>
    )
}

const styles = StyleSheet.create({
    OrderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'OpenSans-Regular',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
})

export default OrderItem;