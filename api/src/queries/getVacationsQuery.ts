export function getVacationsQuery() : string {
    const query = `SELECT
      v.*,
    COUNT(l.user_id) AS followers,
    EXISTS ( 
                SELECT 1 
                FROM likes l2 
                WHERE l2.vacation_id = v.id AND l2.user_id = ? 
            ) AS isLiked 
    FROM vacations v
    LEFT JOIN likes l ON v.id = l.vacation_id`
    return query
}
