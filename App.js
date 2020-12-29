import React,{useRef, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store"; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ScreenHome from "./src/components/Home";
import ScreenAdd from "./src/components/ScreenAdd"
import ScreenCamera from "./src/components/ScreenCamera";
import ScreenPost from "./src/components/ScreenPost";

const Stack = createStackNavigator();



const App = (props) => {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator>
               <Stack.Screen name="Home" component={ ScreenHome } />
                <Stack.Screen name="Add" component={ ScreenAdd } />
                <Stack.Screen name="Camera" component={ ScreenCamera } />
                <Stack.Screen name="Post" component={ ScreenPost } />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </>
      </PersistGate>
    </Provider>
  );
};

export default App;