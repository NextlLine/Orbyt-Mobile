import { FinanceWallet } from "@/model/models";
import { makeAutoObservable, runInAction } from "mobx";

export class FinanceEntity {
    index: number = 0
    financeWallets: FinanceWallet[] = []
    loading: boolean = true

    constructor() {
        makeAutoObservable(this);
    }

    setIndex(newVal: number) {
        newVal = runInAction(() => this.index = newVal);
    }

    setFinanceWallets(newVal: FinanceWallet[]) {
        newVal = runInAction(() => this.financeWallets = newVal);
    }

    setLoading(newVal: boolean) {
        newVal = runInAction(() => this.loading = newVal);
    }
}
