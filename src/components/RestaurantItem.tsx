import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {scale, verticalScale} from '../utils/responsive';
import Rating from './Rating';

// import images
import restaurantImg from '../assets/icons/img.png';
import locationIcon from '../assets/icons/map.png';
import {COLORS} from '../constant/theme';

interface Restaurant {
  id: string;
  title: string;
  image: ImageSourcePropType;
  latitude: number;
  longitude: number;
  rating: number;
}

interface Props {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

const RestaurantItem: React.FC<Props> = ({restaurant, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={restaurantImg} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{restaurant.title}</Text>
        <Rating value={restaurant.rating} />
      </View>
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={() => onPress(restaurant)}>
        <Image
          source={locationIcon}
          resizeMode="contain"
          style={styles.locationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: scale(16),
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  imageContainer: {
    width: verticalScale(70),
    height: verticalScale(70),
    borderRadius: verticalScale(8),
    overflow: 'hidden',
  },
  image: {
    width: verticalScale(70),
    height: verticalScale(70),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scale(16),
  },
  name: {
    fontSize: scale(14),
    marginBottom: verticalScale(8),
  },
  locationContainer: {
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: verticalScale(8),
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    height: verticalScale(20),
    width: verticalScale(20),
  },
});

export default RestaurantItem;
