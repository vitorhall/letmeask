import { useState } from "react"

type ButtonProps= {
  text?: Array<string>;
  children?: string;
}

export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(0)
  function increment() {
    setCounter( counter + 1)
    console.log(counter)
  }

  return(
    //<button>{props.text || props.children || 'Default'}</button>
    <button onClick={increment}>{counter}</button>
  )
}