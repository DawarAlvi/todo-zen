import { useEffect, useState, useRef } from "react";
import Item from "./components/Item";
import logo from "./logo.svg";

function App() {
  let [form, setForm] = useState({
    item: "",
  });
  let [items, setItems] = useState([]);
  let [isDarkMode, setIsDarkMode] = useState(false)
  const isMounted = useRef(false);

  function onFormChange(e) {
    let { name, value } = e.target;
    setForm((currForm) => {
      return { ...currForm, [name]: value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (form.item === "") {
      return;
    }

    setItems((currItems) => [
      ...currItems,
      {
        content: form.item,
        isDone: false,
      },
    ]);
    setForm((currForm) => {
      return { ...currForm, item: "" };
    });
  }

  function handleIsDoneChanged(idx, value) {
    setItems((currItems) =>
      currItems.map((item, i) => {
        i === idx && (item.isDone = value);
        return item;
      })
    );
  }

  function handleDeletePressed(idx) {
    setItems((currItems) => currItems.filter((item, i) => i != idx));
  }

  function toggleDarkMode(value) {
    const body = document.querySelector("body");
    if (value === undefined) {
      body.classList.toggle("dark-mode");
    } else {
      if (value) {
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
      }
    }

    const darkModeValue = body.classList.contains("dark-mode")
    setIsDarkMode(darkModeValue)
    localStorage.setItem("darkMode", darkModeValue);
  }
  
  useEffect(() => {
    let lsItems = JSON.parse(localStorage.getItem("items"));
    if (lsItems) {
      setItems(lsItems);
    }

    const lsDarkMode = localStorage.getItem("darkMode") === "true";
    toggleDarkMode(lsDarkMode);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <h1 className="title">to◡do</h1>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          className="item-input"
          name="item"
          onChange={onFormChange}
          value={form.item}
        />
      </form>
      <div className="items">
        {items.map((item, idx) => (
          <Item
            key={idx}
            itemData={item}
            HandleIsDoneChanged={(value) => handleIsDoneChanged(idx, value)}
            HandleDeletePressed={() => handleDeletePressed(idx)}
          />
        ))}
      </div>
      <button
        className="dark-mode-toggle"
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>
    </div>
  );
}

export default App;
