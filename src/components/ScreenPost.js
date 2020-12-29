import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
  ScrollView,
  TextInput,
  Image,
  FlatList
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';

import { connect } from "react-redux";
import { deletePost } from "../actionCreators/actions";
import PostItem from './PostItem';


const ScreenPost = (props) => {
  const navigation = useNavigation();
  const {post} = props.route.params;
  const {deletePost} = props;


  const handleDelete = () => {
    deletePost(post.id);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleDelete} title="Delete" />
      ),
    });
  }, [navigation, handleDelete]);

  return(
    <ScrollView>
    <View style={styles.container}>
      <Text
        style={{height: 60, borderColor: 'blue', fontSize:20, }}
      >{post.title}</Text>
      {!(typeof post.photos !== 'undefined' && post.photos.length > 0) ? <Text>There are no photos yet</Text>
      :
      <View>
        <FlatList
          data={post.photos}
          contentContainerStyle={{margin: 5}}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1
              }}>
              <Image
                style={styles.image}
                source={{uri: item}}
              />
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
      }

      <MapView
        style={{height:300, width:'100%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: post.location.latitude,
          longitude: post.location.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.015,
        }}
        showsUserLocation={true}
        >
        <Marker
            coordinate={{latitude: post.location.latitude, longitude: post.location.longitude}}
            title="Accident"
            description={post.title}
          />
      </MapView>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 240,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => dispatch(deletePost(id)),
})

export default connect(null, mapDispatchToProps)(ScreenPost);