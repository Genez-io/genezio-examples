import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import fetch from "node-fetch";

type SuccessResponse = {
  status: "success";
  country: string;
  lat: number;
  lon: number;
  city: string;
};

type ErrorResponse = {
  status: "fail";
};

@GenezioDeploy()
export class BackendService {
  constructor() {}

  @GenezioMethod()
  async hello(name: string): Promise<string> {
    const ipLocation: SuccessResponse | ErrorResponse = await fetch(
      "http://ip-api.com/json/"
    )
      .then((res) => res.json() as Promise<SuccessResponse>)
      .catch(() => ({ status: "fail" }));

    if (ipLocation.status === "fail") {
      return `Hello ${name}! Failed to get the server location :(`;
    }

    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `Hello ${name}! This response was served from ${ipLocation.city}, ${ipLocation.country} (${ipLocation.lat}, ${ipLocation.lon}) at ${formattedTime}`;
  }
}
