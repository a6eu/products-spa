export const setSearch = (searchTerm: string) => ({
    type: 'SET_SEARCH' as const,
    payload: searchTerm,
});

export type AppAction = ReturnType<typeof setSearch>;
