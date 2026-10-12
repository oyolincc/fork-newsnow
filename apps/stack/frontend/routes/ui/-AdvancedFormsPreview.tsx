import {
  Button,
  Field,
  NumberInput,
  PinInput,
  RatingGroup,
  SegmentGroup,
  Slider,
} from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function AdvancedFormsPreview() {
  const [quantity, setQuantity] = useState('5')
  const [pin, setPin] = useState(['', '', '', ''])
  const [completed, setCompleted] = useState(false)
  const [range, setRange] = useState([25, 75])
  const [rating, setRating] = useState(3.5)
  const [period, setPeriod] = useState<string | null>('week')
  const [submission, setSubmission] = useState('尚未提交')
  const numberInput = NumberInput.useNumberInput({
    name: 'quantity',
    min: 0,
    max: 20,
    step: 1,
    value: quantity,
    onValueChange: ({ value }) => setQuantity(value),
  })
  const slider = Slider.useSlider({
    name: 'range',
    value: range,
    min: 0,
    max: 100,
    step: 5,
    minStepsBetweenThumbs: 1,
    'aria-label': ['范围下限', '范围上限'],
    onValueChange: ({ value }) => setRange(value),
  })

  return (
    <section
      aria-labelledby="advanced-forms-heading"
      className={css({ display: 'grid', gap: '6', padding: { base: '6', md: '10' } })}>
      <h2 id="advanced-forms-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        NumberInput、PinInput、Slider、RatingGroup、SegmentGroup
      </h2>
      <form
        className={css({ display: 'grid', gap: '6', maxWidth: '2xl' })}
        onSubmit={(event) => {
          event.preventDefault()
          setSubmission(JSON.stringify(Array.from(new FormData(event.currentTarget).entries())))
        }}>
        <div className={css({ display: 'grid', gap: '3', maxWidth: 'sm' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>数值与边界</h3>
          <Field.Root>
            <Field.Label htmlFor="advanced-quantity">数量（0–20）</Field.Label>
            <NumberInput.RootProvider value={numberInput} size="lg" variant="outline">
              <NumberInput.Input id="advanced-quantity" aria-describedby="advanced-quantity-help" />
              <NumberInput.Control />
            </NumberInput.RootProvider>
            <Field.HelperText id="advanced-quantity-help">
              支持输入、上下键和步进按钮；空值保留为空字符串。
            </Field.HelperText>
          </Field.Root>
          <NumberInput.Root defaultValue="10" disabled size="sm">
            <NumberInput.Input aria-label="禁用的数值输入" />
            <NumberInput.Control />
          </NumberInput.Root>
          <p role="status">数量：{quantity === '' ? '空值' : quantity}</p>
        </div>

        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>验证码输入</h3>
          <PinInput.Root
            name="pin"
            count={4}
            otp
            value={pin}
            onValueChange={({ value }) => {
              setPin(value)
              setCompleted(value.length === 4 && value.every((character) => character !== ''))
            }}
            onValueComplete={() => setCompleted(true)}>
            <PinInput.Label>四位数字</PinInput.Label>
            <PinInput.Control>
              {[0, 1, 2, 3].map((index) => (
                <PinInput.Input key={index} index={index} />
              ))}
            </PinInput.Control>
            <PinInput.HiddenInput />
          </PinInput.Root>
          <PinInput.Root count={4} mask defaultValue={['1', '2', '3', '4']} size="sm" readOnly>
            <PinInput.Label>只读遮罩示例</PinInput.Label>
            <PinInput.Control>
              {[0, 1, 2, 3].map((index) => (
                <PinInput.Input key={index} index={index} />
              ))}
            </PinInput.Control>
          </PinInput.Root>
          <p role="status">{completed ? '输入完成' : '等待输入'}；仅展示本地状态，不发送验证码。</p>
        </div>

        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>范围滑块与刻度</h3>
          <Slider.RootProvider value={slider} size="md">
            <Slider.Label>数值范围</Slider.Label>
            <Slider.ValueText />
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
              <Slider.Marks
                marks={[
                  { value: 0, label: '0' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
              />
            </Slider.Control>
          </Slider.RootProvider>
          <Slider.Root defaultValue={[40]} disabled aria-label={['禁用的滑块']}>
            <Slider.Label>禁用滑块</Slider.Label>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
          <Slider.Root
            orientation="vertical"
            defaultValue={[60]}
            height="56"
            width="16"
            aria-label={['垂直滑块']}>
            <Slider.Label>垂直</Slider.Label>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
          <p role="status">范围：{range.join(' – ')}</p>
        </div>

        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>评分与半星</h3>
          <RatingGroup.Root
            name="rating"
            count={5}
            allowHalf
            value={rating}
            onValueChange={({ value }) => setRating(value)}>
            <RatingGroup.Label>体验评分</RatingGroup.Label>
            <RatingGroup.Control />
            <RatingGroup.HiddenInput />
          </RatingGroup.Root>
          <RatingGroup.Root defaultValue={4} readOnly size="sm">
            <RatingGroup.Label>只读评分</RatingGroup.Label>
            <RatingGroup.Control />
          </RatingGroup.Root>
          <p role="status">当前评分：{rating}</p>
        </div>

        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>分段单选</h3>
          <SegmentGroup.Root
            name="period"
            value={period}
            onValueChange={({ value }) => setPeriod(value)}
            fitted>
            <SegmentGroup.Label className={css({ srOnly: true })}>统计周期</SegmentGroup.Label>
            <SegmentGroup.Indicator />
            <SegmentGroup.Items
              items={[
                { value: 'day', label: '每日' },
                { value: 'week', label: '每周' },
                { value: 'month', label: '每月' },
                { value: 'year', label: '每年（禁用）', disabled: true },
              ]}
            />
          </SegmentGroup.Root>
          <SegmentGroup.Root orientation="vertical" defaultValue="list" width="40" size="sm">
            <SegmentGroup.Label className={css({ srOnly: true })}>显示方式</SegmentGroup.Label>
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={['list', 'grid']} />
          </SegmentGroup.Root>
          <p role="status">周期：{period || '未选择'}</p>
        </div>

        <div className={css({ display: 'grid', gap: '4' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            评分、分段与滑块：自定尺寸
          </h3>{' '}
          <RatingGroup.Root
            size="unstyled"
            name="custom-rating"
            defaultValue={3.5}
            allowHalf
            gap="4">
            <RatingGroup.Label>32px 半星评分</RatingGroup.Label>
            <RatingGroup.Control gap="3">
              {[1, 2, 3, 4, 5].map((index) => (
                <RatingGroup.Item key={index} index={index}>
                  <RatingGroup.ItemIndicator width="32px" height="32px" />
                </RatingGroup.Item>
              ))}
            </RatingGroup.Control>
            <RatingGroup.HiddenInput />
          </RatingGroup.Root>
          <SegmentGroup.Root size="unstyled" name="custom-period" defaultValue="week" fitted>
            <SegmentGroup.Label className={css({ srOnly: true })}>自定分段尺寸</SegmentGroup.Label>
            <SegmentGroup.Indicator />
            <SegmentGroup.Items
              h="56px"
              px="6"
              gap="4"
              textStyle="lg"
              items={[
                { value: 'day', label: '每日' },
                { value: 'week', label: '每周' },
              ]}
            />
          </SegmentGroup.Root>
          <Slider.Root
            size="unstyled"
            name="custom-slider"
            defaultValue={[40]}
            gap="3"
            aria-label={['自定尺寸滑块']}>
            <Slider.Label>28px 滑块与 12px 轨道</Slider.Label>
            <Slider.ValueText />
            <Slider.Control minHeight="28px" mb="8">
              <Slider.Track height="12px">
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0} width="28px" height="28px">
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.MarkerGroup top="8px" insetInline="0">
                {[0, 50, 100].map((value) => (
                  <Slider.Marker
                    key={value}
                    value={value}
                    flexDirection="column"
                    gap="4"
                    textStyle="sm">
                    <Slider.MarkerIndicator boxSize="6px" />
                    <span>{value}</span>
                  </Slider.Marker>
                ))}
              </Slider.MarkerGroup>
            </Slider.Control>
          </Slider.Root>
        </div>

        <div className={css({ display: 'grid', gap: '3', maxWidth: 'sm' })}>
          <h3>NumberInput / PinInput · 分维度定制</h3>
          <NumberInput.Root
            size="unstyled"
            name="compact-quantity"
            defaultValue="3"
            min={0}
            gap="1.5"
            css={{
              '& [data-part=control]': { width: '20px' },
              '& [data-part=increment-trigger], & [data-part=decrement-trigger]': {
                lineHeight: '1',
                _icon: { boxSize: '3' },
              },
            }}>
            <NumberInput.Label textStyle="sm">自定尺寸的数量</NumberInput.Label>
            <NumberInput.Input height="36px" px="3" paddingInlineEnd="28px" textStyle="sm" />
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Root variant="unstyled" name="custom-quantity" defaultValue="2" min={0}>
            <NumberInput.Label>自定外观，保留 md 尺寸</NumberInput.Label>
            <NumberInput.Input bg="gray.3" borderRadius="lg" focusVisibleRing="inside" />
            <NumberInput.Control height="full" bg="lime.3" borderRadius="md" />
          </NumberInput.Root>
          <PinInput.Root size="unstyled" name="compact-pin" count={4} gap="1.5">
            <PinInput.Label>自定尺寸的验证码</PinInput.Label>
            <PinInput.Control gap="1.5">
              {[0, 1, 2, 3].map((index) => (
                <PinInput.Input
                  key={index}
                  index={index}
                  width="36px"
                  height="36px"
                  textStyle="sm"
                />
              ))}
            </PinInput.Control>
            <PinInput.HiddenInput />
          </PinInput.Root>
          <PinInput.Root variant="unstyled" count={4} defaultValue={['1', '2', '3', '4']}>
            <PinInput.Label>自定外观的验证码</PinInput.Label>
            <PinInput.Control>
              {[0, 1, 2, 3].map((index) => (
                <PinInput.Input
                  key={index}
                  index={index}
                  bg="lime.3"
                  borderRadius="lg"
                  focusVisibleRing="inside"
                />
              ))}
            </PinInput.Control>
          </PinInput.Root>
        </div>
        <Button type="submit">读取本地 FormData</Button>
        <pre
          className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', textStyle: 'sm' })}
          role="status">
          {submission}
        </pre>
      </form>
    </section>
  )
}
