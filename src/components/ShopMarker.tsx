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
    <Text style={styles.markerContainer}>
      {/* <Image
        style={styles.markerImage}
        source={RestaurantImg}
        resizeMode="cover"
      /> */}
      <View>
        <Text style={styles.name}>{title}</Text>
        <Rating value={rating} />
      </View>
    </Text>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: verticalScale(60),
    paddingHorizontal: scale(25),
    paddingTop: scale(10),
    borderRadius: 10,
  },
  name: {
    fontSize: scale(14),
    color: COLORS.gray,
  },
  markerImage: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30),
    borderColor: COLORS.white,
    marginTop: -scale(10),
    paddingRight: scale(10),
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default memo(ShopMarker);
