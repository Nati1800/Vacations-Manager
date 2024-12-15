    export function getVacationsForChartQuery() : string {
        const query = `SELECT 
    vacations.destination,
    COUNT(likes.user_id) AS followers_count
FROM
    vacationsDB.vacations AS vacations
    LEFT JOIN vacationsDB.likes AS likes ON vacations.id = likes.vacation_id
GROUP BY
    vacations.destination`
        return query
    }

