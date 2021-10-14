import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultText from "../../components/shop/DefaultText";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <ListItem>
        Our technology platform connects customers and delivery partners,
        serving their multiple needs.Customers Our Platform to order different
        food items.We also operate a one-stop procurement solution, Hyperpure,
        In which we will use high quality ingredients and kitchen products to
        prepare these items.We also provide our delivery partners with
        transparent and flexible earning opportunities.
      </ListItem>
      {/* <ListItem>Customers Our Platform to order different
        food items</ListItem>
        <ListItem>We also operate a one-stop procurement solution, Hyperpure,
        In which we will use high quality ingredients and kitchen products to
        prepare these items.</ListItem>
        <ListItem>We also provide our delivery partners with
        transparent and flexible earning opportunities.</ListItem> */}
    </View>
  );
};

export const screenOptions = navData => {
    return {
      headerTitle: 'About Screen',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    };
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    padding: 60,
    fontFamily: "open-sans",
    textAlign: "center",
  },
  listItem: {
    marginVertical: 30,
    marginHorizontal: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    lineHeight: 4
  },
});

export default AboutScreen;