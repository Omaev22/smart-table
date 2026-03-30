import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option'); // @todo: создать и вернуть тег опции
                        option.value = name;
                        option.textContent = name;
                        return option;
                        })
        )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input')    // Найдём рядом стоящее поле ввода
            input.value = ''; // Очищаем значение поля ввода
            state[action.dataset.field] = ''; // И в состоянии тоже очищаем
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const compare = createComparison(defaultRules);    // Сравнение для фильтрации, используем правила по умолчанию, но можно и свои
        return data.filter(row => compare(row, state));    // Фильтруем данные, сравнивая каждую строку с состоянием    
    }
}