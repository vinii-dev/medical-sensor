import React, { useState } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { BarCodeScannerResult } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { MedItem } from '../../components/MedItem';
import { QrCodeCamera } from '../../components/QrCodeCamera';
import theme from '../../styles';
import { Container, ScrollView } from './styles';

type sensorType = {
  name: string;
  sensorCode: string;
  medList: string[];
}

export const SensorForm = ({ navigation }: any) => {
  const [sensorData, setSensorData] = useState<sensorType>({
    name: '',
    sensorCode: '',
    medList: []
  });
  const [med, setMed] = useState('');
  const [openQrCode, setOpenQrCode] = useState(false);
  const hasPermission = Camera.useCameraPermissions();

  // MedList
  const onAddMedClick = () => {
    med.trim();
    
    if(!(sensorData.medList.includes(med) || med === '')) {
      setSensorData({...sensorData, medList: sensorData.medList.concat(med)});
      setMed('');
    }
  };

  const onDeleteMedClick = (med: string) => {
    const filteredMedList = sensorData.medList.filter((medItem) => med !== medItem);

    setSensorData({
      ...sensorData,
      medList: filteredMedList,
    });
  };

  // Name
  const onNameInputChange = (name: string) => {
    setSensorData({
      ...sensorData,
      name,
    });
  };

  // SensorCode
  const onSensorCodeInputChange = (sensorCode: string) => {
    setSensorData({...sensorData, sensorCode});
  };

  const onQrCodeClick = () => {
    setOpenQrCode(true);
    navigation.setOptions({ headerShown: false });
  };

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    setSensorData({
      ...sensorData,
      sensorCode: data
    });
    setOpenQrCode(false);
  };

  if(openQrCode && hasPermission) {
    return (
      <QrCodeCamera
        onHandleBarCodeScanned={handleBarCodeScanned}
        onIconClose={() => { setOpenQrCode(false);  navigation.setOptions({ headerShown: true }); }}/>
    );
  }

  return(
    <Container>
      <FormInput
        labelName="Nome" 
        placeholder="Ex.: Remédios da vovó"
        setDataFn={onNameInputChange}
        gap={16} />

      <FormInput
        labelName="Código do sensor" 
        placeholder="Ex.: 573727bf-82bb-49cd-819b-f82f8312f357"
        setDataFn={onSensorCodeInputChange}
        value={sensorData.sensorCode}
        onIconPress={onQrCodeClick}
        icon={
          <MaterialCommunityIcons
            name="line-scan" 
            size={26}
            color={theme.colors.primary} 
          />
        } 
        gap={16}/>

      <FormInput 
        labelName="Remédios" 
        placeholder="Ex.: Metronidazol"
        setDataFn={setMed}
        value={med}
        onIconPress={onAddMedClick}
        icon={
          <MaterialIcons
            name="add" 
            size={26}
            color={theme.colors.primary} />
        }
        gap={16}/>

      <ScrollView>
        {sensorData?.medList.map(med => (
          <MedItem
            key={med} 
            name={med}
            onDelete={() => onDeleteMedClick(med)}/>
        ))}
      </ScrollView>
      <Button>
        Cadastrar
      </Button>
    </Container>
  );
};
