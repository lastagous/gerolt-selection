import { Component } from '@angular/core';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-manderville',
  templateUrl: './manderville.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class MandervilleComponent extends AppendBaseComponent {
  public log(e: any) {
    console.log(e);
  }
}