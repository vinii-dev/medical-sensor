import React, { ReactNode, useState } from 'react';
import { View, TextInputProps } from 'react-native';
import { Input, InputLabel, Container, IconButton } from './styles';

interface FormInputProps extends TextInputProps {
  labelName: string,
  icon?: ReactNode | undefined, 
  gap?: number,
  setDataFn: (data: string) => void, //eslint-disable-line no-unused-vars
  onIconPress?: () => void,
}

export const FormInput = ({ 
  labelName, 
  icon: Icon, 
  gap, 
  setDataFn,
  onIconPress,
  ...props 
}: FormInputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={{ marginBottom: gap ? gap : 0 }}>
      <InputLabel>{labelName}</InputLabel>
      <Container focus={focus}> 
        <Input
          onChangeText={setDataFn} 
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} 
          {...props} />
        <IconButton onPress={onIconPress}>
          {Icon}
        </IconButton>
      </Container>
    </View>
  );
};
