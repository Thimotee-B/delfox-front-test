import React, { useEffect, useState } from 'react';
import "./Element.css";

function Element({ color, referenceID, onSelect, onDelete, isSelected, onChangeColor }) {
    const [inputColor, setInputColor] = useState(color);

    const handleInputChange = (e) => {
        setInputColor(e.target.value);
    };

    const handleBlur = (e) => {
        onChangeColor(e.target.value)
    };

    const setColor = () => {
        color = inputColor;
    }

    useEffect(() => { setColor() })


    return (
        <div className='elementContainer'>
            <button onClick={onDelete}>X</button>
            <div className={isSelected ? "box selected" : "box"} style={{ backgroundColor: color }} onClick={onSelect}>
            </div>
            <input type="text" value={inputColor} onChange={handleInputChange} onBlur={handleBlur} />
        </div>

    );
}
Element.defaultProps = {
    isSelected: false, // Valeur par défaut pour isSelected
    referenceID: null // Valeur par défaut pour referenceID
};
export default Element;