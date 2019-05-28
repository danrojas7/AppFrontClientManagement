import { Component, OnInit } from '@angular/core';
import { ClientManagementService } from '../services/client-management.service';
import { Client } from '../model/Client';
import { TitleChangeService } from '../services/title-change.service';

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

  private _fileType: string;
  public get fileType(): string {
    return this._fileType;
  }
  public set fileType(value: string) {
    this._fileType = value;
  }

  constructor(
    private clientManagementService: ClientManagementService,
    private titleChangeService: TitleChangeService
  ) {
    this.cleanCurrentClient();
    this.addingClient = false;
  }

  ngOnInit() {
    this.changeTitle();
    this.getAllClients();
  }

  actionAddingClient() {
    this.addingClient = true;
    this.cleanCurrentClient();
    document.getElementById('btnOpenClientModal').click();
  }

  actionModifyingClient(sharedKey: string) {
    this.addingClient = false;

    let lstClientFound: Array<Client>;
    lstClientFound = this.lstClients.filter((element: Client) => {
      return element.sharedKey === sharedKey;
    });

    if (lstClientFound.length > 0) {
      this.currentClient = JSON.parse(JSON.stringify(lstClientFound[0]));
      document.getElementById('btnOpenClientModal').click();
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
    this.currentClient = new Client(null, null, null, null, null);
  }

  onSubmitFormClient() {
    let hdrUpdatingClient: string = 'Update client status';
    let hdrErrorAddingClient: string = 'Error while updating client';

    if (this.addingClient) {
      hdrUpdatingClient = 'Add client status';
      hdrErrorAddingClient = 'Error while adding client';
    } else {
      hdrUpdatingClient = 'Update client status';
      hdrErrorAddingClient = 'Error while updating client';
    }

    this.clientManagementService.updateClient(this.addingClient, this.currentClient).subscribe((result: any) => {
      if (result.status === 0) {
        document.getElementById('btnCloseClientModal').click();
        this.funcShowNotificationModal(hdrUpdatingClient, [result.description]);
        this.getAllClients();
      } else {
        this.funcShowNotificationModal(hdrErrorAddingClient, [result.description]);
      }
    }, (error: any) => {
      console.log(error);
      if (error.error.status === 1) {
        this.funcShowNotificationModal(hdrErrorAddingClient, [error.error.description]);
      } else {
        this.funcShowNotificationModal(hdrErrorAddingClient, this.getFormErrors(error.error));
      }
    });
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
    this.titleNotification = title;
    this.descriptionNotification = description;
    document.getElementById('btnOpenNotModal').click();
  }

  funcShowExportModal() {
    document.getElementById('btnOpenExportModal').click();
  }

  onSubmitFormExport() {
    this.clientManagementService.getExportFileClients(this.fileType);
    document.getElementById('btnCloseExportModal').click();
    this.fileType = '';
  }

  changeTitle() {
    this.titleChangeService.changeTitle('Clients');
  }

  onSubmitFormFilterClients() {

  }

}
