import React, {memo} from 'react';
import {Modal, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {COLORS} from '../constant/theme';
import {scale} from '../utils/responsive';

interface LoaderProps {
  visible: boolean;
  text?: string;
}

const LoaderModal: React.FC<LoaderProps> = ({visible, text}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            color={COLORS.lightGreen}
            size="large"
          />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: scale(100),
    height: scale(100),
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.gray,
    fontSize: scale(16),
    marginTop: scale(10),
  },
});

export default memo(LoaderModal);
