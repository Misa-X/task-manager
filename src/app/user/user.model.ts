
export class User {
    public username: string;
    public password: string;
    public email: string;
    public name: string;
    public phone: string;
    public dateOfBirth: string;
    public gender: string;

    constructor(username: string, password: string, email: string, name: string, phone: string, dateOdBirth: string, gender: string){
      this.username = username;
      this.password = password;
      this.email = email;
      this.name = name;
      this.phone = phone;
      this.dateOfBirth = dateOdBirth;
      this.gender = gender;
    }

}
