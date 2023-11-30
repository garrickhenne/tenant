import { ThemeProvider, createTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState, useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";

const givenOptions = [
  { firstName: 'Garrick', lastName: 'Henne', postalCode: 'V5N-2C4' },
  { firstName: 'Kenzie', lastName: 'Littlelight', postalCode: 'V5Z-4A6' }
];

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
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
  const { landlord } = useContext(newReviewContext);
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
          onChange={(event, value, reason) => {
            console.log(value);
            console.log(reason);
            landlord.setFirstName(value.firstName);
            landlord.setLastName(value.lastName);
            setVal(value.postalCode);
          }}
          isOptionEqualToValue={ (option, value) => option.firstName === value.firstName && option.lastName == value.lastName }
          getOptionLabel={(option) => {
            return `${option.firstName} ${option.lastName} ${option.postalCode}`;
          }}
          options={options}
          loading={loading}
          freeSolo
          disableClearable
          fullWidth
          loadingText='Finding landlords...'
          id="free-solo-demo"
          renderInput={(params) => {
            return(
              <div ref={params.InputProps.ref}>
                <input type="text" {...params.inputProps} className="bg-transparent border border-white rounded-sm pl-3 h-9 w-[100%]" placeholder="A1B-2C3" value={val} onChange={(e) => setVal(e.target.value)}/>
              </div>
            );
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AutoCompleteInput;