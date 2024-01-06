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
          autoComplete="off"
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
            itemData={{...item,"idx":idx}}
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
        {isDarkMode ?
        <svg fill="white" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="32px" height="32px"><path d="M 11.875 0.1875 C 11.371094 0.25 10.996094 0.679688 11 1.1875 L 11 3.1875 C 10.996094 3.546875 11.183594 3.882813 11.496094 4.066406 C 11.808594 4.246094 12.191406 4.246094 12.503906 4.066406 C 12.816406 3.882813 13.003906 3.546875 13 3.1875 L 13 1.1875 C 13.003906 0.898438 12.878906 0.625 12.664063 0.433594 C 12.449219 0.242188 12.160156 0.152344 11.875 0.1875 Z M 4 3.375 C 3.625 3.441406 3.324219 3.714844 3.21875 4.078125 C 3.113281 4.445313 3.222656 4.835938 3.5 5.09375 L 4.90625 6.5 C 5.148438 6.796875 5.535156 6.933594 5.910156 6.847656 C 6.28125 6.761719 6.574219 6.46875 6.660156 6.097656 C 6.746094 5.722656 6.609375 5.335938 6.3125 5.09375 L 4.90625 3.6875 C 4.71875 3.488281 4.460938 3.378906 4.1875 3.375 C 4.15625 3.375 4.125 3.375 4.09375 3.375 C 4.0625 3.375 4.03125 3.375 4 3.375 Z M 19.6875 3.375 C 19.460938 3.40625 19.25 3.519531 19.09375 3.6875 L 17.6875 5.09375 C 17.390625 5.335938 17.253906 5.722656 17.339844 6.097656 C 17.425781 6.46875 17.71875 6.761719 18.089844 6.847656 C 18.464844 6.933594 18.851563 6.796875 19.09375 6.5 L 20.5 5.09375 C 20.796875 4.808594 20.886719 4.367188 20.726563 3.988281 C 20.570313 3.609375 20.191406 3.367188 19.78125 3.375 C 19.75 3.375 19.71875 3.375 19.6875 3.375 Z M 12 5.1875 C 8.15625 5.1875 5 8.34375 5 12.1875 C 5 16.03125 8.15625 19.1875 12 19.1875 C 15.84375 19.1875 19 16.03125 19 12.1875 C 19 8.34375 15.84375 5.1875 12 5.1875 Z M 12 7.1875 C 14.753906 7.1875 17 9.433594 17 12.1875 C 17 14.941406 14.753906 17.1875 12 17.1875 C 9.246094 17.1875 7 14.941406 7 12.1875 C 7 9.433594 9.246094 7.1875 12 7.1875 Z M 0.8125 11.1875 C 0.261719 11.238281 -0.144531 11.730469 -0.09375 12.28125 C -0.0429688 12.832031 0.449219 13.238281 1 13.1875 L 3 13.1875 C 3.359375 13.191406 3.695313 13.003906 3.878906 12.691406 C 4.058594 12.378906 4.058594 11.996094 3.878906 11.683594 C 3.695313 11.371094 3.359375 11.183594 3 11.1875 L 1 11.1875 C 0.96875 11.1875 0.9375 11.1875 0.90625 11.1875 C 0.875 11.1875 0.84375 11.1875 0.8125 11.1875 Z M 20.8125 11.1875 C 20.261719 11.238281 19.855469 11.730469 19.90625 12.28125 C 19.957031 12.832031 20.449219 13.238281 21 13.1875 L 23 13.1875 C 23.359375 13.191406 23.695313 13.003906 23.878906 12.691406 C 24.058594 12.378906 24.058594 11.996094 23.878906 11.683594 C 23.695313 11.371094 23.359375 11.183594 23 11.1875 L 21 11.1875 C 20.96875 11.1875 20.9375 11.1875 20.90625 11.1875 C 20.875 11.1875 20.84375 11.1875 20.8125 11.1875 Z M 5.46875 17.59375 C 5.25 17.632813 5.054688 17.742188 4.90625 17.90625 L 3.5 19.28125 C 3.101563 19.667969 3.097656 20.304688 3.484375 20.703125 C 3.871094 21.101563 4.507813 21.105469 4.90625 20.71875 L 6.3125 19.3125 C 6.636719 19.011719 6.722656 18.535156 6.527344 18.140625 C 6.335938 17.742188 5.902344 17.523438 5.46875 17.59375 Z M 18.1875 17.59375 C 17.8125 17.660156 17.511719 17.933594 17.40625 18.296875 C 17.300781 18.664063 17.410156 19.054688 17.6875 19.3125 L 19.09375 20.71875 C 19.492188 21.105469 20.128906 21.101563 20.515625 20.703125 C 20.902344 20.304688 20.898438 19.667969 20.5 19.28125 L 19.09375 17.90625 C 18.886719 17.683594 18.585938 17.570313 18.28125 17.59375 C 18.25 17.59375 18.21875 17.59375 18.1875 17.59375 Z M 11.875 20.1875 C 11.371094 20.25 10.996094 20.679688 11 21.1875 L 11 23.1875 C 10.996094 23.546875 11.183594 23.882813 11.496094 24.066406 C 11.808594 24.246094 12.191406 24.246094 12.503906 24.066406 C 12.816406 23.882813 13.003906 23.546875 13 23.1875 L 13 21.1875 C 13.003906 20.898438 12.878906 20.625 12.664063 20.433594 C 12.449219 20.242188 12.160156 20.152344 11.875 20.1875 Z"/></svg>
        : 
        <svg fill="black" xmlns="http://www.w3.org/2000/svg"  viewBox="90 100 320 320" width="32px" height="32px"><path d="M349.852,343.15c-49.875,49.916-131.083,49.916-181,0c-49.916-49.918-49.916-131.125,0-181.021  c13.209-13.187,29.312-23.25,47.832-29.812c5.834-2.042,12.293-0.562,16.625,3.792c4.376,4.375,5.855,10.833,3.793,16.625  c-12.542,35.375-4,73.666,22.25,99.917c26.209,26.228,64.5,34.75,99.916,22.25c5.792-2.062,12.271-0.582,16.625,3.793  c4.376,4.332,5.834,10.812,3.771,16.625C373.143,313.838,363.06,329.941,349.852,343.15z M191.477,184.754  c-37.438,37.438-37.438,98.354,0,135.771c40,40.021,108.125,36.416,143-8.168c-35.959,2.25-71.375-10.729-97.75-37.084  c-26.375-26.354-39.333-61.771-37.084-97.729C196.769,179.796,194.039,182.192,191.477,184.754z"/></svg>
        }
      </button>
      <span className="by">Made with ♥ by <a href="https://dawaralvi.netlify.app" target="_blank">Dawar</a></span>
    </div>
  );
}

export default App;
