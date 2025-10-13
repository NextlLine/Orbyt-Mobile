import { makeAutoObservable, runInAction } from "mobx";

export class SignInEntity {
    email = '';
    password = '';
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setEmail(newVal:string) {
        newVal = runInAction(() => this.email = newVal);
    }

    setPassword(newVal:string) {
        newVal = runInAction(() => this.password = newVal);
    }

    setLoading(newVal: boolean) {
        newVal = runInAction(() => this.loading = newVal);
    }
}
