export const characterQuery = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        characters (id: $id, search: $search) {
            id
            name{
                full
            }
            description
            image{
                medium
                large
            }
        }
    }
}
`