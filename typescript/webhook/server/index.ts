import multipart from "parse-multipart-data";
import { GenezioRequest, GenezioResponse } from "./models/typeWebhook";

export class HelloWorldHttpExample {
  /**
   * Method that handles a simple HTTP request which receives a payload in the body and returns the same payload as plain text.
   *
   * @param {*} request
   * @returns
   */
  handleSimpleTextRequest(request: GenezioRequest) {
    console.log(
      `Request received with simple text ${JSON.stringify(request.body)}!`,
    );

    const uint8: Uint8Array = new Uint8Array(2);

    return {
      body: request.body,
      headers: { "content-type": "text/html" },
    };
  }

  /**
   * Method that handles a simple HTTP request which receives a JSON payload in the body and returns the same payload as JSON.
   */
  handleJsonBody(request: GenezioRequest) {
    console.log(`Request received with body ${request.body}!`);
    if (!request.body.name) {
      throw Error("Missing parameter name");
    }

    const name = request.body.name;

    const response: GenezioResponse = {
      body: {
        name,
      },
      headers: {
        testHeader: "testHeaderValue",
        statusDescription: "Ok",
      },
      statusCode: "201",
    };

    return response;
  }

  /**
   * Method that handles a simple HTTP request with query parameters and returns "Ok".
   */
  handleQueryParams(request: GenezioRequest) {
    console.log(
      `Request received with query params ${request.queryStringParameters}!`,
    );
    if (!request.queryStringParameters!.name) {
      throw Error("Missing parameter name");
    }

    const response: GenezioResponse = {
      body: "Ok",
      headers: { "content-type": "text/html" },
      statusCode: "200",
    };

    return response;
  }

  /**
   * Method that receives a file using multipart and returns the file as binary.
   */
  handleMultipartData(request: GenezioRequest) {
    console.log("Request receive with multipart data", request);

    const entries = multipart.parse(
      request.body,
      multipart.getBoundary(request.headers["content-type"]),
    );

    const file = entries.find((entry): boolean => entry.name === "myFile");

    if (!file) {
      throw new Error("File not found!");
    }

    const response: GenezioResponse = {
      body: file.data,
      isBase64Encoded: true,
      headers: { "content-type": "application/octet-stream" },
      statusCode: "200",
    };

    return response;
  }
}
