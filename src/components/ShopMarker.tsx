import React, {memo} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constant/theme';
import {scale, verticalScale} from '../utils/responsive';
import Rating from './Rating';
import RestaurantImg from '../assets/icons/map-img.png';

interface ShopMarkerProps {
  title: string;
  rating: number;
}

const ShopMarker: React.FC<ShopMarkerProps> = ({title, rating}) => {
  return (
    <View key={title.toString()} style={styles.markerContainer}>
      <Text>
        <Image
          style={styles.markerImage}
          source={RestaurantImg}
          resizeMode="cover"
        />
      </Text>
      <View
        style={{
          justifyContent: 'center',
          paddingLeft: scale(10),
        }}>
        <Text style={styles.name}>{title}</Text>
        <Rating value={rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: verticalScale(50),
    paddingHorizontal: scale(10),
    borderRadius: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: scale(14),
    color: COLORS.gray,
    width: '100%',
  },
  markerImage: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30),
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default memo(ShopMarker);
