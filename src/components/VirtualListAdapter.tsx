import { forwardRef } from 'react';
import {
  ListSubheader,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { List, type RowComponentProps } from 'react-window';

const LISTBOX_PADDING = 8; // px

type ColorOption = { name: string; hex?: string };
type GroupItem = { key: string; group: string };
type OptionItem = [
  React.HTMLAttributes<HTMLElement> & { key: string },
  ColorOption,
];
type DataItem = GroupItem | OptionItem;

type RowData = {
  itemData: DataItem[];
};

function RowRenderer({ index, style, itemData }: RowComponentProps<RowData>) {
  const dataSet = itemData[index];
  // v2 uses transform: translateY(...) for positioning; add LISTBOX_PADDING via top
  const inlineStyle: React.CSSProperties = { ...style, top: LISTBOX_PADDING };

  if (Object.hasOwn(dataSet, 'group')) {
    const { key, group } = dataSet as GroupItem;
    return (
      <ListSubheader key={key} component="div" style={inlineStyle}>
        {group}
      </ListSubheader>
    );
  }

  const [{ key, ...optionProps }, option] = dataSet as OptionItem;

  return (
    <Stack
      key={key}
      component="li"
      direction="row"
      sx={{ alignItems: 'center', gap: 2 }}
      {...optionProps}
      style={inlineStyle}
    >
      <Paper
        variant="outlined"
        sx={{
          width: 24,
          height: 24,
          bgcolor: option.hex,
          borderRadius: '50%',
        }}
      />
      <Typography noWrap sx={{ flex: 1 }}>
        {option.name}
      </Typography>
    </Stack>
  );
}

// Adapter for react-window v2
const ListboxComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: DataItem[] = [];
  (children as unknown[]).forEach((item: unknown) => {
    const child = item as DataItem & { children?: DataItem[] };
    itemData.push(child);
    itemData.push(...(child.children ?? []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: DataItem) =>
    Object.hasOwn(child, 'group') ? 48 : itemSize;

  const getHeight = () => {
    if (itemCount > 8) return 8 * itemSize;
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <List<RowData>
        {...(other as React.HTMLAttributes<HTMLDivElement>)}
        rowComponent={RowRenderer}
        rowProps={{ itemData }}
        rowCount={itemCount}
        rowHeight={(index) => getChildSize(itemData[index])}
        style={{ height: getHeight() + 2 * LISTBOX_PADDING }}
        overscanCount={5}
      />
    </div>
  );
});

export default ListboxComponent;
