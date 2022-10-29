import styled from 'styled-components/native';

// Types
type ContainerType = {
  focus: boolean;
}

// Styles
export const InputLabel = styled.Text`
  font-size: 18px;
  font-weight: 500;

  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-size: 16px;
  flex: 1;

  margin-right: 16px;
`;

export const Container = styled.View<ContainerType>`
  height: 56px;
  padding: 8px 18px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;

  border: ${props => props.focus
    ? '2px solid '+props.theme.colors.primary 
    : '1px solid #ddd'
  // eslint-disable-next-line indent
  };
`;

export const IconButton = styled.TouchableOpacity`
  height: 100%;
  aspect-ratio: 1;

  justify-content: center;
  align-items: flex-end;
`;
