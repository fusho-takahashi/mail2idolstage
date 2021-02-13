import { Component } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('ja');
  }

  readonly IDOL_STAGE_ADDRESS = 'idolstage.reservation@gmail.com';

  section: 1 | 2 | 3 | null = null;
  nickname = '';
  tel = '';
  mail = '';

  get minDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  }
}
