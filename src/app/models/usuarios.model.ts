export class Usuario{
  constructor(
    public nombre:string ,
    public email:string,
    public password?:string,
    public google?:boolean,
    public img?:string,
    public id?:string,
    public role?:string,
  ){}
}