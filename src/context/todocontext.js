import { createContext, useReducer, useContext } from "react";
import { hanndlereduce } from "./../redauce/redauce";

export const Todoscontext = createContext({});

const Todoprovider = ({ children }) => {
  const [todoone, dispatch] = useReducer(hanndlereduce, []);

  return (
    <Todoscontext.Provider value={{ todoone, dispatch }}>
      {children}
    </Todoscontext.Provider>
  );
};

export default Todoprovider;

export const Useconred = () => {
  return useContext(Todoscontext);
};
