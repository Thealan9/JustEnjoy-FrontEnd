import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private API = environment.apiUrl;
  private TOKEN_KEY = 'token';

  private _ready = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    this._ready.next(true);
  }

  private storageReady$(): Observable<boolean> {
    return this._ready.asObservable().pipe(
      filter(ready => ready === true)
    );
  }

  getToken$(): Observable<string | null> {
    return this.storageReady$().pipe(
      switchMap(() => from(this.storage.get(this.TOKEN_KEY)))
    );
  }

  async getToken(): Promise<string | null> {
    await this.storageReady$().toPromise();
    return this.storage.get(this.TOKEN_KEY);
  }

  async saveToken(token: string) {
    await this.storage.set(this.TOKEN_KEY, token);
  }

  async logout() {
    await this.storage.remove(this.TOKEN_KEY);
  }


  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.API}/login`, data);
  }

  logoutApi() {
    return this.http.post(`${this.API}/logout`, {});
  }

  yo() {
    return this.http.get(`${this.API}/yo`);
  }
}
