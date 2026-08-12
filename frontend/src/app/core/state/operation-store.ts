import { computed, Injectable, signal } from '@angular/core';
import { OperationStatus } from '../enums/operation-status';

@Injectable({
  providedIn: 'root',
})
export class OperationStore {

  private readonly status=signal<OperationStatus>(OperationStatus.IN_PROGRESS);
  private readonly _message=signal<string>("Processing")
  
  message=this._message.asReadonly();
  operationStatus=this.status.asReadonly();

  updateStatus(newStatus:OperationStatus)
  {
    this.status.set(newStatus);
  }

  updateCurrentMessage(newMessage:string)
  {
    this._message.set(newMessage);
  }

  
  
}
