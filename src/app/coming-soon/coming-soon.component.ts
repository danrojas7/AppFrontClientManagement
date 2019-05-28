import { Component, OnInit } from '@angular/core';
import { TitleChangeService } from '../services/title-change.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

  constructor(
    private titleChangeService: TitleChangeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.changeTitle();
    console.log(this.router.url);
  }

  changeTitle() {
    switch (this.router.url) {
      case '/client-look-history':
        this.titleChangeService.changeTitle('Client look history');
        break;
      case '/emergency-pin-config':
        this.titleChangeService.changeTitle('Emergency PIN configuration');
        break;
      case '/emergency-pin-history':
        this.titleChangeService.changeTitle('Emergency PIN history');
        break;
      default:
        this.titleChangeService.changeTitle('Clients');
        break;
    }
  }

}
