import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientManagementService } from '../services/client-management.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.css']
})
export class ManageClientComponent implements OnInit {

  private _lstClients: Array<Client>;
  public get lstClients(): Array<Client> {
    return this._lstClients;
  }
  public set lstClients(value: Array<Client>) {
    this._lstClients = value;
  }

  private _currentClient: Client;
  public get currentClient(): Client {
    return this._currentClient;
  }
  public set currentClient(value: Client) {
    this._currentClient = value;
  }

  private _addingClient: boolean;
  public get addingClient(): boolean {
    return this._addingClient;
  }
  public set addingClient(value: boolean) {
    this._addingClient = value;
  }

  private _showNotificationModal: boolean;
  public get showNotificationModal(): boolean {
    return this._showNotificationModal;
  }
  public set showNotificationModal(value: boolean) {
    this._showNotificationModal = value;
  }

  private _titleNotification: string;
  public get titleNotification(): string {
    return this._titleNotification;
  }
  public set titleNotification(value: string) {
    this._titleNotification = value;
  }

  private _descriptionNotification: Array<any>;
  public get descriptionNotification(): Array<any> {
    return this._descriptionNotification;
  }
  public set descriptionNotification(value: Array<any>) {
    this._descriptionNotification = value;
  }

  constructor(
    private clientManagementService: ClientManagementService
  ) {
    this.currentClient = new Client('', '', '', '', '');
    this.addingClient = false;
  }

  ngOnInit() {
    this.getAllClients();
  }

  actionAddingClient() {
    this.addingClient = true;
    this.cleanCurrentClient();
  }

  actionModifyingClient(sharedKey: string) {
    this.addingClient = false;

    let lstClientFound: Array<Client>;
    lstClientFound = this.lstClients.filter((element: Client) => {
      return element.sharedKey === sharedKey;
    });

    if (lstClientFound.length > 0) {
      this.currentClient = lstClientFound[0];
    }
  }

  getAllClients() {
    this.clientManagementService.getAllClients().subscribe((result: any) => {
      if (result.status === 0) {
        this.lstClients = result.information;
      } else {
        this.funcShowNotificationModal('Error while getting all clients', [result.description]);
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  cleanCurrentClient() {
    this.currentClient = new Client('', '', '', '', '');
  }

  onSubmitFormClient() {
    if (this.addingClient) {
      this.clientManagementService.addClient(this.currentClient).subscribe((result: any) => {
        if (result.status === 0) {
          document.getElementById('btnCloseClientModal').click();
          this.funcShowNotificationModal('Add client status', [result.description]);
          this.getAllClients();
        } else {
          this.funcShowNotificationModal('Error while adding client', [result.description]);
        }
      }, (error: any) => {
        console.log(error);
        if (error.error.status === 1) {
          this.funcShowNotificationModal('Error while adding client', [error.error.description]);
        } else {
          this.funcShowNotificationModal('Error while adding client', this.getFormErrors(error.error));
        }
      });
    } else {
      this.clientManagementService.modifyClient(this.currentClient).subscribe((result: any) => {
        if (result.status === 0) {
          document.getElementById('btnCloseClientModal').click();
          this.funcShowNotificationModal('Update client status', [result.description]);
          this.getAllClients();
        } else {
          this.funcShowNotificationModal('Error while updating client', [result.description]);
        }
      }, (error: any) => {
        console.log(error);
        if (error.error.status === 1) {
          this.funcShowNotificationModal('Error while updating client', [error.error.description]);
        } else {
          this.funcShowNotificationModal('Error while updating client', this.getFormErrors(error.error));
        }
      });
    }
  }

  getFormErrors(error: any): Array<any> {
    let strError: Array<any>;
    strError = new Array<any>();
    error.errors.forEach((element: any) => {
      strError.push(' - ' + element.defaultMessage);
    });
    return strError;
  }

  funcShowNotificationModal(title: string, description: Array<any>) {
    this.showNotificationModal = true;
    this.titleNotification = title;
    this.descriptionNotification = description;
    document.getElementById('btnOpenNotModal').click();
  }

  funcHideNotificationModal() {
    this.showNotificationModal = false;
  }

}
