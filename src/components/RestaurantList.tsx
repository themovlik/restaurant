import React, {memo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './Loader';
import {fetchRestaurants, Restaurants} from '../../restaurantListSlice';
import {RootState} from '../../store';
import RestaurantItem from './RestaurantItem';
import {COLORS} from '../constant/theme';
import {scale} from '../utils/responsive';

interface RestaurantListProps {
  onEndReached?: () => void;
}

const RestaurantList = ({onEndReached}: RestaurantListProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {restaurants, status, loading, errorMessage, nextPage} = useSelector(
    (state: RootState) => state.restaurantsList,
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleEndReached = () => {
    if (status === 'fulfilled' && nextPage) {
      dispatch(fetchRestaurants(nextPage));
    }
  };

  const handlePress = (restaurant: Restaurants) => {
    navigation.navigate('RouteScreen', {restaurant});
  };

  const renderRestaurantItem = ({item}: {item: Restaurants}) => {
    return <RestaurantItem restaurant={item} onPress={handlePress} />;
  };

  if (loading) {
    return <Loader style={styles.loaderContainer} />;
  }

  if (status === 'rejected') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => item.id.toString()}
      renderItem={renderRestaurantItem}
      style={styles.container}
      //   onEndReached={onEndReached || handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && <Loader size="small" />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: scale(14),
    color: COLORS.red,
  },
  loaderContainer: {
    height: '90%',
    alignSelf: 'center',
  },
});

export default memo(RestaurantList);
