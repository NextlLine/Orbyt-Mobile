import { makeAutoObservable, runInAction } from "mobx";

export class SignUpEntity {
    name = '';
    doc = '';
    email = '';
    password = '';
    confirmPassword = '';
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setName(newVal: string) {
        newVal = runInAction(() => this.name = newVal);
    }

    setDoc(newVal: string) {
        newVal = runInAction(() => this.doc = newVal);
    }

    setEmail(newVal: string) {
        newVal = runInAction(() => this.email = newVal);
    }

    setPassword(newVal: string) {
        newVal = runInAction(() => this.password = newVal);
    }

    setConfirmPassword(newVal: string) {
        newVal = runInAction(() => this.confirmPassword = newVal);
    }

    setLoading(newVal: boolean) {
        newVal = runInAction(() => this.loading = newVal);
    }
}
