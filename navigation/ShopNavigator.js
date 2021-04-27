import React from 'react';
import {View,SafeAreaView,Button} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';


import Colors from '../constants/Colors';




const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary: ''
    },
    headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen

    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Icon 
                    name={Platform.OS === 'android' ? 'cart' : ''}
                    size={23}
                    color={drawerConfig.tintColor}/>
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
)

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Icon 
                    name={Platform.OS === 'android' ? 'list' : ''}
                    size={23}
                    color={drawerConfig.tintColor}
                    />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }   
)

const AdminNavigator = createStackNavigator(
    {
        userProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Icon 
                    name={Platform.OS === 'android' ? 'create' : ''}
                    size={23}
                    color={drawerConfig.tintColor}
                    />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }   
)

const ShopNavigator = createDrawerNavigator(
    {
            Products:  ProductsNavigator,
            Orders: OrdersNavigator,
            Admin: AdminNavigator
    },{
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            // const dispatch = useDispatch()
            return(
                <View style={{flex: 1,paddingTop: 20}}>
                    <SafeAreaView forceInset={{top: 'always',horizontal: 'never'}}>
                        <DrawerItems {...props} />
                        <Button 
                            title="Logout"
                            color={Colors.primary}
                            onPress={() => {
                                props.navigation.navigate('Auth')
                            }}/>
                    </SafeAreaView>
                </View>
            )
        }
    }
)

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
)

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)