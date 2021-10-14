import React from 'react';
// import {createAppContainer,createSwitchNavigator} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';

import {createStackNavigator} from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerItemList
  } from '@react-navigation/drawer';
  import { Platform, SafeAreaView, Button, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux'

import ProductsOverviewScreen, {
    screenOptions as productsOverviewScreenOptions
  } from '../screens/shop/ProductsOverviewScreen';
  import ProductDetailScreen, {
    screenOptions as productDetailScreenOptions
  } from '../screens/shop/ProductDetailScreen';
  import CartScreen, {
    screenOptions as cartScreenOptions
  } from '../screens/shop/CartScreen';
  import OrdersScreen, {
    screenOptions as ordersScreenOptions
  } from '../screens/shop/OrdersScreen';
  import SearchScreen,{screenOptions as searchScreenOptions} from '../screens/shop/SearchScreen';
  import UserProductsScreen, {
    screenOptions as userProductsScreenOptions
  } from '../screens/user/UserProductsScreen';
  import EditProductScreen, {
    screenOptions as editProductScreenOptions
  } from '../screens/user/EditProductScreen';
  import AuthScreen, {
    screenOptions as authScreenOptions
  } from '../screens/user/AuthScreen';


import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import AboutScreen,{screenOptions as aboutScreenOptions} from '../screens/shop/AboutScreen';





const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };
  

  const ProductsStackNavigator = createStackNavigator();

  export const ProductsNavigator = () => {
    return (
      <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={productsOverviewScreenOptions}
        />
        <ProductsStackNavigator.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={productDetailScreenOptions}
        />
        <ProductsStackNavigator.Screen
          name="Cart"
          component={CartScreen}
          options={cartScreenOptions}
        />
      </ProductsStackNavigator.Navigator>
    );
  };


// const ProductsNavigator = createStackNavigator(
//     {
//         ProductsOverview: ProductsOverviewScreen,
//         ProductDetail: ProductDetailScreen,
//         Cart: CartScreen

//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Icon 
//                     name={Platform.OS === 'android' ? 'cart' : ''}
//                     size={23}
//                     color={drawerConfig.tintColor}/>
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }
// )

// const OrdersNavigator = createStackNavigator(
//     {
//         Orders: OrdersScreen
//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Icon 
//                     name={Platform.OS === 'android' ? 'list' : ''}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                     />
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }   
// )

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//     {
//         userProducts: UserProductsScreen,
//         EditProduct: EditProductScreen
//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Icon 
//                     name={Platform.OS === 'android' ? 'create' : ''}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                     />
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }   
// )


const AboutStackNavigator = createStackNavigator();
export const AboutNavigator = () => {
  return(
    <AboutStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AboutStackNavigator.Screen 
        name="About" 
        component={AboutScreen}
        options={aboutScreenOptions} />
    </AboutStackNavigator.Navigator>
  )
}


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="About"
        component={AboutNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'information' : 'ios-information'}
              size={23}
              color={props.color}
              /> 
          )
        }}
        />
    </ShopDrawerNavigator.Navigator>
  );
};

{/* const ShopNavigator = createDrawerNavigator(
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
) */}


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};


// const AuthNavigator = createStackNavigator(
//     {
//         Auth: AuthScreen
//     },
//     {
//         defaultNavigationOptions: defaultNavOptions
//     }
// )

// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// })

// export default createAppContainer(MainNavigator)