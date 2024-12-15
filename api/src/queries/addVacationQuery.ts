export function addVacationQuery() : string {
    const query = "INSERT INTO vacations (destination, description, start_date, end_date, price, image) VALUES (?,?,?,?,?,?)"
    return query
}