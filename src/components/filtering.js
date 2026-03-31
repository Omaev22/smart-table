import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);    // Сравнение для фильтрации, используем правила по умолчанию, но можно и свои

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map((name) => {                        // используйте name как значение и текстовое содержимое
                        const option = elements[elementName].firstElementChild.cloneNode(); // @todo: создать и вернуть тег опции
                        option.removeAttribute('selected'); // Удалим атрибут selected, если он есть в шаблоне
                        option.value = name;
                        option.textContent = name;
                        return option;
                        })
        )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.parentElement.querySelector('input');  // Найдём поле, связанное с кнопкой очистки (предполагаем, что оно внутри того же родителя)
            field.value = '';    // Очистим его
            state[action.dataset.field] = ''; // И в состоянии тоже очистим, чтобы фильтрация отработала правильно
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const filterState = {
            date: state.date,
            customer: state.customer,
            seller: state.seller,
            total: [state.totalFrom, state.totalTo]
        }
        return data.filter(element => compare(element, filterState));    // Фильтруем данные, сравнивая каждую строку с состоянием    
    }
}