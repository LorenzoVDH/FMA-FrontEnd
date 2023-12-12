import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) {}

  // openPopup(message: string, submessage?: string[]): Observable<any> {
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     width: '900px',
  //     data: { message: message, submessage: submessage }
  //   });

  //   return dialogRef.afterClosed();
  // }
  openPopup(message: string, submessage: string[] = [], isQuestion: boolean = false): Observable<boolean> {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      data: { message, submessage, isQuestion },
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
}