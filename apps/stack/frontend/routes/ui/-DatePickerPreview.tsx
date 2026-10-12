import {
  Button,
  DatePicker,
  Heading,
  Portal,
  parseDate,
  useDatePicker,
  type DateValue,
} from '@newsnow/ui'
import { useRef, useState } from 'react'
import { hstack, vstack } from 'styled-system/patterns'

const referenceDate = parseDate('2026-10-13')

function CalendarViews({
  months = 1,
  selectors = false,
}: {
  months?: number
  selectors?: boolean
}) {
  return (
    <>
      <DatePicker.View view="day">
        <DatePicker.Header />
        {selectors && (
          <div className={hstack({ gap: '2' })}>
            <DatePicker.MonthSelect aria-label="月份" />
            <DatePicker.YearSelect aria-label="年份" />
          </div>
        )}
        <div className={hstack({ alignItems: 'start', gap: '4', flexWrap: 'wrap' })}>
          {Array.from({ length: months }, (_, offset) => (
            <DatePicker.DayTable key={offset} offset={offset} />
          ))}
        </div>
      </DatePicker.View>
      <DatePicker.View view="month">
        <DatePicker.Header />
        <DatePicker.MonthTable />
      </DatePicker.View>
      <DatePicker.View view="year">
        <DatePicker.Header />
        <DatePicker.YearTable />
      </DatePicker.View>
    </>
  )
}

function SingleDateDemo() {
  const [value, setValue] = useState<DateValue[]>([referenceDate])
  const [disabled, setDisabled] = useState(false)
  const [submitted, setSubmitted] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        <Button variant="outline" onClick={() => inputRef.current?.focus()}>
          通过 ref 聚焦输入
        </Button>
        <Button variant="outline" onClick={() => setDisabled(!disabled)} aria-pressed={disabled}>
          {disabled ? '启用' : '禁用'}
        </Button>
        <Button variant="plain" onClick={() => setValue([referenceDate])}>
          外部重置日期
        </Button>
      </div>
      <form
        className={vstack({ gap: '3', alignItems: 'start' })}
        onSubmit={(event) => {
          event.preventDefault()
          const date = new FormData(event.currentTarget).get('appointment')
          setSubmitted(typeof date === 'string' ? date : '')
        }}>
        <DatePicker.Root
          lazyMount
          value={value}
          onValueChange={({ value }) => setValue(value)}
          disabled={disabled}
          locale="zh-CN"
          name="appointment"
          defaultFocusedValue={referenceDate}
          width="72"
          min={parseDate('2026-10-01')}
          max={parseDate('2026-12-31')}
          positioning={{ placement: 'bottom-start' }}>
          <DatePicker.Label>受控日期 · 2026 年 10—12 月可选</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input ref={inputRef} aria-label="预约日期" />
            <DatePicker.IndicatorGroup>
              <DatePicker.ClearTrigger aria-label="清空日期" />
              <DatePicker.Trigger aria-label="打开日历" />
            </DatePicker.IndicatorGroup>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content aria-label="日期选择面板">
                <CalendarViews selectors />
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.Root>
        <Button type="submit" disabled={disabled}>
          读取表单日期（不发送请求）
        </Button>
      </form>
      <p role="status">
        已选择：{value.map((date) => date.toString()).join('、') || '无'}；表单值：
        {submitted || '尚未读取'}
      </p>
    </>
  )
}
function RangeDateDemo() {
  const [range, setRange] = useState<DateValue[]>([referenceDate, referenceDate.add({ days: 4 })])
  return (
    <>
      <Heading size="md">双月范围 · 预设范围 · 240px 窄容器</Heading>
      <DatePicker.Root
        lazyMount
        selectionMode="range"
        numOfMonths={2}
        value={range}
        onValueChange={({ value }) => setRange(value)}
        locale="zh-CN"
        defaultFocusedValue={referenceDate}
        size="sm"
        variant="subtle"
        width="full"
        maxWidth="240px">
        <DatePicker.Label>日期范围</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input index={0} aria-label="起始日期" />
          <DatePicker.Input index={1} aria-label="结束日期" />
          <DatePicker.Trigger aria-label="打开范围日历" />
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content width="auto" aria-label="范围选择面板">
              <CalendarViews months={2} />
              <DatePicker.PresetTrigger value={[referenceDate, referenceDate.add({ days: 6 })]}>
                选择示例的一周
              </DatePicker.PresetTrigger>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
        <DatePicker.ValueText placeholder="尚未选择范围" separator=" → " />
      </DatePicker.Root>
    </>
  )
}
function InlineDateDemo() {
  const store = useDatePicker({
    inline: true,
    locale: 'zh-CN',
    selectionMode: 'multiple',
    showWeekNumbers: true,
    defaultFocusedValue: referenceDate,
    defaultValue: [referenceDate, referenceDate.add({ days: 2 })],
  })
  return (
    <>
      <Heading size="md">内联多选 · 周数 · RootProvider</Heading>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        <Button variant="outline" onClick={() => store.setValue([])}>
          通过 store 清空
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            store.setFocusedValue(referenceDate)
            store.setView('day')
          }}>
          通过 store 返回示例月份
        </Button>
      </div>
      <DatePicker.RootProvider value={store} size="xs" hideOutsideDays width="80">
        <DatePicker.Label>多选日历</DatePicker.Label>
        <CalendarViews />
        <DatePicker.ValueText placeholder="选择任意多个日期">
          {({ valueAsString, remove }) => (
            <Button key={valueAsString} variant="outline" size="xs" onClick={remove}>
              {valueAsString} ×
            </Button>
          )}
        </DatePicker.ValueText>
      </DatePicker.RootProvider>
    </>
  )
}
export function DatePickerPreview() {
  return (
    <section className={vstack({ alignItems: 'stretch', gap: '6', p: { base: '6', md: '10' } })}>
      <Heading size="xl">DatePicker / 内联日历</Heading>
      <p>点击月份标题切换到月份、年份视图；日历中可用方向键导航，Enter 选择日期。</p>
      <SingleDateDemo />
      <RangeDateDemo />
      <InlineDateDemo />
      <Heading size="md">便捷 Value · 只读</Heading>
      <DatePicker.Root readOnly defaultValue={[referenceDate]} locale="zh-CN" size="lg" width="72">
        <DatePicker.Label>只读日期</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input aria-label="只读日期" />
          <DatePicker.Trigger aria-label="只读日历" />
        </DatePicker.Control>
      </DatePicker.Root>
      <DatePicker.Root lazyMount defaultFocusedValue={referenceDate} locale="zh-CN" width="72">
        <DatePicker.Value placeholder="选择一个日期" />
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content aria-label="便捷日期面板">
              <CalendarViews />
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>

      <Heading size="md">分维度定制 · 紧凑日历</Heading>
      <DatePicker.Root
        size="unstyled"
        inline
        locale="zh-CN"
        defaultFocusedValue={referenceDate}
        defaultValue={[referenceDate]}
        width="64"
        gap="2"
        css={{
          '& [data-part=view]': { gap: '2' },
          '& [data-part=view-control]': { height: '28px', gap: '2' },
          '& [data-part=prev-trigger], & [data-part=next-trigger], & [data-part=view-trigger]': {
            boxSize: '28px',
            _icon: { boxSize: '3.5' },
          },
          '& [data-part=view-trigger]': { width: 'auto', textStyle: 'sm', px: '2' },
          '& [data-part=table-header]': { width: '32px', py: '1', textStyle: 'xs' },
          '& [data-part=table-cell]': { py: '0.5' },
          '& [data-part=table-cell-trigger]': {
            minWidth: '32px',
            minHeight: '32px',
            textStyle: 'sm',
          },
        }}>
        <DatePicker.Label textStyle="sm">自定尺寸，保留选中与范围外观</DatePicker.Label>
        <CalendarViews />
      </DatePicker.Root>
      <DatePicker.Root
        variant="unstyled"
        inline
        locale="zh-CN"
        defaultFocusedValue={referenceDate}
        defaultValue={[referenceDate]}
        width="72"
        css={{
          '& [data-part=table-cell-trigger]': {
            borderRadius: 'full',
            cursor: 'pointer',
            focusVisibleRing: 'inside',
            _hover: { bg: 'gray.3' },
            '&[data-selected]': { bg: 'lime.9', color: 'gray.1' },
            '&[data-outside-range]': { color: 'gray.8' },
          },
          '& [data-part=prev-trigger], & [data-part=next-trigger], & [data-part=view-trigger]': {
            borderRadius: 'md',
            cursor: 'pointer',
            focusVisibleRing: 'inside',
            _hover: { bg: 'gray.3' },
          },
        }}>
        <DatePicker.Label>自定外观，保留 md 尺寸</DatePicker.Label>
        <CalendarViews />
      </DatePicker.Root>
    </section>
  )
}
