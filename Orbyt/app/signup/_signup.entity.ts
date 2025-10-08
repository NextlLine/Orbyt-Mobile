import { makeAutoObservable } from "mobx";

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
}
