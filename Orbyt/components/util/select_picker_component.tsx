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
import { useOrbytColor } from "@/hooks/defaultColors";
import { FinanceWallet } from "@/model/models";
import { Trash2, Plus } from "lucide-react-native";
import { ThemedView } from "./themed-view";

interface CustomSelectProps {
  style?: ViewStyle;
  children: React.ReactNode;
  data: FinanceWallet[];
  onSelect: (i: number) => void;
  onDelete?: (i: number) => void;
  onCreateWallet: () => void;
  visible: boolean;
  toggle: () => void;
}

export function CustomSelect({
  children,
  data,
  onSelect,
  onDelete,
  onCreateWallet,
  visible,
  toggle
}: CustomSelectProps) {

  const backgroundItem = useOrbytColor("backgroundItem");
  const textColor = useOrbytColor("text");
  const textInvert = useOrbytColor("textInvert")
  const accentColor = useOrbytColor("primary");
  const borderColor = useOrbytColor("borderItem");
  const deleteColor = useOrbytColor("loose")

  const handleSelect = (index: number) => {
    onSelect(index);
    toggle();
  };
  const handleCreate = () => onCreateWallet();
  const handleDelete = (index: number) => { if (onDelete) onDelete(index); };

  const renderOption = ({ item, index }: { item: FinanceWallet; index: number }) => (
    <View style={styles.optionContainer}>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleSelect(index)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <Text style={[styles.optionText, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.optionText, { color: textColor }]}>
            {item.currency?.symbol} {item.balance.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity
          style={[styles.deleteButton, { borderColor: deleteColor }]}
          onPress={() => handleDelete(index)}
        >
          <Trash2 size={18} color={deleteColor} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={toggle}>
        {children}
      </TouchableOpacity>
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>

          <ThemedView style={[styles.modalContent, { backgroundColor: backgroundItem }]}>
            <SafeAreaView>
              <ThemedView style={[styles.header,]}>
                <Text style={[styles.modalTitle, { color: textColor }]}>
                  Choose the wallet
                </Text>

                <TouchableOpacity
                  style={[styles.createButton, { borderColor: borderColor }]}
                  onPress={handleCreate}
                >
                  <Plus size={16} color={accentColor} />
                  <Text style={[styles.createButtonText, { color: accentColor }]}>
                    Create wallet
                  </Text>
                </TouchableOpacity>

              </ThemedView>

              <FlatList
                data={data}
                keyExtractor={(_, index) => String(index)}
                renderItem={renderOption}
                style={{ width: "100%" }}
              />

              <TouchableOpacity style={[styles.cancelButton, { backgroundColor: accentColor }]} onPress={toggle}>
                <Text style={[styles.closeButton, { color: textInvert }]}>Cancel</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ThemedView>
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
    width: '100%',
    maxHeight: '60%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  modalTitle: { fontSize: 18, fontWeight: "600" },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
  },
  optionButton: { flex: 1 },
  optionText: { fontSize: 16 },
  deleteButton: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  closeButton: { fontWeight: "600" },
});
