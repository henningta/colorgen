import React from 'react';
import Popper from '@mui/base/Popper';
import { AutocompleteListbox, AutocompleteOption } from '@mui/joy';
import ListSubheader from '@mui/joy/ListSubheader';
import { ListChildComponentProps, FixedSizeList } from 'react-window';

const LISTBOX_PADDING = 6; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="li" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <AutocompleteOption {...dataSet[0]} style={inlineStyle}>
      {dataSet[1]}
    </AutocompleteOption>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return (
    <AutocompleteListbox
      {...props}
      {...outerProps}
      component="div"
      ref={ref}
      sx={{
        '& ul': {
          padding: 0,
          margin: 0,
          flexShrink: 0,
        },
      }}
    />
  );
});

OuterElementType.displayName = 'OuterElementType';

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  {
    // eslint-disable-next-line
    anchorEl: any;
    open: boolean;
    // eslint-disable-next-line
    modifiers: any[];
  } & React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, anchorEl, open, modifiers, ...other } = props;

  // eslint-disable-next-line
  const itemData: Array<any> = [];
  (
    children as [Array<{ children: Array<React.ReactElement> | undefined }>]
  )[0].forEach((item) => {
    if (item) {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  });

  const itemCount = itemData.length;
  const itemSize = 40;

  return (
    <Popper
      ref={ref}
      anchorEl={anchorEl}
      open={open}
      modifiers={modifiers}
      disablePortal
      style={{ display: itemCount === 0 ? 'none' : undefined }}
    >
      <OuterElementContext.Provider value={other}>
        <FixedSizeList
          itemData={itemData}
          height={itemSize * 8}
          width="100%"
          // @ts-expect-error something weird about react element types, but it works
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={itemSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </FixedSizeList>
      </OuterElementContext.Provider>
    </Popper>
  );
});

export default ListboxComponent;
