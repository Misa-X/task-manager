
export class User {



    constructor(
      public username: string,
      public _id: string,
      private _token: string


      ){}

      get token() {
        return this._token;
      }

}
