import { defaultProvider } from "@aws-sdk/credential-provider-node";
import {
  Client as OSearchClient,
  Connection,
} from "@opensearch-project/opensearch";
import aws4 from "aws4";

function getConnection({
  credentials,
  service,
  region,
}: {
  credentials: aws4.Credentials;
  service?: string;
  region: string;
}) {
  return class AmazonConnection extends Connection {
    buildRequestObject(params: any) {
      const request = super.buildRequestObject(params);
      //   @ts-ignore
      request.service = service || "es";
      //   @ts-ignore
      request.region = region;
      request.headers = request.headers || {};
      request.headers["host"] = request.hostname!;
      //   @ts-ignore
      return aws4.sign(request, credentials);
    }
  };
}

interface ClientConfig {
  host: string;
  service: string;
  region: string;
  credentials?: aws4.Credentials;
}

export async function getClient(config: ClientConfig) {
  if (!config.credentials) {
    config.credentials = await defaultProvider()();
  }

  return new OSearchClient({
    node: config.host,
    Connection: getConnection({
      credentials: config.credentials,
      service: config.service,
      region: config.region,
    }),
  });
}
