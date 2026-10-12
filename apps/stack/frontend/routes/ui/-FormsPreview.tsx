import { Button, Field, Input, RadioGroup, Switch, Textarea } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function FormsPreview() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [frequency, setFrequency] = useState<string | null>('daily')
  const [submitted, setSubmitted] = useState('尚未读取')

  return (
    <section
      aria-labelledby="forms-heading"
      className={css({ display: 'grid', gap: '5', padding: { base: '6', md: '10' } })}>
      <h2 id="forms-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Input、Textarea、Switch、RadioGroup 验收
      </h2>
      <p>
        点击标签聚焦输入；Tab + 空格操作开关，方向键切换单选并跳过禁用项。读取表单仅展示本地数据。
      </p>
      <form
        className={css({ display: 'grid', gap: '5', maxWidth: 'xl' })}
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))))
        }}
        onReset={() => {
          setTitle('')
          setNote('')
          setEnabled(true)
          setFrequency('daily')
          setSubmitted('已重置')
        }}>
        <Field.Root>
          <Field.Label>标题</Field.Label>
          <Input
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="输入标题"
          />
          <Field.HelperText>独立 Input 也能继承 Field 的标签和描述。</Field.HelperText>
        </Field.Root>
        <Field.Root>
          <Field.Label>备注</Field.Label>
          <Textarea
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="输入多行备注"
            rows={4}
            maxLength={200}
            resize="vertical"
          />
          <Field.HelperText>{note.length} / 200 字符，可拖动调整高度。</Field.HelperText>
        </Field.Root>
        <Switch.Root
          name="notifications"
          value="enabled"
          checked={enabled}
          onCheckedChange={(details) => setEnabled(details.checked)}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>启用通知</Switch.Label>
        </Switch.Root>
        <RadioGroup.Root
          name="frequency"
          value={frequency}
          onValueChange={(details) => setFrequency(details.value)}
          size="md">
          <RadioGroup.Label>通知频率</RadioGroup.Label>
          <RadioGroup.Item value="immediate">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>立即通知</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="disabled" disabled>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>禁用选项</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="daily">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>每日摘要</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup.Root>
        <div className={css({ display: 'grid', gap: '4' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            按维度自定义：输入、开关与单选
          </h3>{' '}
          <Field.Root>
            <Field.Label>Input：仅自定尺寸</Field.Label>
            <Input
              size="unstyled"
              name="custom-title"
              height="60px"
              px="6"
              textStyle="lg"
              placeholder="60px 高度，保留 outline"
            />
          </Field.Root>
          <Field.Root invalid>
            <Field.Label>Input：仅自定外观，错误状态由页面提供</Field.Label>
            <Input
              variant="unstyled"
              name="custom-appearance"
              defaultValue="保留 md 尺寸"
              bg="gray.3"
              borderRadius="full"
              focusVisibleRing="outside"
              _invalid={{ outline: '2px solid', outlineColor: 'red.9' }}
            />
            <Field.ErrorText>示例错误：自定外观仍接收 Field 状态。</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Textarea：仅自定尺寸</Field.Label>
            <Textarea
              size="unstyled"
              name="custom-note"
              minHeight="120px"
              p="6"
              textStyle="lg"
              rows={3}
              placeholder="自定内边距和字号，保留 surface"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Textarea：仅自定外观</Field.Label>
            <Textarea
              variant="unstyled"
              rows={2}
              bg="gray.3"
              borderRadius="xl"
              focusVisibleRing="outside"
              placeholder="保留 md 内边距和字号"
            />
          </Field.Root>{' '}
          <Switch.Root size="unstyled" name="custom-switch" gap="4" defaultChecked>
            <Switch.HiddenInput />
            <Switch.Control width="72px" height="36px">
              <Switch.Thumb
                width="36px"
                height="36px"
                scale="0.8"
                _checked={{ translate: '36px 0', _rtl: { translate: '-36px 0' } }}
              />
            </Switch.Control>
            <Switch.Label textStyle="lg">自定开关尺寸和位移，保留 solid</Switch.Label>
          </Switch.Root>
          <RadioGroup.Root size="unstyled" name="custom-radio" defaultValue="daily" gap="4">
            <RadioGroup.Label>自定单选尺寸，方向键切换</RadioGroup.Label>
            {['daily', 'weekly'].map((value) => (
              <RadioGroup.Item key={value} value={value} gap="4">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator boxSize="32px" _after={{ boxSize: '12px' }} />
                <RadioGroup.ItemText textStyle="lg">
                  {value === 'daily' ? '每日' : '每周'}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </div>

        <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
          <Button type="submit">读取表单</Button>
          <Button type="reset" variant="outline">
            重置
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setEnabled(false)
              setFrequency('immediate')
            }}>
            外部关闭通知并切到立即通知
          </Button>
        </div>
        <p role="status">
          通知：{enabled ? '开启' : '关闭'}；频率：{frequency || '未选'}；表单：{submitted}
        </p>
      </form>

      <div className={css({ display: 'grid', gap: '3', maxWidth: 'xl' })}>
        <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>输入配方及禁用状态</h3>
        <p>Outline 背景透明，Surface 自带背景；使用对比背景展示两者差异。</p>
        <div
          className={css({
            display: 'grid',
            gap: '3',
            bg: 'gray.3',
            padding: '4',
            borderRadius: 'md',
          })}>
          <Input aria-label="Outline 输入" variant="outline" defaultValue="Outline：透明背景" />
          <Input aria-label="Surface 输入" variant="surface" defaultValue="Surface：填充背景" />
          <Input aria-label="Subtle 输入" variant="subtle" defaultValue="Subtle" />
          <Input aria-label="Flushed 输入" variant="flushed" defaultValue="Flushed" />
        </div>
        <Field.Root disabled>
          <Field.Label>禁用备注</Field.Label>
          <Textarea defaultValue="从 Field 继承禁用状态" rows={2} variant="subtle" />
        </Field.Root>
        <Switch.Root size="sm" defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>小尺寸非受控开关</Switch.Label>
        </Switch.Root>
        <Switch.Root size="lg" disabled defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>大尺寸禁用开关</Switch.Label>
        </Switch.Root>
      </div>
    </section>
  )
}
