import { ThemeProvider, createTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState, useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import axios from "axios";

const getProperties = async(firstName, lastName) => {
  const params = {
    firstName,
    lastName
  };
  const response = await axios.get('/api/getProperties', { params });
  return response.data;
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
  const { landlord, property } = useContext(newReviewContext);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async() => {
      const givenOptions = await getProperties(landlord.firstName, landlord.lastName);
      
      if (active) {
        setOptions([...givenOptions]);
      }
    })();
  }, [loading, landlord.firstName, landlord.lastName]);

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
          onChange={(_, value) => {
            setVal(value.postalCode);
            property.setStreetNumber(value.streetNumber);
            property.setStreetName(value.streetName);
          }}
          isOptionEqualToValue={ (option, value) => option.postalCode === value.postalCode }
          getOptionLabel={(option) => {
            return `${option.postalCode} - ${option.streetName} ${option.streetNumber}`;
          }}
          options={options}
          freeSolo
          disableClearable
          fullWidth
          id="free-solo-demo"
          renderInput={(params) => {
            return(
              <div ref={params.InputProps.ref}>
                <input type="text" {...params.inputProps} className="bg-transparent border border-gray-500 rounded-lg focus:shadow-md focus:outline-none hover:shadow-md pl-3 h-9 w-[100%] transition-shadow" placeholder="A1B-2C3" value={val} onChange={(e) => setVal(e.target.value)}/>
              </div>
            );
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AutoCompleteInput;