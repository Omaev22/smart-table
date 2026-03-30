import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(['skipEmptyTargetValues'], [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]);    // Сравнение для поиска, используем правило для поиска по нескольким полям, указывая элемент поиска и поля, в которых искать
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(row => compare(row, state));    // Фильтруем данные, сравнивая каждую строку с состоянием
    }
}