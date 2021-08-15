import { document } from "../utils/dynamodbClients";

export const handle = async (event) => {
    const { user_id } = event.pathParameters;

    const response = await document.query({
        TableName: 'todos',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": user_id
        }
    }).promise();

    const todo = response.Items[0];

    if (todo) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                todo
            })
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "todo not found!"
        })
    }
}
