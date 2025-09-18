// select_picker_component.tsx
import React from "react";
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

interface CustomSelectProps {
  style?: ViewStyle;
  children: React.ReactNode;
  data: Wallet[];
  onSelect: (i: number) => void;
}

interface CustomSelectState {
  visible: boolean;
}

export class CustomSelect extends React.Component<
  CustomSelectProps,
  CustomSelectState
> {
  constructor(props: CustomSelectProps) {
    super(props);
    this.state = { visible: false };
  }

  toggleModal = () => {
    this.setState((prev) => ({ visible: !prev.visible }));
  };

  handleSelect = (index: number) => {
    this.props.onSelect(index);
    this.toggleModal();
  };

  renderOption = ({ item, index }: { item: Wallet; index: number }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => this.handleSelect(index)}
    >
      <Text style={styles.optionText}>
        {item.name} — {item.currency.font} {item.value.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { children, data } = this.props;
    const { visible } = this.state;

    return (
      <>
        <TouchableOpacity onPress={this.toggleModal}>
          {children || <Text style={styles.buttonText}>Select ▼</Text>}
        </TouchableOpacity>

        <Modal visible={visible} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <SafeAreaView>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose the wallet</Text>

                <FlatList
                  data={data}
                  keyExtractor={(_, index) => String(index)}
                  renderItem={this.renderOption}
                  style={{ width: "100%" }}
                />

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={this.toggleModal}
                >
                  <Text style={styles.closeButton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_SIZE.width * 0.9,
    maxHeight: SCREEN_SIZE.height * 0.6,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#dfdfdf",
  },
  closeButton: {
    color: "black",
    fontWeight: "600",
  },
});
