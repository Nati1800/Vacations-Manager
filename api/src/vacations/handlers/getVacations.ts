import { getConnection } from "../../db/connection";
import jwt from 'jsonwebtoken';
import { getVacationsQuery } from "../../queries/getVacationsQuery";


type VacationFilters = {
        followed?: boolean;
        new?: boolean;
        active?: boolean;
      };


export async function getVacations(filters: VacationFilters = {}, token:string) {
    const connection = await getConnection();
    if(!connection) return new Error("DB connection failed");

    let baseQuery = getVacationsQuery();
    
    const conditions: string[] = [];
    const params: any[] = [];

    let userId: number | undefined;
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY as string) as { id : number };
        userId = decoded.id;
        if(!userId) return new Error ("User id undefined")
        params.push(userId);
    } catch (error) {
        console.error("Invalid token or token expired:", error);
        return new Error("Invalid or expired token");
    }

    // handling the followed vacations filter
    if (filters.followed && userId) {
        baseQuery += " INNER JOIN likes l2 ON v.id = l2.vacation_id"; 
        conditions.push("l2.user_id = ?"); 
        params.push(userId);
    }

    // handling the new vacations filter
    if (filters.new) {
        conditions.push("v.start_date > NOW()");
    }

    // handling the active vacations filter
    if (filters.active) {
        conditions.push("v.start_date <= NOW() AND v.end_date >= NOW()");
    }

    // adding conditions to the query if they exist
    if (conditions.length > 0) {
        baseQuery += " WHERE " + conditions.join(" AND ");
    }

    // grouping by vacation ID and ordering the results
    baseQuery += " GROUP BY v.id ORDER BY v.start_date ASC"; 

    try {
        const [result] = await connection.execute(baseQuery, params);
        return result;
    } catch (error) {
        console.error("Error executing query:", error);
        throw new Error("Query execution failed");
    }
}

