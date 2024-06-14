import { GenezioDeploy } from "@genezio/types";
import { createPerson, getAllPeople } from "./repository/personRepository";

@GenezioDeploy()
export class BackendService {
  constructor() {}

  async insertUser(first_name: string): Promise<string> {
    const person = await createPerson({first_name: first_name})
    return JSON.stringify(person);
  }

  async getAllUsers():Promise<string[]>{
    const people = await getAllPeople()
    const firstNames: string[] = people.map((person) => person.first_name);
   return firstNames;
  }
}
