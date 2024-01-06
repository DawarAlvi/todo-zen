import React from 'react'

const Item = (props) => {
    const itemData = props.itemData

    return (
    <div className="item">
        <input type="checkbox" checked={itemData.isDone} onChange={()=>props.HandleIsDoneChanged(!itemData.isDone)}/>
        <span className={(itemData.isDone ? "done":"")}>{itemData.content}</span>
        <button className="item--delete" onClick={props.HandleDeletePressed}>🗑</button>
    </div>
  )
}

export default Item