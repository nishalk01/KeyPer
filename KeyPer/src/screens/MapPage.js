import React,{useEffect,useState} from 'react'
import { View,Text,PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {ACESS_TOKEN} from '../../token/access_token';


MapboxGL.setAccessToken(ACESS_TOKEN);

function MapPage() {
    const [positions,setPosition]=useState(null);

    useEffect(()=>{
        const  AccessGPS=async()=>{
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "GPSLocation",
              message:
                "I need man plz " +
                "i can track u then",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          console.log(granted)
          if(granted === PermissionsAndroid.RESULTS.GRANTED){
              Geolocation.getCurrentPosition((position)=>{
                console.log(position)
                  setPosition([
                    position.coords.longitude,
                    position.coords.latitude
                  ]);
              })
          }
          else
          if(granted===PermissionsAndroid.RESULTS.DENIED){ //TODO handle denied
            Alert("cannot aceess gps ")
          }
         }
         AccessGPS()

      },[])
      
    const renderAnnotations = () => {
        return (
          <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={positions}>
            <View style={{
                      height: 30, 
                      width: 30, 
                      backgroundColor: '#00cccc', 
                      borderRadius: 50, 
                      borderColor: '#fff', 
                      borderWidth: 3
                    }} />
          </MapboxGL.PointAnnotation>
        );
      }


    return (
       <View style={{flex: 1, height: "100%", width: "100%" }}>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={16}
        centerCoordinate={positions}
        style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={positions}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
          {renderAnnotations()}
      </MapboxGL.MapView>
    </View>
    )
}


export default MapPage;