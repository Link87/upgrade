export class User {

  public constructor(
    public readonly userId: string,
    public readonly token: string) {}

}

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
