import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface buttonProps {
  title: string,
  onPress: () => void,
  backgroundColor: string
}


const CustomButton = ({ title, onPress, backgroundColor }: buttonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Default background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Default text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
