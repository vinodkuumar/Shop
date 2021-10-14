import React from 'react';

import SearchComponent from '../../components/shop/SearchComponent';


const SearchScreen = () => {
    return(
        <SearchComponent />
    )
    // const searchDirectory(itemsRef) {
    //     const searchText = searchText.toString();
    //     if(searchText === ""){
    //         listenforItems(itemsRef)
    //     }else{
    //         itemsRef.orderByChild("searchable").startAt(searchText).on('value', (snap) => {
    //             items = [];
    //             snap.forEach((child) => {
    //                 items.push({
    //                     title: child.val().title,
    //                 })
    //             })
                
    //         })
    //     }
    // }
}

export default SearchScreen;