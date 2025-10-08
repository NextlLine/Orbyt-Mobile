import { FinanceWallet } from "@/model/models";
import { makeAutoObservable } from "mobx";

export class FinanceEntity {
    index: number = 0
    financeWallets: FinanceWallet[] = []
    loading: boolean = true

    constructor() {
        makeAutoObservable(this);
    }
}
