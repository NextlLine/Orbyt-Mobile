import { Alert } from "react-native";

export class SignUpPresenter {
  error(msg: any) {
    Alert.alert('Erro', msg);
  }

  success() {
    Alert.alert('Success', 'Your account was created!');
  }
}
