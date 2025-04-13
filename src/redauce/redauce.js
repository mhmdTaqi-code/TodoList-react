import { v4 as uuidv4 } from "uuid";

export const hanndlereduce = (Newstate, action) => {
  switch (action.type) {
    case "add":
      if (
        action.payload.inputvaluenew !== "" &&
        action.payload.inputvaluenew !== null
      ) {
        const newtodo = {
          id: uuidv4(),
          title: action.payload.inputvaluenew,
          des: "",
          iscomp: false,
        };
        const upd = [...Newstate, newtodo];
        localStorage.setItem("tdos", JSON.stringify(upd));
        return upd;
      }
      return Newstate;
    case "Update": {
      const edittdo = Newstate.map((t) =>
        t.id === action.payload.id
          ? { ...t, title: action.payload.title, des: action.payload.des }
          : t
      );

      localStorage.setItem("tdos", JSON.stringify(edittdo));
      return edittdo;
    }
    case "delete": {
      const updatedTodo = Newstate.filter((t) => t.id !== action.payload);
      localStorage.setItem("tdos", JSON.stringify(updatedTodo));
      return updatedTodo;
    }
    case "done": {
      const updatei = Newstate.map((t) =>
        t.id === action.payload.id ? { ...t, iscomp: !t.iscomp } : t
      );

      localStorage.setItem("tdos", JSON.stringify(updatei));
      return updatei;
    }
    case "get": {
      return JSON.parse(localStorage.getItem("tdos"));
    }
    default:
      return Newstate;
  }
};
