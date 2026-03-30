import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);    // Сравнение для фильтрации, используем правила по умолчанию, но можно и свои

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((name) => {                        // Перебираем по именам
        elements[name].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[name])        // формируем массив имён, значений опций
                      .map((value) => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option'); // @todo: создать и вернуть тег опции
                        option.value = value;
                        option.textContent = value;
                        return option;
                        })
        )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field; // Узнаем, для какого поля очистка

            const input = action.parentElement.querySelector('input')    // Найдём рядом стоящее поле ввода
            if (input) input.value = ''; // Если нашли, очистим его
            
            state[field] = ''; // И очистим в состоянии, чтобы фильтрация отработала
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));    // Фильтруем данные, сравнивая каждую строку с состоянием    
    }
}