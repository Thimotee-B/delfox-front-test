import React, { useState } from "react";
import Element from "../element/Element";
import { v4 as uuidv4 } from 'uuid'

function List({ id, elements, dispatch }) {
    const [selectedElement, setSelectedElement] = useState(null);

    const handleAddElement = () => {
        if (elements.length < 6) {
            const uuid = uuidv4()
            dispatch({
                type: "addElement",
                listId: id,
                element: { color: "#000000", id: uuid, isSelected: false },
            });
        }
    };

    const handleRefElement = () => {
        const otherListId = id === 1 ? 2 : 1;
        const idToRef = selectedElement.referenceID ? selectedElement.referenceID : selectedElement.id;

        dispatch({
            type: "addElement",
            listId: otherListId,
            element: { color: selectedElement.color, id: uuidv4(), referenceID: idToRef, isSelected: false },
        });

    };

    const handleCopyElement = () => {
        const otherListId = id === 1 ? 2 : 1;

        dispatch({
            type: "addElement",
            listId: otherListId,
            element: { color: selectedElement.color, id: uuidv4(), isSelected: false },
        });

    };

    const handleRemoveElement = (element) => {
        dispatch({
            type: "removeElement",
            listId: id,
            element: element,
        });
        setSelectedElement(null);
    };

    const handleMoveElement = () => {
        const otherListId = id === 1 ? 2 : 1;
        dispatch({
            type: "moveElement",
            fromListId: id,
            toListId: otherListId,
            element: selectedElement,
        });
        setSelectedElement(null);
    };

    const handleChangeColor = (element, color) => {
        element.color = color
        dispatch({
            type: "changeColor",
            element: element,
        })
    }

    const handleSelectElement = (element) => {
        if (selectedElement)
            selectedElement.isSelected = false
        setSelectedElement(element);
        element.isSelected = true
    };

    const handleEditElement = () => {

    }

    return (
        <div>
            <button onClick={handleAddElement}>+</button>
            <button onClick={handleMoveElement} disabled={!selectedElement}>
                Move
            </button>
            <button onClick={handleEditElement} disabled={!selectedElement}>
                Edit
            </button>
            <button onClick={handleRefElement} disabled={!selectedElement}>
                Reference
            </button>
            <button onClick={handleCopyElement} disabled={!selectedElement}>
                Copy
            </button>
            {elements.map((element) => (
                <Element
                    key={element.id}
                    id={element.id}
                    referenceID={element.referenceID ? element.referenceID : null}
                    color={element.color}
                    onSelect={() => handleSelectElement(element)}
                    onDelete={() => handleRemoveElement(element)}
                    onChangeColor={(color) => handleChangeColor(element, color)}
                    isSelected={selectedElement?.id === element.id}
                    dispatch={dispatch}
                />
            ))}

        </div>
    );
}

export default List;
