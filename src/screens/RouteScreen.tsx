import {StyleSheet, SafeAreaView, View, Text, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Callout,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {RouteProp} from '@react-navigation/native';
import Header from '../components/Header';
import {GOOGLE_MAPS_API_KEY} from '../constant/storageKeys';
import {COLORS} from '../constant/theme';
import UserLocation from '../components/UserLocation';
import DestinationIcon from '../assets/icons/shop-pin.png';
import ShopMarker from '../components/ShopMarker';

type RootStackParamList = {
  RouteScreen: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RouteScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'RouteScreen'>;
};

type LatLng = {
  latitude: number;
  longitude: number;
};

const RouteScreen: React.FC<Props> = ({navigation, route}) => {
  const {restaurant} = route.params;
  const [initialRegion, setInitialRegion] = useState<LatLng | undefined>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [userLocation, setUserLocation] = useState<LatLng | undefined>({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState<LatLng | undefined>({
    latitude: 0,
    longitude: 0,
  });
  const [directions, setDirections] = useState<LatLng[]>([]);
  const mapViewRef = useRef<MapView | null>(null);

  useEffect(() => {
    console.log(restaurant.latitude, restaurant.longitude);
    setDestination({
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
    });
    Geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        setUserLocation({latitude, longitude});
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    fetchDirections();
  }, [userLocation, destination]);

  const fetchDirections = async () => {
    if (userLocation && destination) {
      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const dest = `${destination.latitude},${destination.longitude}`;
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'OK') {
          const points = data.routes[0].overview_polyline.points;
          const decodedPoints = decodePolyline(points);
          setDirections(decodedPoints);

          // Zoom the map to the route
          const coordinates = decodedPoints.map(point => ({
            latitude: point.latitude,
            longitude: point.longitude,
          }));
          const options = {
            edgePadding: {top: 20, right: 20, bottom: 20, left: 20},
            animated: true,
            setTimeout: 500,
          };
          mapViewRef.current?.fitToCoordinates(coordinates, options);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const decodePolyline = (encoded: string) => {
    const poly = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push({latitude: lat / 1e5, longitude: lng / 1e5});
    }

    return poly;
  };

  return (
    <SafeAreaView>
      <Header
        title="Map View"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={
          initialRegion || {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
        }>
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title={'My Location'}
            children={<UserLocation size={40} />}
          />
        )}
        <Marker coordinate={destination} icon={DestinationIcon}>
          <Callout tooltip>
            <ShopMarker title={restaurant?.title} rating={restaurant?.rating} />
          </Callout>
        </Marker>
        {directions.length > 0 && (
          <Polyline
            coordinates={directions}
            strokeColor={COLORS.lightGreen}
            strokeWidth={5}
          />
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default RouteScreen;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
