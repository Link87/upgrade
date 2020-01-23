export class Offer {
    constructor(public readonly name: string,
                public readonly subject: string,
                public readonly loan: number,
                public readonly type: string,
                public readonly description: string,
                public owner: string,
                public id: string,
                public isRequest: boolean) {
    }
}
