import React, { useEffect, useState } from "react";
import {  Text,  View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const { width: screenWidth } = Dimensions.get('window')

const LugarTuristicoPhotos = () => {

  const [photosList, setPhotosListList] = useState([]);
  

  useEffect(() => {
    getListUrlPhotos();
  }, []);

  const getListUrlPhotos = () =>{
    firestore()
    .collection('lugar_turistico')
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
      //console.log(tempPhotList)
      setPhotosListList(tempPhotList);
    });
    //.then();
  };

  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: `${item.image}` }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          { item.title }
        </Text>
      </View>)
    }

    return (
      <View style={styles.container}>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 70}
          data={photosList}
          renderItem={_renderItem}
          hasParallaxImages={true}
          />
      </View>
    );
}

const styles = StyleSheet.create({
  item: {
    marginTop:30,
    width: screenWidth-60,
    height: screenWidth + 80,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title : {
    fontSize:24,
    color: '#0009',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default LugarTuristicoPhotos
