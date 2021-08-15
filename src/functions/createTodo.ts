import {v4 as uuidV4} from "uuid";
import { document } from "../utils/dynamodbClients";

interface ICreateTODO {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline: Date;
}
export const handle = async (event) => {
    const { user_id } = event.pathParameters;

    const { title, deadline } = JSON.parse(event.body) as ICreateTODO;

    await document.put({
        TableName: "todos",
        Item: {
            id: uuidV4(),
            user_id,
            title,
            done: false,
            deadline: new Date(deadline)
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo created!"
        }),
        headers: {
            "Content-type": "application/json"
        },
    }
}
