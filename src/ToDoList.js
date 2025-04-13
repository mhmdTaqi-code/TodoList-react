import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todocomp from "./Todocomp";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useMemo } from "react";
import { Usetostcontext } from "./context/toast";
import { Useconred } from "./context/todocontext";
export default function TodoList() {
  const { handleClicktosot } = Usetostcontext();

  const [fltr, setfltr] = useState("all");
  const [inputvalue, setinputvalue] = useState("");
  const [open, Setopen] = useState(false);
  const [IDdelte, setIdDelete] = useState("");
  const [Update, SetUpdate] = useState(false);
  const [TdoNow, setTdoNow] = useState("");
  const [Updatetdonew, setUpdatetdo] = useState(TdoNow);
  const { todoone, dispatch } = Useconred();
  useEffect(() => {
    setUpdatetdo(TdoNow);
  }, [TdoNow]);
  const buttonclickedAdd = () => {
    dispatch({ type: "add", payload: { inputvaluenew: inputvalue } });
    setinputvalue("");
    handleClicktosot("تم اضافه المهمه بنجاح");
  };

  const handleCloseupdate = () => {
    SetUpdate(false);
  };
  const handleopenupdate = (T) => {
    SetUpdate(true);
    setTdoNow(T);
  };

  const handleupdate = () => {
    dispatch({ type: "Update", payload: Updatetdonew });
    handleClicktosot("تم  تعديل المهمه بنجاح");
    SetUpdate(false); // إغلاق نافذة التحديث بعد الحفظ
  };

  const handleDelte = () => {
    dispatch({ type: "delete", payload: IDdelte });
    handleClicktosot("تم حذف المهمه بنجاح");
    handleClose();
  };

  const handleopen = (ID) => {
    Setopen(true);
    setIdDelete(ID);
  };
  const handleClose = () => {
    Setopen(false);
  };

  const comp = useMemo(
    () =>
      todoone && Array.isArray(todoone) ? todoone.filter((t) => t.iscomp) : [],
    [todoone]
  );

  const notcomp = useMemo(
    () =>
      todoone.filter((t) => {
        return !t.iscomp;
      }),
    [todoone]
  );

  let renderTdo = todoone;

  if (fltr == "comp") {
    renderTdo = comp;
  } else if (fltr == "non-comp") {
    renderTdo = notcomp;
  } else {
    renderTdo = todoone;
  }

  const render = renderTdo.map((t) => {
    return (
      <Todocomp
        key={t.id}
        todo={t}
        handleopen={handleopen}
        handleopenupdate={handleopenupdate}
      />
    );
  });

  function ToggleButtons() {
    const hanndlefltr = (e) => {
      setfltr(e.target.value);
    };

    return (
      <ToggleButtonGroup
        onChange={hanndlefltr}
        value={fltr}
        sx={{ marginTop: "5px" }}
        exclusive
        aria-label="text alignment"
      >
        <ToggleButton value={"non-comp"}>غير المنجز</ToggleButton>
        <ToggleButton value={"comp"}>المنجز</ToggleButton>
        <ToggleButton value={"all"}>الكل</ToggleButton>
      </ToggleButtonGroup>
    );
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  return (
    <>
      {/* update model */}
      <Dialog
        open={Update}
        onClose={handleCloseupdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="عنوان المهمة"
                  variant="outlined"
                  fullWidth
                  value={Updatetdonew.title}
                  onChange={(e) => {
                    setUpdatetdo({ ...Updatetdonew, title: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="وصف المهمة"
                  variant="outlined"
                  fullWidth
                  value={Updatetdonew.des}
                  onChange={(e) => {
                    setUpdatetdo({ ...Updatetdonew, des: e.target.value });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseupdate}>إلغاء</Button>
          <Button autoFocus onClick={handleupdate}>
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete model */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل انت متاكد من حذف المهمه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button
            autoFocus
            onClick={() => {
              handleDelte();
            }}
          >
            نعم
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            padding: "20px",
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">مهامي</Typography>
            <Divider style={{ width: "100%" }} />
            <ToggleButtons />

            {render}
          </CardContent>

          <Grid
            container
            spacing={2}
            sx={{ direction: "rtl", marginTop: "15px" }}
          >
            <Grid item xs={8}>
              {" "}
              <TextField
                sx={{ width: "100%", height: "100%" }}
                id="outlined-basic"
                label="اضافه مهمه"
                variant="outlined"
                value={inputvalue}
                onChange={(e) => {
                  setinputvalue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{ width: "100%", height: "100%" }}
                onClick={buttonclickedAdd}
                disabled={inputvalue.length == 0}
                variant="contained"
              >
                اضافه
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
