import { getConnection } from "../../db/connection";
import { getVacationsForChartQuery } from "../../queries/getVacationsForChartQuery";



export async function getVacationsForChart() {
    const connection = await getConnection();
    if(!connection) return new Error("DB connection failed");

    const query = getVacationsForChartQuery();   

    try {
        const [result] = await connection.execute(query);
        return result;
    } catch (error) {
        console.error("Error executing query:", error);
        throw new Error("Query execution failed");
    }
}
