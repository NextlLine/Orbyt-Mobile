import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  Modal,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_SIZE } from "./parallax-scroll-view";
import { Wallet } from "@/app/(tabs)/home";
import { useOrbytColor } from "@/assets/colors/defaultColors";

interface CustomSelectProps {
  style?: ViewStyle;
  children: React.ReactNode;
  data: Wallet[];
  onSelect: (i: number) => void;
}

export function CustomSelect({ children, data, onSelect }: CustomSelectProps) {
  const [visible, setVisible] = useState(false);
  const backgroundColor = useOrbytColor("backgroundItem");
  const textColor = useOrbytColor("text"); 

  const toggleModal = () => setVisible((prev) => !prev);

  const handleSelect = (index: number) => {
    onSelect(index);
    toggleModal();
  };

  const renderOption = ({ item, index }: { item: Wallet; index: number }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => handleSelect(index)}
    >
      <Text style={[styles.optionText, { color: textColor}]}>
        {item.name} — {item.currency.font} {item.total.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        {children || <Text style={[styles.buttonText, {color: useOrbytColor('loose')}]}>Select ▼</Text>}
      </TouchableOpacity>

      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor }]}>
                        <SafeAreaView>

              <Text style={[styles.modalTitle, { color: useOrbytColor('text') }]}>
                Choose the wallet
              </Text>
              <FlatList
                data={data}
                keyExtractor={(_, index) => String(index)}
                renderItem={renderOption}
                style={{ width: "100%" }}
              />
              <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                <Text style={styles.closeButton}>Cancel</Text>
              </TouchableOpacity>
               </SafeAreaView>
            </View>
         
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: { fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_SIZE.width * 1,
    maxHeight: SCREEN_SIZE.height * 0.5,
    padding: 20,
  },
  modalTitle: { fontSize: 18, marginBottom: 20 },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: { fontSize: 16 },
  cancelButton: {
    marginTop: 10,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#dfdfdf",
  },
  closeButton: { color: "black", fontWeight: "600" },
});
