import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { Address, Account } from "@multiversx/sdk-core";

export type Response = {
  nonce: number;
  balance: number;
}

export class MultiversXService {
  networkProvider = new ApiNetworkProvider("https://devnet-api.multiversx.com");

  async queryAddress(address: string): Promise<Response> {
    console.log("Query info about address", address);

    let addressOfUser = new Address(address);
    let user = new Account(addressOfUser);
    let userOnNetwork = await this.networkProvider.getAccount(addressOfUser);
    user.update(userOnNetwork);

    return {
      nonce: user.nonce.valueOf(),
      balance: parseFloat(user.balance.toString()) / Math.pow(10, 18),
    };
  }
}
