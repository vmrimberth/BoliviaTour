import React, { useEffect, useState } from "react";
import {  Text,  View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const LugarTuristicoPhotos = () => {

  const [photosList, setPhotosListList] = useState([]);

  useEffect(() => {
    getListUrlPhotos();
 }, []);


 const getListUrlPhotos = () =>{
     firestore()
     .collection('lugar_turistico')
     //.get()
     .onSnapshot(async (fLugarTuristicoList) => {
         let tempPhotList = [];
         let promiseImages = [];
         fLugarTuristicoList.forEach(fLugarTuristico => {
             tempPhotList.push({title: fLugarTuristico.data().nombre, image:''});
             promiseImages.push(storage().ref(fLugarTuristico.data().imagen).getDownloadURL());
         });
         const resultPromises = await Promise.all(promiseImages);
         resultPromises.forEach((url, index) => {
          tempPhotList[index].image = url;
        })
         console.log(tempPhotList)
         setPhotosListList(tempPhotList);
     });
     //.then();
 };

  const carouselItems = [
    {
      title:"Item 1",
      text: "Text 1",
    },
    {
        title:"Item 2",
        text: "Text 2",
    },
    {
        title:"Item 3",
        text: "Text 3",
    },
    {
        title:"Item 4",
        text: "Text 4",
    },
    {
        title:"Item 5",
        text: "Text 5",
    },
  ];
    

    function _renderItem({item}) {
        return (
          <View style={styles.carouselItemContainer}>
            <Text style={styles.carouselItemTitle}>{item.title}</Text>
            <Image style={styles.carouserItemImage} source={{uri:`${item.image}`}}/>
          </View>

        )
    }

    return (
            <View style={styles.container}>
                  <Carousel
                  layout={'tinder'}
                  layoutCardOffset={10}
                  data={photosList}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem}
                  />
            </View>
    );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  carouselItemContainer : {
    backgroundColor: '#333',
    borderRadius: 4,
    height: 300,
    padding: 20,
    marginTop: 20
  }, 
  carouserItemImage : {
    width: '100%',
    height: 200,
    borderRadius: 4
  },
  carouselItemTitle : {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default LugarTuristicoPhotos
