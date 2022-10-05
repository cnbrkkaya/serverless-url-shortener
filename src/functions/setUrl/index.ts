import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { v4 as uuidv4 } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.URL_TABLE_NAME;
    const baseUrl = process.env.BASE_URL;

    const body = JSON.parse(event.body);
    const originalUrl = body.url;

    const code = uuidv4().substring(0, 8);

    const shortUrl = `${baseUrl}/${code}`;

    const data = {
      id: code,
      originalUrl,
      shortUrl,
    };

    // await dynamo.write(data, tableName);

    return formatJSONResponse({
      statusCode: 200,
      data: { shortUrl, originalUrl },
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
