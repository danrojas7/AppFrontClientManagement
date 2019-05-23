import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {

  private _urlServicioClientManagement: string;
  public get urlServicioClientManagement(): string {
    return this._urlServicioClientManagement;
  }
  public set urlServicioClientManagement(value: string) {
    this._urlServicioClientManagement = value;
  }

  constructor(
    public _http: HttpClient
  ) {
    this.urlServicioClientManagement = 'http://localhost:8081/client';
  }

  addClient(client: Client): Observable<any> {
    return this._http.post(this.urlServicioClientManagement, client);
  }

  modifyClient(client: Client): Observable<any> {
    return this._http.post(this.urlServicioClientManagement + '/' + client.sharedKey, client);
  }

  getAllClients(): Observable<any> {
    return this._http.get(this.urlServicioClientManagement);
  }

  getClientBySharedKey(sharedKey: string): Observable<any> {
    return this._http.get(this.urlServicioClientManagement + '/getBySharedKey/' + sharedKey);
  }

}
