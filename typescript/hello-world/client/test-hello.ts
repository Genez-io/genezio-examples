import { HelloWorld, Season } from "@genezio-sdk/hello-world-ts";

/**
 * Client that makes requests to the HelloWorldService deployed on genezio.
 *
 * Before running this script, run either "genezio deploy" or "genezio local".
 */

(async () => {
  // Use the SDK to make requests to the Hello World Service.
  console.log(await HelloWorld.hello("George", "Tenerife", Season.Winter));
})();
