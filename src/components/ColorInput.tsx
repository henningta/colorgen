import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { colornames } from 'color-name-list';
import ListboxComponent from './VirtualListAdapter';

export type ColorInputProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
  }, [selected, onChange]);

  return (
    <Autocomplete
      options={colornames.map((x) => x.name)}
      noOptionsText="Blah"
      value={selected}
      onChange={(_, selected) => setSelected(selected)}
      placeholder="Search by name, hex, rgb…"
      inputValue={value}
      onInputChange={(_, value) => onChange(value)}
      freeSolo
      selectOnFocus
      slots={{
        listbox: ListboxComponent,
      }}
      renderOption={(props, option) => [props, option] as React.ReactNode}
      renderGroup={(params) => params as unknown as React.ReactNode}
      sx={(theme) => ({
        width: 0,
        flex: 1,
        [theme.breakpoints.down('md')]: { ml: 2 },
      })}
    />
  );
};

export default ColorInput;
