export function checkIfUserExistQuery() : string {
    const query = "SELECT * FROM users WHERE email = ?"
    return query
}