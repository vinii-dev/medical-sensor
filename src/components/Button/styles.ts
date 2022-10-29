import styled from 'styled-components/native';

const PrimaryButton = styled.TouchableHighlight`
  background-color: ${(prop) => prop.theme.colors.primary};
  padding: 14px 2px;
  border-radius: 32px;
  margin-bottom: 16px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export { PrimaryButton, ButtonText };