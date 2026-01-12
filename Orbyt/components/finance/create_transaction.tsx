import { useOrbytColor } from "@/hooks/defaultColors";
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function CreateTransactionModal({
  visible,
  onCancel,
  onConfirm,
  type,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (description: string, amount: number) => void;
  type: "incoming" | "outgoing";
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const backgroundItem = useOrbytColor("backgroundItem");
  const borderItem = useOrbytColor("borderItem");
  const text = useOrbytColor("text");
  const cancelColor = useOrbytColor("loose2");
  const confirmColor = useOrbytColor("gain2");

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.box,
            { backgroundColor: backgroundItem, borderColor: borderItem },
          ]}
        >
          <Text style={[styles.title, { color: text }]}>
            {type === "incoming" ? "Add Incoming" : "Add Outgoing"}
          </Text>

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { borderColor: borderItem, color: text }]}
          />
          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={[styles.input, { borderColor: borderItem, color: text }]}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, { backgroundColor: cancelColor, marginRight: 8 }]}
            >
              <Text style={[styles.buttonText, { color: text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onConfirm(description, parseFloat(amount))}
              style={[styles.button, { backgroundColor: confirmColor, marginLeft: 8 }]}
            >
              <Text style={[styles.buttonText, { color: text }]}>Add</Text>
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
    backgroundColor: "#0006",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 10,
    padding: 16,
    width: "80%",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
