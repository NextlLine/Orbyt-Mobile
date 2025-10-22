import { FinanceWallet } from "@/model/models";
import { makeAutoObservable, runInAction } from "mobx";

export class FinanceEntity {
    index: number = 0
    financeWallets: FinanceWallet[] = []
    loading: boolean = true
    showWalletsModal: boolean = false
    showCreateWalletModal: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    setShowWalletsModal(newVal: boolean) {
        this.showWalletsModal = newVal;
    }

    setShowCreateWalletModal(newVal: boolean) {
        this.showCreateWalletModal = newVal;
    }

    setIndex(newVal: number) {
        this.index = newVal;
    }

    setFinanceWallets(newVal: FinanceWallet[]) {
        this.financeWallets = newVal;
    }

    setLoading(newVal: boolean) {
        this.loading = newVal;
    }
}
