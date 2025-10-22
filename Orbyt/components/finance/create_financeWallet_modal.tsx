import React, { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useOrbytColor } from "@/hooks/defaultColors";

interface CreateFinanceWalletModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (name: string, balance: number) => void;
}

export default function CreateWalletModal({
  visible,
  onCancel,
  onConfirm,
}: CreateFinanceWalletModalProps) {
  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState<number | "">("");

  const background = useOrbytColor("backgroundItem");
  const textColor = useOrbytColor("text");
  const mainColor = useOrbytColor("main");

  const handleBalanceChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.,]/g, "");
    const normalized = cleaned.replace(",", ".");
    const parsed = parseFloat(normalized);

    if (isNaN(parsed)) {
      setBalance("");
    } else {
      setBalance(parsed);
    }
  };

  const handleConfirm = () => {
    if (walletName.trim().length === 0) return;
    if (typeof balance !== "number" || isNaN(balance)) return;

    onConfirm(walletName.trim(), balance);
    setWalletName("");
    setBalance("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: background }]}>
          <Text style={[styles.title, { color: textColor }]}>Create new wallet</Text>

          <TextInput
            value={walletName}
            onChangeText={setWalletName}
            placeholder="Wallet name"
            placeholderTextColor="#aaa"
            style={[styles.input, { color: textColor, borderColor: mainColor }]}
          />

          <TextInput
            value={balance === "" ? "" : balance.toString()}
            onChangeText={handleBalanceChange}
            placeholder="Initial balance"
            placeholderTextColor="#aaa"
            keyboardType="decimal-pad"
            style={[styles.input, { color: textColor, borderColor: mainColor }]}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: mainColor }]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: { color: "#999" },
  confirmText: { color: "#fff", fontWeight: "600" },
});
