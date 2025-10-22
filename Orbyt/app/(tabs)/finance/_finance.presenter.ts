import { FinanceWallet } from "@/model/models";
import { Alert } from "react-native";

export class FinancePresenter {

  deleteFinanceWalletAlert(wallet: FinanceWallet, onConfirmDeletion: () => Promise<void>) {
    Alert.alert(
      "Delete wallet",
      `Are you sure you want to delete "${wallet.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onConfirmDeletion(),
        },
      ]
    );
  }
}
