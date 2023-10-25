export class HelloWorldService {
    static remote: Remote;
    static helloWorld(): Promise<any>;
    static hello(name: any, from: any): Promise<any>;
}
import { Remote } from "./remote.js";
