import { UserTypes } from "../../../../core/enums/user-type";
import { RegisterFormData } from "../../models/form-interfaces/register";


export class RegisterRequest
{
    login:string;
    password:string;
    isHandyman:boolean;
    handymanType:string;
    constructor(registerForm:RegisterFormData)
    {
        this.login=registerForm.login;
        this.password=registerForm.password;
        if(registerForm.userType==UserTypes.handyman)
            this.isHandyman=true
        else
            this.isHandyman=false;
        this.handymanType=registerForm.handymanType;

    }
}