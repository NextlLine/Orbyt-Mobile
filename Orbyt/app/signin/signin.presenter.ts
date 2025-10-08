import { Alert } from "react-native";

export class SignInPresenter {
    
    error(err: string) {
        return Alert.alert('Erro', err);
    }

    navigateToTabs(navigate: () => void) {
        navigate();
    }

    navigateToSignUp(navigate: () => void) {
        navigate();
    }
}