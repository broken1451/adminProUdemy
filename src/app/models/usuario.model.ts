export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        // tslint:disable-next-line: variable-name
        public _id?: string
     ) {
    }
}



/*
export class Usuario {

    public nombre: string;
    public email: string;
    public password: string;
    public img?: string;
    public role?: string;
    public google?: boolean;
    // tslint:disable-next-line: variable-name
    public _id?: string;


    // tslint:disable-next-line: variable-name
    constructor(nombre: string, email: string, password: string, img: string, role: string, google: boolean, _id: string ) {
        this.nombre =  nombre;
        this.email = email;
        this.password =  password;
        this.img =  img;
        this.role = role;
        this.google = google;
        this._id = _id;
    }
}


*/
