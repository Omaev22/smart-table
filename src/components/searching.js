


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    
    
    return (query, state, action) => {
        // @todo: #5.2 — применить компаратор
        return state[searchField] ? Object.assign({}, query, {
            search: state[searchField]
        }) : query;    // Если в поле поиска есть значение, то добавляем его в запрос, иначе возвращаем запрос без изменений
        }
    }


