import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constant/theme';
import {scale} from '../utils/responsive';

interface Props {
  title: string;
  isLogOut: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<Props> = ({title, isLogOut, onBackPress}) => {
  return (
    <View style={styles.header}>
      {onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>
            {isLogOut ? 'Logout' : 'Back'}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.lightGreen,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: scale(18),
    fontFamily: 'Poppins-Semibold',
    color: COLORS.white,
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 5,
    position: 'absolute',
    left: 10,
  },
  backButtonText: {
    fontSize: scale(16),
    color: COLORS.white,
  },
});

export default Header;
