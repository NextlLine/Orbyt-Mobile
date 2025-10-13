import env from "@/config/env";
import { SignInEntity } from "./_signin.entity";
import { SignInPresenter } from "./_signin.presenter";

export class SignInInteractor {
  presenter = new SignInPresenter();
  entity = new SignInEntity();

  async signin() {
    const err = this.validate(this.entity.email, this.entity.password);
    if (err) return this.presenter.error(err);

    this.entity.setLoading(true);
    try {
      const response = await fetch(`${env.BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.entity.email, hash: this.entity.password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || 'Error trying to signin.');
      if (!data.acces_taken) throw new Error('Token was not delivered by API.');

      return data.acces_taken;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message)
        this.presenter.error(e.message)
      }
      else this.presenter.error('Unknown Error.');
    } finally {
      this.entity.setLoading(false);
    }
  }

  async validateToken(token: string, email: string): Promise<boolean> {
    if (!token || !email) return false;

    try {
      const response = await fetch(`${env.BASE_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      console.log('validate response:', response.status);
      return response.ok;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }


  validate(email: string, password: string) {
    if (!email.trim()) return 'Missing e-mail.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'E-mail not valid.';
    if (password.length < 6) return 'Password must have at least 6 characters.';
    return null;
  }
}
