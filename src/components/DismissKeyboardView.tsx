import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DissmissKeyboardView = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DissmissKeyboardView;
