export function followVacationQuery() : string {
    const query = "INSERT INTO likes (user_id, vacation_id) VALUES (?, ?)"
    return query
}