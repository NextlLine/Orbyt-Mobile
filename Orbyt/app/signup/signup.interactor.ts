import env from "@/config/env";
import { SignUpEntity } from "./signup.entity";
import { SignUpPresenter } from "./signup.presenter";

export class SignUpInteractor {
  entity = new SignUpEntity();
  presenter = new SignUpPresenter();

  async onSubmit(): Promise<boolean> {
    const err = this.validate();
    if (err) {
      this.presenter.error(err);
      return false;
    }

    this.entity.loading = true;
    try {
      const response = await fetch(`${env.BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.entity.name,
          email: this.entity.email,
          doc: this.entity.doc,
          hash: this.entity.password
        })
      });

      if (!response.ok) {
        const data = await response.json(); 
        throw new Error(data?.message || 'Erro ao criar conta.');
      }


      this.presenter.success();

      this.entity.name = '';
      this.entity.doc = '';
      this.entity.email = '';
      this.entity.password = '';
      this.entity.confirmPassword = '';

      return true; 
    } catch (e: unknown) {
      if (e instanceof Error) this.presenter.error(e.message);
      else this.presenter.error('Ocorreu um erro desconhecido.');
      return false; 
    } finally {
      this.entity.loading = false;
    }
  }

  validate() {
    if (!this.entity.name.trim()) return 'Informe seu nome.';
    if (!this.entity.doc.trim()) return 'Informe seu CPF.';
    if (!this.entity.email.trim()) return 'Preencha o e-mail.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(this.entity.email)) return 'E-mail inválido.';
    if (this.entity.password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (this.entity.password !== this.entity.confirmPassword) return 'As senhas não coincidem.';
    return null;
  }
}
