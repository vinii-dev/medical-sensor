import { Camera as NativeCamera } from 'expo-camera';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// Types
type ImagePaddingMargin = {
  margin: number;
};

// Styles
const Container = styled.View`
  background-color: #000;
  flex: 1;
  justify-content: center;
`;

const Camera = styled(NativeCamera)<ImagePaddingMargin>`
  flex: 1;
  margin: ${({ margin }) => margin}px 0;
`;

const QrCloseButton = styled(TouchableOpacity)<ImagePaddingMargin>`
  align-self: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 999px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  margin-bottom: ${({ margin }) => margin + 10}px;
`;

export { QrCloseButton, Container, Camera };
