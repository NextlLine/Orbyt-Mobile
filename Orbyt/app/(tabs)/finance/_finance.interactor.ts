import AsyncStorage from "@react-native-async-storage/async-storage";
import { FinanceEntity } from "./_finance.entity";
import { FinancePresenter } from "./_finance.presenter";
import env from "@/config/env";
import { FinanceWallet } from "@/model/models";

export class FinanceInteractor {
    presenter = new FinancePresenter();
    entity = new FinanceEntity();


    async fetchFinanceWallets() {
        try {
            this.entity.setLoading(true);

            const token = await AsyncStorage.getItem("acces_taken");
            if (!token) throw new Error("Usuário não logado");

            const response = await fetch(`${env.BASE_URL}/finance`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();
            if (!response.ok) throw new Error(json.message || "Erro ao buscar wallets");

            const formattedWallets: FinanceWallet[] = json.data.map((w: any) => ({
                id: w.id,
                name: w.name,
                balance: w.balance,
                currency: {
                    id: w.currency.id,
                    symbol: w.currency.symbol,
                    code: w.currency.code,
                },
                transactions: w.transactions ?? [],
                monthReport: w.monthReports ?? [],
            }));

            this.entity.setFinanceWallets(formattedWallets);
        } catch (err: unknown) {
            if (err instanceof Error) console.error("Erro ao carregar wallets:", err.message);
        } finally {
            this.entity.setLoading(false);
        }
    }

    async createWallet(name: string, balance: number) {
        try {
            this.entity.setLoading(true);

            const token = await AsyncStorage.getItem("acces_taken");
            if (!token) throw new Error("Usuário não logado");

            const response = await fetch(`${env.BASE_URL}/finance`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, balance, currencyId: "1" }),
            });

            const json = await response.json();
            if (!response.ok) throw new Error(json.message || "Erro ao criar wallet");

            await this.fetchFinanceWallets();
        } catch (err) {
            console.error("Erro ao criar wallet:", err);
        } finally {
            this.entity.setLoading(false);
            this.entity.setShowCreateWalletModal(false)
        }
    }

    deleteWallet(index: number) {
        const wallet = this.entity.financeWallets[index];
        if (!wallet) return;

        this.presenter.deleteFinanceWalletAlert(wallet, this.confirmDeletion(wallet.id));
    }

    confirmDeletion = (id: string) => async () => {
        try {
            this.entity.setLoading(true);

            const token = await AsyncStorage.getItem("acces_taken");
            if (!token) throw new Error("Usuário não logado");

            const response = await fetch(`${env.BASE_URL}/finance/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();
            if (!response.ok) throw new Error(json.message || "Erro ao deletar wallet");

            await this.fetchFinanceWallets();
            console.log("Wallet deletada com sucesso:", json.message || id);
        } catch (err: unknown) {
            if (err instanceof Error) console.error("Erro ao deletar wallet:", err.message);
        } finally {
            this.entity.setLoading(false);
        }
    };

    openCreateWalletModal() {
        this.entity.setShowWalletsModal(false);
        this.entity.setShowCreateWalletModal(true);
    }
}
