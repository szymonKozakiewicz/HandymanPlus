import { UserTypes } from "../../../../core/enums/user-type"  
export interface RegisterFormData {
     login:string,
      password:string,
      repeatPassword:string,
      userType:UserTypes,
      handymanType: string
}