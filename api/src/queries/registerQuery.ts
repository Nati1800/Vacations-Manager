export function registerQuery() : string {
    const query = "INSERT INTO users (`first_name`,`last_name`,`email`,`password`) VALUES (?, ?, ?, ?)"
    return query
}