import {useState} from 'react'
import Item from './components/Item';
import logo from './logo.svg';

function App() {
  let [form, setForm] = useState({
    item:""
  })
  let [items, setItems] = useState([])

function onFormChange(e) {
  let {name, value} = e.target
  setForm((currForm) => {return {...currForm,[name]: value}})
  
}

function onSubmit(e) {
  e.preventDefault()
  if (form.item === "") { return }

  setItems((currItems) => [...currItems,{
    content:form.item,
    isDone: false
  }])
  setForm((currForm) => {return {...currForm,item:""}})
}

function HandleIsDoneChanged(idx,value) {
  setItems((currItems) => currItems.map((item,i) => {
      i === idx && (item.isDone = value)
      return item
  }
  ))
}

function HandleDeletePressed(idx) {
  setItems((currItems) => 
  currItems.filter((item, i)=> i!=idx)
  )
}

return (
    <div className="App">
      <h1 className="title">to◡do</h1>
      <form onSubmit={onSubmit}>
        <input autoFocus className="item-input" name="item" onChange={onFormChange} value={form.item} />
      </form>
      <div className="items">
      {
        items.map((item,idx) => (
            <Item
            key={idx}
            itemData={item}
            HandleIsDoneChanged={(value)=>HandleIsDoneChanged(idx, value)}
            HandleDeletePressed={()=>HandleDeletePressed(idx)}
            />
          )
        )
      }
      </div>
    </div>
  );
}

export default App;
