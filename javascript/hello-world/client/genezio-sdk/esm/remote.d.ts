/**
* The class through which all request to the Genezio backend will be passed.
*/
export class Remote {
    constructor(url: any);
    url: any;
    agent: any;
    call(method: any, ...args: any[]): Promise<any>;
}
