import env from "@/config/env";
import { SignInPresenter } from "./_signin.presenter";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignInEntity } from "./_signin.entity";

export class SignInInteractor {
  presenter = new SignInPresenter();
  entity = new SignInEntity();

  async onSubmit() {
    const err = this.validate(this.entity.email, this.entity.password);
    if (err) return this.presenter.error(err);

    this.entity.loading = true;
    try {
      const response = await fetch(`${env.BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.entity.email, hash: this.entity.password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || 'Error trying to signin.');
      if (!data.acces_taken) throw new Error('Token was not delivered by API.');

      await AsyncStorage.setItem('acces_taken', data.acces_taken);
      return data.acces_taken;
    } catch (e: unknown) {
      if (e instanceof Error) this.presenter.error(e.message);
      else this.presenter.error('Unknown Error.');
    } finally {
      this.entity.loading = false;
    }
  }

  async loginWithStored(email: string) {
    const password = await AsyncStorage.getItem(`pw_${email}`);
    if (!password) return null;

    this.entity.email = email;
    this.entity.password = password;
    return await this.onSubmit();
  }

  validate(email: string, password: string) {
    if (!email.trim()) return 'Missing e-mail.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'E-mail not valid.';
    if (password.length < 6) return 'Password must have at least 6 characters.';
    return null;
  }
}
