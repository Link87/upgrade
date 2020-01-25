export class Profile {

    public static default() {
        return new Profile('', '', '', '', '');
    }

    constructor(public name: string,
                public street: string,
                public housenumber: string,
                public zipCode: string,
                public city: string,
                public description = '') {}

}
