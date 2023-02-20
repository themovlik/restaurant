import React, {memo} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import {COLORS} from '../constant/theme';
import {scale, verticalScale} from '../utils/responsive';

interface Props {
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string | null;
  onChangeText?: (text: string) => void;
}

const Input: React.FC<Props> = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  errorMessage,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.lightgray}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginBottom: verticalScale(16),
  },
  input: {
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: COLORS.lightgray,
    borderRadius: 5,
    padding: scale(8),
    fontSize: scale(16),
    color: COLORS.gray,
  },
  error: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.red,
    marginTop: verticalScale(8),
  },
});

export default memo(Input);
