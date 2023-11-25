import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import useAPI from "./Hooks/useAPI";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [showRescan, setShowRescan] = useState(false);

  const { scanStudent, leaveSeat, loading, error } = useAPI();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (scanData) {
        await scanStudent(parseInt(scanData));
      }
    })();
  }, [scanData]);

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

  };

  const handleLeaveSeat = async () =>{
    if(scanData){
      await leaveSeat(scanData)
      setScanData();
      setShowRescan(false);
    }

  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        type={"back"}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
      {scanData && showRescan && (
        <View style={styles.row}>
          <Button
            title="Scan Again?"
            containerStyle={{ marginRight: 20 }}
            style={styles.button}
            onPress={() => {
              setScanData();
              handleLeaveSeat();
              setShowRescan(false);
            }}
          />
          <View style={styles.space} />
          <Button
            title="Leave Seat"
            containerStyle={{ marginLeft: 20 }}
            style={styles.button}
            onPress={()=>{
              handleLeaveSeat()
            }}
          />
        </View>
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
  row: {
    flexDirection: "row",
    padding: 10,
  },
  space: {
    width: 20,
    height: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
