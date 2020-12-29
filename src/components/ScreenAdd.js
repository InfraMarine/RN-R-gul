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
import { savePost } from "../actionCreators/actions";
import { clearPhotos } from "../actionCreators/actions";

Geocoder.init("AIzaSyDuzpJztRVnAX3JU-60Bq9pz3_D-eYfzjc", {language : "ua"});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const ScreenAdd = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [title, setTitle] = useState("");

  const {savePost, clearPhotos, photos} = props;

  const requestGeolocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "R'Gul Geolocation Permission",
          message:
            "Our App needs access to your location ",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log("Geo permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestGeocoding = (latitude, longitude) => {
    // Search by geo-location (reverse geo-code)
    Geocoder.from(latitude, longitude)
    .then(json => {
      var addressComponent = json.results[0].address_components[0];
      console.log(addressComponent);
    })
    .catch(error => console.warn(error));
  }

  useEffect(() => {
    if (requestGeolocation()) {
      Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setLocation(position.coords)
            console.log(position.coords.latitude, position.coords.longitude);
            //requestGeocoding(position.coords.latitude, position.coords.longitude);
            setLoading(false);
           
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 600000 }
      );
    }
  }
  ,[])


  const handleSave = () => {
    if (title && typeof(photos) !== 'undefined' && photos.length > 0) {
      console.log(title);
      console.log(photos);
      savePost({
        id: uuidv4(),
        title: title,
        location: location,
        photos: [...photos]
      });
      clearPhotos();
      navigation.goBack();
    }
    else {
      console.log(title);
      console.log(photos);
      alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA! Plese enter somethong more")
    }
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleSave} title="Save" />
      ),
    });
  }, [navigation, handleSave]);

  return(
    <ScrollView>
    <View style={styles.container}>
      <TextInput
        style={{height: 60, borderColor: 'blue', fontSize:20, }}
        onChangeText={text => setTitle(text)}
        value={title}
        placeholder="Title"
      />

      <Button onPress={() => navigation.navigate("Camera")} title="Add photo" />

      {!(typeof photos !== 'undefined' && photos.length > 0) ? <Text>There are no photos yet</Text>
      :
      <View>
        <FlatList
          data={photos}
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

      {!loading && <MapView
        style={{height:300, width:'100%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.015,
        }}
        showsUserLocation={true}
        >
        <Marker
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            title="Accident"
            description="this is an accident marker" 
            draggable
            onDragEnd={(e) => {setLocation(e.nativeEvent.coordinate)}}
          />
      </MapView>}
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
  savePost: (post) => dispatch(savePost(post)),
  clearPhotos: () => dispatch(clearPhotos()),
})

const mapStateToProps = (state) => ({
  photos: state.photos
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreenAdd);