

// @todo: #4.3 — настроить компаратор
//const compare = createComparison(defaultRules);    // Сравнение для фильтрации, используем правила по умолчанию, но можно и свои

export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(...Object.values(indexes[elementName]).map((name) => {                        
            const el = document.createElement('option');   
            el.textContent = name;     
            el.value = name;
            return el;                                       
        }))
    })
    }



    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.parentElement.querySelector('input');  // Найдём поле, связанное с кнопкой очистки (предполагаем, что оно внутри того же родителя)
            field.value = '';    // Очистим его
            state[action.dataset.field] = ''; // И в состоянии тоже очистим, чтобы фильтрация отработала правильно
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // Добавляем в фильтр только те поля, которые имеют значение (не пустые)
                }
            }   
    })

    return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
}

return {
    updateIndexes,
    applyFiltering
}
}