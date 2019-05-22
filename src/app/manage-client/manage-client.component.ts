import { Component, OnInit } from '@angular/core';
import { ClientManagementService } from '../services/client-management.service';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.css']
})
export class ManageClientComponent implements OnInit {

  private _lstClients: string;
  public get lstClients(): string {
    return this._lstClients;
  }
  public set lstClients(value: string) {
    this._lstClients = value;
  }

  constructor(
    private clientManagementService: ClientManagementService
  ) {
  }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientManagementService.getAllClients().subscribe((result: any) => {
      if (result.estado === 0) {
        this.lstClients = result.informacion;
        console.log(this.lstClients);
      } else {

      }
    }, (error: any) => {
      console.error(error);
    });
  }

}
