import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import useAPI from "./Hooks/useAPI";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [showRescan, setShowRescan] = useState(false);

  const {scanStudent, loading, error} = useAPI();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(()=>{
    (async()=>{
      if(scanData){
        await scanStudent(parseInt(scanData))
      }
      
    })()

  },[scanData])

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    setShowRescan(true);
    //console.log(`Data: ${data}`);
    
    //console.log(`Type: ${type}`);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        type={"back"}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
      {scanData && showRescan && (
        <Button
          title="Scan Again?"
          onPress={() => {
            setScanData();
            setShowRescan(false);
          }}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
