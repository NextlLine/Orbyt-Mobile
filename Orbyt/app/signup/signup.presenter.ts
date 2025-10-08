import { Alert } from "react-native";

export class SignUpPresenter {
  error(msg: any) {
    Alert.alert('Erro', msg);
  }

  success() {
    Alert.alert('Sucesso', 'Conta criada com sucesso!');
  }
}
