import { Button, Checkbox, CheckboxGroup, Field } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

const channels = ['邮件', '站内通知']

export function CheckboxPreview() {
  const [selected, setSelected] = useState(['邮件'])
  const [accepted, setAccepted] = useState(false)
  const [validated, setValidated] = useState(false)
  const [submitted, setSubmitted] = useState('尚未提交')
  const allChecked = selected.length === channels.length
  const checked: Checkbox.CheckedState = allChecked
    ? true
    : selected.length > 0
      ? 'indeterminate'
      : false

  return (
    <section
      aria-labelledby="checkbox-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <h2 id="checkbox-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Checkbox 验收
      </h2>
      <p>点击文字或使用 Tab + 空格切换。通知全选应随子项显示未选、半选、全选。</p>
      <form
        noValidate
        className={css({ display: 'grid', gap: '4', maxWidth: 'md' })}
        onReset={() => {
          setSelected(['邮件'])
          setAccepted(false)
          setValidated(false)
          setSubmitted('尚未提交')
        }}
        onSubmit={(event) => {
          event.preventDefault()
          setValidated(true)
          if (!accepted) {
            setSubmitted('请先同意使用条款')
            const input = event.currentTarget.elements.namedItem('terms')
            if (input instanceof HTMLInputElement) input.focus()
            return
          }
          const data = new FormData(event.currentTarget)
          setSubmitted(
            JSON.stringify({
              channels: data.getAll('channels'),
              terms: data.get('terms'),
              digest: data.get('digest'),
              disabled: data.get('disabled'),
              customSize: data.get('custom-checkbox-size'),
              customAppearance: data.get('custom-checkbox-appearance'),
            }),
          )
        }}>
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(details) => setSelected(details.checked === true ? [...channels] : [])}>
          <Checkbox.Control>
            <Checkbox.Indicator
              checked={
                <svg>
                  <path d="M5 12l4 4L19 6" />
                </svg>
              }
              indeterminate={
                <svg>
                  <circle cx="12" cy="12" r="4" />
                </svg>
              }
            />
          </Checkbox.Control>
          <Checkbox.Label>全部通知渠道</Checkbox.Label>
          <Checkbox.HiddenInput />
          <Checkbox.Context>
            {(api) => <span>（{api.indeterminate ? '半选' : api.checked ? '全选' : '未选'}）</span>}
          </Checkbox.Context>
        </Checkbox.Root>
        <CheckboxGroup
          name="channels"
          value={selected}
          onValueChange={setSelected}
          className={css({ display: 'grid', gap: '3', pl: '8' })}>
          {channels.map((channel) => (
            <Checkbox.Root key={channel} value={channel} variant="outline" size="sm">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>{channel}</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          ))}
        </CheckboxGroup>
        <p role="status">通知渠道：{selected.join('、') || '无'}</p>

        <Field.Root required invalid={validated && !accepted}>
          <Checkbox.Root
            name="terms"
            value="accepted"
            checked={accepted}
            onCheckedChange={(details) => setAccepted(details.checked === true)}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>
              同意使用条款 <Field.RequiredIndicator>（必选）</Field.RequiredIndicator>
            </Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <Field.HelperText>验证状态由 Field.Root 提供。</Field.HelperText>
          <Field.ErrorText>请先同意使用条款。</Field.ErrorText>
        </Field.Root>

        <Checkbox.Root name="digest" value="enabled" defaultChecked variant="surface" size="lg">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>每日摘要（非受控，默认选中）</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
        <Field.Root disabled>
          <Checkbox.Root name="disabled" defaultChecked>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>禁用选项（不参与提交）</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        </Field.Root>
        <Checkbox.Root defaultChecked>
          <Checkbox.Control>
            <Checkbox.Indicator>
              <circle cx="12" cy="12" r="6" />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>自定义 SVG 内容</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
        <Checkbox.Root defaultChecked>
          <Checkbox.Control>
            <Checkbox.Indicator asChild>
              <svg aria-hidden="true">
                <path d="M5 12l4 4L19 6" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>asChild 自定义图标</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
        <div className={css({ display: 'grid', gap: '4' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            复选框：尺寸与外观独立自定义
          </h3>{' '}
          <Checkbox.Root
            size="unstyled"
            name="custom-checkbox-size"
            value="yes"
            gap="4"
            defaultChecked>
            <Checkbox.Control boxSize="32px" _icon={{ boxSize: '24px' }}>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label textStyle="lg">自定 32px 复选框，保留 solid</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <Checkbox.Root
            variant="unstyled"
            name="custom-checkbox-appearance"
            value="yes"
            defaultChecked>
            <Checkbox.Control
              borderWidth="2px"
              borderColor="gray.8"
              borderRadius="full"
              focusVisibleRing="outside"
              _checked={{ bg: 'lime.9', color: 'black' }}>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>自定圆形外观，保留 md 尺寸</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        </div>

        <div className={css({ display: 'flex', gap: '3' })}>
          <Button colorPalette="lime" type="submit">
            提交 Checkbox 表单
          </Button>
          <Button type="reset" variant="outline">
            重置 Checkbox 表单
          </Button>
        </div>
        <p role="status">Checkbox 提交结果：{submitted}</p>
      </form>
    </section>
  )
}
