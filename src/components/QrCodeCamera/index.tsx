import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Camera as NativeCamera } from 'expo-camera';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Camera, Container, QrCloseButton } from './styles';

type QrCodeCameraType = {
  onHandleBarCodeScanned: (result: BarCodeScannerResult) => void; //eslint-disable-line no-unused-vars
  onIconClose: () => void;
}

export const QrCodeCamera = ({ onHandleBarCodeScanned, onIconClose }: QrCodeCameraType) => {
  const [camera, setCamera] = useState<NativeCamera | null>(null);

  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] =  useState(false);

  const prepareRatio = async () => {
    let desiredRatio = '4:3';

    const ratios = await camera?.getSupportedRatiosAsync();

    if(!ratios) {
      throw 'Camera não inicializada';
    }

    const realRatios: { [key: string]: number } = {};
    const distances: typeof realRatios = {};
    let minDistance = null;

    for (const ratio of ratios) {
      const parts = ratio.split(':');
      const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
      realRatios[ratio] = realRatio;
      
      const distance = screenRatio - realRatio; 
      distances[ratio] = realRatio;
      if (minDistance == null) {
        minDistance = ratio;
      } else {
        if (distance >= 0 && distance < distances[minDistance]) {
          minDistance = ratio;
        }
      }
    }

    if (!minDistance) {
      throw 'Não foi possível encontrar uma distância miníma dos ratios';
    }
    
    desiredRatio = minDistance;
    
    const remainder = Math.floor(
      (height - realRatios[desiredRatio] * width) / 2
    );
    
    setImagePadding(remainder);
    setRatio(desiredRatio);
    
    setIsRatioSet(true);
  };

  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };
  return (
    <Container>
      <Camera
        margin={imagePadding}
        onCameraReady={setCameraReady}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={onHandleBarCodeScanned}
        ratio={ratio}
        ref={(ref) => {
          setCamera(ref);
        }}>
      </Camera>
      <QrCloseButton margin={imagePadding} onPress={onIconClose}>
        <MaterialIcons name='close' size={32} color="#fff" />
      </QrCloseButton>
    </Container>
  );
};