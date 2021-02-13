import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

interface FormItems {
  date: Date;
  section: number;
  nickname: string;
  tel: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private fb: FormBuilder,
  ) {
    dateAdapter.setLocale('ja');
  }

  readonly IDOL_STAGE_ADDRESS = 'idolstage.reservation@gmail.com';
  readonly minDate = new Date();

  form: FormGroup = this.fb.group({
    date: [null, [Validators.required]],
    section: [null, [Validators.required]],
    nickname: [null, [Validators.required]],
    tel: [null, [Validators.required]],
    email: [null, [Validators.required]],
  });

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const formValue: FormItems = this.form.getRawValue();

    const subject = this.createSubject(formValue.date, formValue.section);
    const body = this.createBody(
      formValue.nickname,
      formValue.tel,
      formValue.email,
    );

    window.location.href = `mailto:${this.IDOL_STAGE_ADDRESS}?subject=${subject}&body=${body}`;
  }

  createSubject(inputDate: Date, section: number): string {
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    const day = inputDate.getDay();

    return `【${month}/${date}(${this.convertDayToJp(
      day,
    )}) ${section}部 観覧希望】`;
  }

  convertDayToJp(day: number): string {
    const dayOfWeekJp = ['日', '月', '火', '水', '木', '金', '土'];
    return dayOfWeekJp[day];
  }

  createBody(nickname: string, tel: string, email: string): string {
    return `・名前: ${nickname}%0D%0A・電話番号: ${tel}%0D%0A・メールアドレス: ${email}%0D%0A %0D%0Aよろしくお願いします。`;
  }
}
