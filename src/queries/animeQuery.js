export const animeQuery = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (id: $id, search: $search, type: ANIME) {
                id
                format
                title {
                    native
                    romaji
                    english
                }
                isAdult
                description               
                status
                episodes
                genres
                season
                seasonYear
                siteUrl
                averageScore
                nextAiringEpisode {
                timeUntilAiring
                episode
                }
                coverImage{
                    medium
                    large
                    extraLarge
                    color
                }
            }
        }
    }
`
