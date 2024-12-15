export function editVacationQuery() : string {
    const query = "UPDATE vacations SET `destination`=?, `description`=?, `start_date`=?, `end_date`=?, `price`=?, `image`=? WHERE `id` = ?"
    return query
}