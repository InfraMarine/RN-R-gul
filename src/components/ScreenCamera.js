import React,{useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from 'react-native';

import CameraRoll, { save } from "@react-native-community/cameraroll";
import { RNCamera } from 'react-native-camera';

import { connect } from "react-redux";
import { savePhoto } from "../actionCreators/actions";

const ScreenCamera = (props) => {
  const {savePhoto} = props;
  const camRef = useRef();
  

  const takePicture = async () => {
    if (camRef.current) {
      const options = { quality: 0.5, base64: true};
      const data = await camRef.current.takePictureAsync(options);
      CameraRoll.save(data.uri)
      .then(uri => {
        console.log(uri);
        savePhoto(uri);
      })
      console.log(data.uri);
    }
  };

  return(
    <View style={styles.container}>
      <RNCamera
        ref={camRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 240,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
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
});


const mapDispatchToProps = (dispatch) => ({
  savePhoto: (uri) => dispatch(savePhoto(uri))
})

export default connect(null, mapDispatchToProps)(ScreenCamera);