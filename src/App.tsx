import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "./assets/logo.jpg";
import Laser from "./assets/laser.mp3";
import Message from "./Message";
const time = [
  {
    label: "15 min",
    value: "15",
  },
  {
    label: "30 min",
    value: "30",
  },
  {
    label: "45 min",
    value: "45",
  },
  {
    label: "60 min",
    value: "60",
  },
];

const maximumKill = [
  {
    label: "30 kill",
    value: 30,
  },
  {
    label: "40 kill",
    value: 40,
  },
  {
    label: "50 kills",
    value: 50,
  },
  {
    label: "70 kills",
    value: 70,
  },
];
function App() {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("45");
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(true);
  const [max, setMax] = useState(50);
  const [toggle, setToggle] = useState(true);
  const [endless, setEndless] = useState(false);
  function handleStart() {
    setComplete(false);
  }
  function handleReset() {
    window.location.reload();
  }
  function resetScore() {
    setP1(0);
    setP2(0);
  }
  const endlessMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndless(event.target.checked);
  };
  useEffect(() => {
    if (p1 === max || p2 === max) {
      if (p1 === max) {
        setMessage(toggle ? "blue win" : "red win");
        setOpen(true);
      } else if (p2 === max) {
        setMessage(toggle ? "red win" : "blue win");
        setOpen(true);
      }
      setSecond("00");
      setMinute("45");
      setComplete(true);
      resetScore();
    }
  }, [p1, p2]);
  useEffect(() => {
    if (!endless) {
      if (!complete) {
        const interval = setInterval(() => {
          if (parseInt(second) > 0) {
            if (parseInt(second) < 11) {
              setSecond(`0${parseInt(second) - 1}`);
            } else {
              setSecond(`${parseInt(second) - 1}`);
            }
          }
          if (parseInt(second) === 0) {
            if (parseInt(minute) === 0) {
              setComplete(true);
              if (p1 > p2) {
                setMessage(toggle ? "blue win" : "red win");
              } else if (p2 > p1) {
                setMessage(toggle ? "red win" : "blue win");
              }
              resetScore();
              setOpen(true);
              setMinute("45");
              clearInterval(interval);
            } else {
              if (parseInt(minute) < 10) {
                setMinute(`0${parseInt(minute) - 1}`);
              } else {
                setMinute(`${parseInt(minute) - 1}`);
              }
              setSecond("59");
            }
          }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  });
  return (
    <Stack>
      <Stack alignItems={"center"} spacing={3}>
        <img src={Logo} height={200} width={400} />
        {!endless ? (
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
            00:{minute}:{second}
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
          Endless Mode
        </Typography>
        )}
        <Stack direction={"row"} spacing={10}>
          <Box
            width={400}
            height={400}
            bgcolor={!toggle ? "error.main" : "primary.main"}
            textAlign={"center"}
          >
            <Typography fontSize={200}>{p1}</Typography>
          </Box>
          {complete ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Switch
            </Button>
          ) : (
            <Typography color="white" variant="h1">
              {max}
            </Typography>
          )}
          <Box
            width={400}
            height={400}
            bgcolor={toggle ? "error.main" : "primary.main"}
            textAlign={"center"}
          >
            <Typography fontSize={200}>{p2}</Typography>
          </Box>
        </Stack>
        {complete ? (
          <Stack alignItems={"center"} spacing={2}>
            <FormControlLabel
              control={
                <Switch checked={endless} size="medium" color="error" onChange={endlessMode} />
              }
              label={<Typography color={"white"}>Endless</Typography>}
              labelPlacement="end"
            />
            <Stack direction={"row"} spacing={2}>
              {!endless ? (
                <TextField
                  select
                  defaultValue={"45"}
                  onChange={(event) => {
                    setMinute(event.target.value);
                  }}
                >
                  {time.map((row, index) => (
                    <MenuItem key={index} value={row.value}>
                      {row.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <></>
              )}
              <TextField
                select
                defaultValue={50}
                onChange={(event) => {
                  setMax(parseInt(event.target.value));
                }}
              >
                {maximumKill.map((row, index) => (
                  <MenuItem key={index} value={row.value}>
                    {row.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
        {complete ? (
          <Stack direction={"row"} spacing={5}>
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        ) : (
          <Stack direction={"row"} spacing={10}>
            <Button
              variant="contained"
              color={!toggle ? "error" : "primary"}
              tabIndex={0}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  setTimeout(() => {
                    new Audio(Laser).play()
                    setP1(p1 +1);
                  }, 1000)
                } else if (event.key === "Spacebar" || event.key === " ") {
                  setTimeout(() => {
                    setP2(p2 +1);
                    new Audio(Laser).play()
                  }, 1000)
                }
              }}
            >
              Score
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setComplete(true);
              }}
            >
              Stop
            </Button>
            <Button variant="contained" color={toggle ? "error" : "primary"}>
              Score
            </Button>
          </Stack>
        )}
      </Stack>
      <Message
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        message={message}
      />
    </Stack>
  );
}

export default App;