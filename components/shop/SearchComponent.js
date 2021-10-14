import React,{useState} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Searchbar } from "react-native-paper";

const SearchComponent = () => {
    const [searchKeyword,setSearchKeyword] = useState('');
    return(
        <Searchbar
            style={styles.searchContainer} 
            placeholder="Search for a Product"
            value={searchKeyword}
            onSubmitEditing={() => {
                
            }}
            onChangeText={(text) => {
                setSearchKeyword(text)
            }}
        />
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        padding: 8,
        position: 'absolute',
        zIndex: 999,
        top: 30,
        width: '100%'
    }
})

export default SearchComponent;