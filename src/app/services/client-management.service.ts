import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/Client';
import { Observable } from 'rxjs';
import { GLOBAL } from '../config/Global';

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
    this.urlServicioClientManagement = GLOBAL.urlServiceClientMan;
  }

  addClient(client: Client): Observable<any> {
    return this._http.post(this.urlServicioClientManagement, client);
  }

  modifyClient(sharedKey: string, client: Client): Observable<any> {
    return this._http.post(this.urlServicioClientManagement + '/' + sharedKey, client);
  }

  updateClient(addingClient: boolean, sharedKey: string, client: Client): Observable<any> {
    if (addingClient) {
      return this.addClient(client);
    } else {
      return this.modifyClient(sharedKey, client);
    }
  }

  getAllClients(): Observable<any> {
    return this._http.get(this.urlServicioClientManagement);
  }

  getClientBySharedKey(sharedKey: string): Observable<any> {
    return this._http.get(this.urlServicioClientManagement + '/getBySharedKey/' + sharedKey);
  }

  getExportFileClients(fileType: string) {
    window.open(this.urlServicioClientManagement + '/getFile/' + fileType, '_blank');
  }

  searchClientsByCriteria(client: Client): Observable<any> {
    return this._http.post(this.urlServicioClientManagement + '/searchClientsByCriteria', client);
  }

}
