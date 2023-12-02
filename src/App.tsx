import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "./assets/logo.jpg";

const time = [
  {
    label: "1 min",
    value: "01"
  },
  {
    label: "15 min",
    value: "15",
  },
  {
    label: "30 min",
    value: "30",
  },
];

const maximumKill = [
  {
    label: "15 kill",
    value: 15,
  },
  {
    label: "30 kill",
    value: 30,
  },
];
function App() {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("15");
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [complete, setComplete] = useState(true);
  const [max, setMax] = useState(15);
  const [toggle, setToggle] = useState(true);
  function handleStart() {
    setComplete(false);
  }
  function handleReset() {
    window.location.reload()
  }
  useEffect(() => {
    if (p1 === max || p2 === max) {
      let message;
      if (p1 === max) {
        message = toggle ? 'blue win' : 'red win';
        alert(message);
      }
      else if (p2 === max) {
        message = toggle ? 'red win' : 'blue win';
        alert(message);
      }
      setComplete(true);
    }
  }, [p1, p2]);
  useEffect(() => {
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
            setMinute("15")
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
  });
  return (
    <Stack>
      <Stack alignItems={"center"} spacing={3}>
        <img src={Logo} height={200} width={400} />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
          00:{minute}:{second}
        </Typography>
        <Stack direction={'row'} spacing={10}>
          <Box
            width={400}
            height={400}
            bgcolor={!toggle ? 'error.main' : 'primary.main'}
            textAlign={"center"}
          >
            <Typography fontSize={200}>{p1}</Typography>
          </Box>
          {complete ? (
            <Button variant="contained" color="success" onClick={() => { setToggle(!toggle) }}>
              Switch
            </Button>
          ) : (
            <Typography color="white" variant="h1">{max}</Typography>
          )}
          <Box
            width={400}
            height={400}
            bgcolor={toggle ? 'error.main' : 'primary.main'}
            textAlign={"center"}
          >
            <Typography fontSize={200}>{p2}</Typography>
          </Box>
        </Stack>
        {complete ? (
          <Stack direction={"row"} spacing={2}>
            <TextField
              select
              defaultValue={"15"}
              sx={{ bgcolor: "white" }}
              onChange={(event) => {
                setMinute(event.target.value);
              }}
            >
              {time.map((row, index) => (
                <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              defaultValue={15}
              sx={{ bgcolor: "white" }}
              onChange={(event) => {
                setMax(parseInt(event.target.value));
              }}
            >
              {maximumKill.map((row, index) => (
                <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : (
          <></>
        )}
        {complete ? (
          <Stack direction={'row'} spacing={5}>
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start
            </Button>
            <Button variant="contained" color="success" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        ) : (
          <Stack direction={'row'} spacing={10}>
            <Button variant="contained" color={!toggle ? 'error' : 'primary'} tabIndex={0} onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setP1(p1 + 1);
              }
              else if (event.key === "Spacebar" || event.key === ' '){
                event.preventDefault();
                setP2(p2+1);
              }
            }}>
              Score
            </Button>
            <Button variant="contained" color="secondary" onClick={() => { setComplete(true) }}>
              Stop
            </Button>
            <Button variant="contained" color={toggle ? 'error' : 'primary'} >
              Score
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
