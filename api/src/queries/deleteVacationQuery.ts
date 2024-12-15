export function deleteVacationQuery() : string {
    const query = "DELETE FROM vacations WHERE id = ?"
    return query
}