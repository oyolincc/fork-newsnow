'use client'
import { DatePicker, useDatePickerContext } from '@ark-ui/react/date-picker'
import { ark } from '@ark-ui/react/factory'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
import { forwardRef, type ComponentProps, type Provider } from 'react'
import type { StyledComponent } from 'styled-system/types'
import { Button } from '@/components/atoms/buttons/Button'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { datePicker, type DatePickerVariantProps } from 'styled-system/recipes'

const {
  withProvider,
  withContext,
  PropsProvider: DatePropsProvider,
} = createSlotRecipeContext(datePicker)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof DatePicker.Root, DatePickerVariantProps> = withProvider(
  DatePicker.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof DatePicker.RootProvider, DatePickerVariantProps> =
  withProvider(DatePicker.RootProvider, 'root')
export const ClearTrigger = withContext(DatePicker.ClearTrigger, 'clearTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const Content = withContext(DatePicker.Content, 'content')
export const Control = withContext(DatePicker.Control, 'control')
export const Input = withContext(DatePicker.Input, 'input')
export const Label = withContext(DatePicker.Label, 'label')
export const MonthSelect = withContext(DatePicker.MonthSelect, 'monthSelect')
export const NextTrigger = withContext(DatePicker.NextTrigger, 'nextTrigger', {
  defaultProps: { children: <ChevronRightIcon /> },
})
export const Positioner = withContext(DatePicker.Positioner, 'positioner')
export const PresetTrigger = withContext(DatePicker.PresetTrigger, 'presetTrigger')
export const PrevTrigger = withContext(DatePicker.PrevTrigger, 'prevTrigger', {
  defaultProps: { children: <ChevronLeftIcon /> },
})
export const RangeText = withContext(DatePicker.RangeText, 'rangeText')
export const Table: StyledComponent<typeof DatePicker.Table> = withContext(
  DatePicker.Table,
  'table',
)
export const TableBody = withContext(DatePicker.TableBody, 'tableBody')
export const TableCell = withContext(DatePicker.TableCell, 'tableCell')
export const TableCellTrigger = withContext(DatePicker.TableCellTrigger, 'tableCellTrigger')
export const TableHead = withContext(DatePicker.TableHead, 'tableHead')
export const TableHeader = withContext(DatePicker.TableHeader, 'tableHeader')
export const TableRow = withContext(DatePicker.TableRow, 'tableRow')
export const Trigger = withContext(DatePicker.Trigger, 'trigger', {
  defaultProps: { children: <CalendarIcon /> },
})
export const View = withContext(DatePicker.View, 'view')
export const ViewControl = withContext(DatePicker.ViewControl, 'viewControl')
export const ViewTrigger = withContext(DatePicker.ViewTrigger, 'viewTrigger')
export const YearSelect = withContext(DatePicker.YearSelect, 'yearSelect')

export { DatePickerContext as Context } from '@ark-ui/react/date-picker'
export const IndicatorGroup = withContext(ark.div, 'indicatorGroup')
export const WeekNumberHeaderCell = withContext(DatePicker.WeekNumberHeaderCell, 'tableHeader', {
  defaultProps: { 'data-type': 'week-number' },
})
export const WeekNumberCell = withContext(DatePicker.WeekNumberCell, 'tableCell', {
  defaultProps: { 'data-type': 'week-number' },
})
export const WeekNumberCellText = withContext(ark.span, 'weekNumberCellText')
export const ValueText = withContext(DatePicker.ValueText, 'valueText')
export const PropsProvider = DatePropsProvider as Provider<Partial<RootProps>>
export const Header = withContext(DatePicker.ViewControl, 'viewControl', {
  defaultProps: {
    children: (
      <>
        <PrevTrigger />
        <ViewTrigger>
          <RangeText />
        </ViewTrigger>
        <NextTrigger />
      </>
    ),
  },
})

export interface DayTableProps extends TableProps {
  offset?: number
  weekNumberLabel?: string
}
export const DayTable = forwardRef<HTMLTableElement, DayTableProps>(function DayTable(
  { offset = 0, weekNumberLabel = '#', children, ...props },
  ref,
) {
  const picker = useDatePickerContext()
  if (children == null && picker.view !== 'day') return null
  const shifted = offset ? picker.getOffset({ months: offset }) : undefined
  const weeks = shifted ? shifted.weeks : picker.weeks
  return (
    <Table {...props} ref={ref}>
      {children == null ? (
        <>
          <TableHead>
            <TableRow>
              {picker.showWeekNumbers && (
                <WeekNumberHeaderCell>{weekNumberLabel}</WeekNumberHeaderCell>
              )}
              {picker.weekDays.map((day, index) => (
                <TableHeader key={index} scope="col" aria-label={day.long}>
                  {day.narrow}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, index) => (
              <TableRow key={index}>
                {picker.showWeekNumbers && (
                  <WeekNumberCell weekIndex={index} week={week}>
                    <WeekNumberCellText>{picker.getWeekNumber(week)}</WeekNumberCellText>
                  </WeekNumberCell>
                )}
                {week.map((day) => (
                  <TableCell key={day.toString()} value={day} visibleRange={shifted?.visibleRange}>
                    <TableCellTrigger>{day.day}</TableCellTrigger>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </>
      ) : (
        children
      )}
    </Table>
  )
})
export interface MonthTableProps extends TableProps {
  columns?: number
  format?: 'short' | 'long'
}
export const MonthTable = forwardRef<HTMLTableElement, MonthTableProps>(function MonthTable(
  { columns = 4, format = 'short', children, ...props },
  ref,
) {
  const picker = useDatePickerContext()
  if (children == null && picker.view !== 'month') return null
  return (
    <Table {...props} ref={ref}>
      {children == null ? (
        <TableBody>
          {picker.getMonthsGrid({ columns, format }).map((months, index) => (
            <TableRow key={index}>
              {months.map((month) => (
                <TableCell key={month.value} value={month.value}>
                  <TableCellTrigger>{month.label}</TableCellTrigger>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        children
      )}
    </Table>
  )
})
export interface YearTableProps extends TableProps {
  columns?: number
}
export const YearTable = forwardRef<HTMLTableElement, YearTableProps>(function YearTable(
  { columns = 4, children, ...props },
  ref,
) {
  const picker = useDatePickerContext()
  if (children == null && picker.view !== 'year') return null
  return (
    <Table {...props} ref={ref}>
      {children == null ? (
        <TableBody>
          {picker.getYearsGrid({ columns }).map((years, index) => (
            <TableRow key={index}>
              {years.map((year) => (
                <TableCell key={year.value} value={year.value}>
                  <TableCellTrigger>{year.label}</TableCellTrigger>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        children
      )}
    </Table>
  )
})
export interface ValueProps extends Omit<TriggerProps, 'children'> {
  placeholder?: string
}
export const Value = forwardRef<HTMLButtonElement, ValueProps>(function Value(
  { placeholder = 'Select date', ...props },
  ref,
) {
  return (
    <Trigger asChild unstyled {...props} ref={ref}>
      <Button variant="outline" width="full" justifyContent="flex-start">
        <ValueText placeholder={placeholder} />
      </Button>
    </Trigger>
  )
})
export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type ControlProps = ComponentProps<typeof Control>
export type InputProps = ComponentProps<typeof Input>
export type LabelProps = ComponentProps<typeof Label>
export type MonthSelectProps = ComponentProps<typeof MonthSelect>
export type NextTriggerProps = ComponentProps<typeof NextTrigger>
export type PositionerProps = ComponentProps<typeof Positioner>
export type PresetTriggerProps = ComponentProps<typeof PresetTrigger>
export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>
export type RangeTextProps = ComponentProps<typeof RangeText>
export type TableProps = ComponentProps<typeof Table>
export type TableBodyProps = ComponentProps<typeof TableBody>
export type TableCellProps = ComponentProps<typeof TableCell>
export type TableCellTriggerProps = ComponentProps<typeof TableCellTrigger>
export type TableHeadProps = ComponentProps<typeof TableHead>
export type TableHeaderProps = ComponentProps<typeof TableHeader>
export type TableRowProps = ComponentProps<typeof TableRow>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ViewProps = ComponentProps<typeof View>
export type ViewControlProps = ComponentProps<typeof ViewControl>
export type ViewTriggerProps = ComponentProps<typeof ViewTrigger>
export type YearSelectProps = ComponentProps<typeof YearSelect>
export type IndicatorGroupProps = ComponentProps<typeof IndicatorGroup>
export type WeekNumberHeaderCellProps = ComponentProps<typeof WeekNumberHeaderCell>
export type WeekNumberCellProps = ComponentProps<typeof WeekNumberCell>
export type WeekNumberCellTextProps = ComponentProps<typeof WeekNumberCellText>
export type ValueTextProps = ComponentProps<typeof ValueText>
export type HeaderProps = ComponentProps<typeof Header>
export {
  useDatePicker,
  useDatePickerContext,
  type UseDatePickerProps,
  type UseDatePickerReturn,
} from '@ark-ui/react/date-picker'
export type {
  DateValue,
  DatePickerDateRangePreset as DateRangePreset,
  DatePickerDateView as DateView,
  DatePickerSelectionMode as SelectionMode,
  DatePickerValueChangeDetails as ValueChangeDetails,
  DatePickerFocusChangeDetails as FocusChangeDetails,
  DatePickerOpenChangeDetails as OpenChangeDetails,
  DatePickerViewChangeDetails as ViewChangeDetails,
  DatePickerVisibleRangeChangeDetails as VisibleRangeChangeDetails,
} from '@ark-ui/react/date-picker'
