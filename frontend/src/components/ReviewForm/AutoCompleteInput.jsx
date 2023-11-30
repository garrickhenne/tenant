import { ThemeProvider, createTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

const givenOptions = [
  { title: 'Garrick' },
  { title: 'Henne' }
];

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

const theme = createTheme({
  typography: {
    fontFamily: 'Jost',
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: `
      @font-face {
        font-family: 'Jost'
        src: url(https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap)
      }
      `
    }
  }
});

const AutoCompleteInput = ({ val, setVal }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async() => {
      await sleep();

      if (active) {
        setOptions([...givenOptions]);
      }
    })();
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>Postal Code</p>
      <ThemeProvider theme={theme}>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option,value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={options}
          loading={loading}
          freeSolo
          disableClearable
          fullWidth
          loadingText='Finding landlords...'
          id="free-solo-demo"
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input type="text" {...params.inputProps} className="bg-transparent border border-white rounded-sm pl-3 h-9 w-[100%]" placeholder="A1B-2C3" />
            </div>
          )}
        />
      </ThemeProvider>
    </div>
  );
};

export default AutoCompleteInput;