import React from 'react'

const Item = (props) => {
    const {idx, content, isDone,} = props.itemData
console.log(idx);
    return (
    <div className="item">
        <input
        type="checkbox"
        checked={isDone}
        id={idx}
        onChange={ () => props.HandleIsDoneChanged(!isDone) }
        />
        
        <label
        className={(isDone ? "done":"")}
        htmlFor={idx}>
          {content}
        </label>
        
        <button
        className="item--delete" 
        onClick={props.HandleDeletePressed}>
          🗑
        </button>
    </div>
  )
}

export default Item
