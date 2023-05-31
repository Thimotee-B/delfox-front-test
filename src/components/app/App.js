import React, { useReducer } from "react";
import List from "../list/List";
import "./App.css";

const initialLists = {
    1: [],
    2: [],
};

function reducer(lists, action) {
    switch (action.type) {
        case "addElement":
            return {
                ...lists,
                [action.listId]: [...lists[action.listId], action.element],
            };
        case "removeElement":
            return {
                ...lists,
                [action.listId]: lists[action.listId].filter(
                    (elem) => elem.id !== action.element.id
                ),
            };
        case "moveElement":
            return {
                ...lists,
                [action.fromListId]: lists[action.fromListId].filter(
                    (elem) => elem.id !== action.element.id
                ),
                [action.toListId]: [...lists[action.toListId], action.element],
            };
        case "changeColor":
            let updatedLists = { ...lists };
            for (const [, list] of Object.entries(updatedLists)) {
                for (var element of list) {
                    if (element.id === action.element.id) {
                        element.color = action.element.color;
                    }
                    if (element.referenceID) {
                        if (element.referenceID === action.element.id) {
                            element.color = action.element.color
                        }
                    }
                    if (action.element.referenceID) {
                        if (action.element.referenceID === element.id || action.element.referenceID === element.referenceID) {
                            element.color = action.element.color
                        }
                    }

                }
            }
            return updatedLists

        default:
            throw new Error();
    }
}

function App() {
    const [lists, dispatch] = useReducer(reducer, initialLists);
    return (
        <div className="listContainer">
            <List id={1} elements={lists[1]} dispatch={dispatch} />
            <List id={2} elements={lists[2]} dispatch={dispatch} />
        </div>
    );
}

export default App;
