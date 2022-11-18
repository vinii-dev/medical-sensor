import React, { useEffect, useState } from 'react';

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
import { GestureResponderEvent, ToastAndroid } from 'react-native';
import { db } from '../../services/sqlite';
import { SQLTransaction } from 'expo-sqlite';

type sensorType = {
  name: string;
  sensorCode: string;
  medList: string[];
};

export const SensorForm = ({ navigation }: any) => {
  const [sensorData, setSensorData] = useState<sensorType>({
    name: '',
    sensorCode: '',
    medList: [],
  });
  const [med, setMed] = useState('');
  const [openQrCode, setOpenQrCode] = useState(false);
  const hasPermission = Camera.useCameraPermissions();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sensors (id INTEGER PRIMARY KEY NOT NULL, name TEXT, code TEXT, medicines TEXT)'
      );
    });
  }, []);

  // MedList
  const onAddMedClick = () => {
    med.trim();

    if (!(sensorData.medList.includes(med) || med === '')) {
      setSensorData({ ...sensorData, medList: sensorData.medList.concat(med) });
      setMed('');
    }
  };

  const onDeleteMedClick = (med: string) => {
    const filteredMedList = sensorData.medList.filter(
      (medItem) => med !== medItem
    );

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
    setSensorData({ ...sensorData, sensorCode });
    console.log(sensorData);
  };

  const onQrCodeClick = () => {
    setOpenQrCode(true);
    navigation.setOptions({ headerShown: false });
  };

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    setSensorData({
      ...sensorData,
      sensorCode: data,
    });
    console.log(sensorData);
    setOpenQrCode(false);
    navigation.setOptions({ headerShown: true });
  };

  if (openQrCode && hasPermission) {
    return (
      <QrCodeCamera
        onHandleBarCodeScanned={handleBarCodeScanned}
        onIconClose={() => {
          setOpenQrCode(false);
          navigation.setOptions({ headerShown: true });
        }}
      />
    );
  }

  // Cadastrar button
  const handleCadastrar = (event: GestureResponderEvent) => {
    const { medList, name, sensorCode } = sensorData;

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO sensors (name, code, medicines) VALUES (?, ?, ?)',
        [name, sensorCode, medList.join(',')],
        undefined,
        (error) => {
          ToastAndroid.show('Ocorreu um erro', ToastAndroid.LONG);
          console.log(error);

          return error;
        }
      );
      tx.executeSql('SELECT * FROM sensors LIMIT 1', [], (_, { rows }) => {
        console.log(rows);
      });
    });
  };

  return (
    <Container>
      <FormInput
        labelName="Nome"
        placeholder="Ex.: Remédios da vovó"
        setDataFn={onNameInputChange}
        value={sensorData.name}
        gap={16}
      />

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
        gap={16}
      />

      <FormInput
        labelName="Remédios"
        placeholder="Ex.: Metronidazol"
        setDataFn={setMed}
        value={med}
        onIconPress={onAddMedClick}
        icon={
          <MaterialIcons name="add" size={26} color={theme.colors.primary} />
        }
        gap={16}
      />

      <ScrollView>
        {sensorData?.medList.map((med) => (
          <MedItem
            key={med}
            name={med}
            onDelete={() => onDeleteMedClick(med)}
          />
        ))}
      </ScrollView>
      <Button onPress={handleCadastrar}>Cadastrar</Button>
    </Container>
  );
};
