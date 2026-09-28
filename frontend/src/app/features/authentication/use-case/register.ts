import { HttpClient } from "@angular/common/http";
import { AUTH_API_ENDPOINTS } from "../config/auth-api-endpoints";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRequest } from "../api/dto/register-request";
import { RegisterApi } from "../api/register-api";
import { OperationStore } from "../../../core/state/operation-store";
import { OPERATION_MESSAGES } from "../../../core/constants/operation-messages";
import { OperationStatusPage } from "../../../shared/pages/operation-status-page/operation-status-page";
import { OperationStatus } from "../../../core/enums/operation-status";


@Injectable({
  providedIn: 'root',
})
export class RegisterUseCase
{
    private readonly registerApi=inject(RegisterApi);
    private readonly operationStore=inject(OperationStore);


    execute(registerDTO:RegisterRequest)
    {
        this.updateOperationStatusStore();

        let observableRegister=this.sendRequest(registerDTO);

        this.handleResponse(observableRegister);
    }



    private handleResponse(observableRegister: Observable<void>) {
        observableRegister.subscribe({
            next: () => {
                this.operationStore.updateCurrentMessage(OPERATION_MESSAGES.SUCCESS);
                this.operationStore.updateStatus(OperationStatus.SUCCESS);
            },
            error:()=>{
                    this.operationStore.updateCurrentMessage(OPERATION_MESSAGES.FAIL);
                    this.operationStore.updateStatus(OperationStatus.FAIL);
            }
        });
    }



    private updateOperationStatusStore() {
        this.operationStore.updateStatus(OperationStatus.IN_PROGRESS);
        this.operationStore.updateCurrentMessage(OPERATION_MESSAGES.PROCESSING);
        this.operationStore.updateDestinationOfBtnBack("login");
    }

    private sendRequest(registerDTO: RegisterRequest) {
        let observableRegister = this.registerApi.register(registerDTO);
        return observableRegister;
    }
}