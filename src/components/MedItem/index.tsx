import React from 'react';
import { Container, MedText } from './styles';
import Icon from '@expo/vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native';

type MedItemProps = {
  name: string;
  onDelete: () => void;
}

export const MedItem = ({ name, onDelete }: MedItemProps) => {
  return (
    <Container>
      <MedText>{name}</MedText>
      <TouchableHighlight underlayColor="#d6d5d5f8" style={{ padding: 4, backgroundColor: '#f8f8f8', borderRadius: 999 }} onPress={onDelete} >
        <Icon name="delete" color="red" size={24} />
      </TouchableHighlight>
    </Container>
  );
};
