import React, { useReducer, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Useconred } from "./context/todocontext";
import { Usetostcontext } from "./context/toast";

const Todocomp = ({ todo, handleopen, handleopenupdate }) => {
  const { handleClicktosot } = Usetostcontext();

  const { dispatch } = Useconred();

  const cheack = () => {
    dispatch({ type: "done", payload: todo });
    handleClicktosot("كفوو");
  };
  return (
    <>
      {/* update model */}

      <Grid
        container
        spacing={2}
        style={{ direction: "rtl", background: "#f7f7f7" }}
        sx={{ paddingY: "30px" }}
        className="todo"
      >
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column", // جعل العنوان والوصف في عمود
            justifyContent: "center",
            alignItems: "flex-start",
            paddingRight: "16px",
          }}
        >
          <Typography
            variant="h4"
            style={{ textDecoration: todo.iscomp ? "line-through" : "" }}
          >
            {todo.title}
          </Typography>
          <Typography variant="h6">{todo.des}</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconButton
            className="iconbtn"
            aria-label="delete"
            sx={{ color: "#e91e1e", border: "2px solid" }}
            onClick={() => {
              handleopen(todo.id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              cheack();
            }}
            className="iconbtn"
            style={{
              color: todo.iscomp ? "#32dd24" : "black",
              border: "2px solid",
            }}
            aria-label="check"
          >
            <CheckOutlinedIcon />
          </IconButton>

          {/* edit btn */}
          <IconButton
            className="iconbtn"
            sx={{ color: "#4ea0af", border: "2px solid" }}
            aria-label="check"
            onClick={() => {
              handleopenupdate(todo);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Todocomp;
