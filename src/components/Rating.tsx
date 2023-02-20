import React, {memo} from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import filledStar from '../assets/icons/Star-fill.png';
import emptyStar from '../assets/icons/Star-empty.png';
import {scale} from '../utils/responsive';

interface Props {
  value: number;
}

const Rating: React.FC<Props> = ({value}) => {
  const filledStars = Math.round(value);
  const emptyStars = 5 - filledStars;

  return (
    <Text style={styles.container}>
      {[...Array(filledStars)].map((_, index) => (
        <Image key={index.toString()} source={filledStar} style={styles.star} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Image key={index.toString()} source={emptyStar} style={styles.star} />
      ))}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(20),
  },
  star: {
    height: scale(15),
    width: scale(15),
  },
});

export default memo(Rating);
