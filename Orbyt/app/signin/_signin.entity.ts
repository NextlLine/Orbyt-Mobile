import { makeAutoObservable } from "mobx";

export class SignInEntity {
    email = '';
    password = '';
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }
}
