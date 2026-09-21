import { HttpClient } from "@angular/common/http";
import { AUTH_API_ENDPOINTS } from "../config/auth-api-endpoints";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRequest } from "./dto/register-request";

@Injectable({
  providedIn: 'root',
})
export class RegisterApi
{
    private httpClient:HttpClient=inject(HttpClient);
 

    register(registerDTO:RegisterRequest):Observable<void>
    {
        let registerObservable=this.httpClient.post<void>(AUTH_API_ENDPOINTS.registerUser,registerDTO)
        return registerObservable;
    }
}