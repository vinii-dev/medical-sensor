import React from 'react';
import { TouchableHighlightProps } from 'react-native';
import { ButtonText, PrimaryButton } from './styles';

export const Button = (props: TouchableHighlightProps) => {
  return (
    <PrimaryButton {...props}>
      <ButtonText>{props.children}</ButtonText>
    </PrimaryButton>
  );
};
