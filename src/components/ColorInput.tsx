import React, { useEffect, useMemo, useState } from 'react';
import { IconButton, TextField } from '@mui/joy';
import { Autocomplete, Tooltip } from '@mui/material';
import debounce from 'lodash.debounce';
import Icon from './Icon';
import colorNameList from 'color-name-list';
import { copyToClipboard, getColorHex, stripColorName } from '../utils';
import { useSnackbarContext } from '../context';
import ListboxComponent, { StyledPopper } from './VirtualListAdapter';

export type ColorInputProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const { setSnackbar } = useSnackbarContext();

  const [selected, setSelected] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const colorHex = getColorHex(value);

  const debounceSuggestions = useMemo(
    () =>
      debounce((input: string) => {
        if (input?.length) {
          const filteredColors = colorNameList
            .map((x) => x.name)
            .filter((color) => {
              const strippedName = stripColorName(color);
              const strippedInput = stripColorName(input);
              return (
                strippedInput &&
                // strippedInput.length >= 3 &&
                strippedName?.includes(strippedInput)
              );
            }) as string[];
          setSuggestions(filteredColors);
        } else {
          setSuggestions([]);
        }
      }, 100),
    []
  );

  useEffect(() => {
    debounceSuggestions(value);
  }, [debounceSuggestions, value]);

  const copyColorHex = async () => {
    if (!colorHex) {
      return;
    }

    try {
      await copyToClipboard(colorHex);
      setSnackbar({
        icon: { name: 'content_copy' },
        message: <>&ldquo;{colorHex}&rdquo; copied to clipboard.</>,
        dismissable: true,
      });
    } catch (e) {
      console.error('Copy error: ', e);
    }
  };

  useEffect(() => {
    selected && onChange(selected);
    setShowSuggestions(false);
  }, [selected, onChange]);

  return (
    <Autocomplete
      sx={(theme) => ({
        width: 0,
        flex: 1,
        [theme.breakpoints.down('md')]: { ml: 2 },
      })}
      value={selected}
      onChange={(_, selected) => setSelected(selected)}
      freeSolo
      options={suggestions}
      open={!!suggestions.length && showSuggestions}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setShowSuggestions(false)}
      blurOnSelect
      ListboxComponent={ListboxComponent}
      PopperComponent={(popperProps) => (
        <StyledPopper {...popperProps} sx={{}} placement="top" />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          ref={params.InputProps.ref}
          type="text"
          sx={{ flex: 1 }}
          componentsProps={{ input: params.inputProps }}
          size="md"
          variant="soft"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          // onFocus={(e) => e.target.select()}
          startDecorator={<Icon>search</Icon>}
          endDecorator={
            <Tooltip title="Copy Hex" placement="top">
              <IconButton variant="plain" onClick={() => void copyColorHex()}>
                <Icon>content_copy</Icon>
              </IconButton>
            </Tooltip>
          }
        />
      )}
      renderOption={(props, option) => [props, option] as React.ReactNode}
      renderGroup={(params) => params as unknown as React.ReactNode}
    />
  );
};

export default ColorInput;
