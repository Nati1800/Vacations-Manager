export function unFollowVacationQuery() : string {
    const query = "DELETE FROM likes WHERE user_id = ? AND vacation_id = ?"
    return query
}