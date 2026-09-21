import { Component, inject } from '@angular/core';
import { Logo } from "../../components/logo/logo";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OperationStore } from '../../../core/state/operation-store';
import { OperationStatus } from '../../../core/enums/operation-status';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-operation-status-page',
  imports: [Logo,MatProgressSpinnerModule, MatButton, MatIcon],
  templateUrl: './operation-status-page.html',
  styleUrl: './operation-status-page.css',
})
export class OperationStatusPage {
[x: string]: any;

  operationStore:OperationStore=inject(OperationStore);
  message=this.operationStore.message;
  operationStatus=this.operationStore.operationStatus;
  OperationStatus=OperationStatus;

}
