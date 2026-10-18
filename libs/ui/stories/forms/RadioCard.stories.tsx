import { Button, RadioCard, useRadioGroup } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const plans = [
  { value: 'basic', label: '基础版', description: '适合个人使用', addon: '免费', disabled: false },
  {
    value: 'team',
    label: '团队版',
    description: '支持共享配置与团队管理',
    addon: '每月 ¥99',
    disabled: false,
  },
  {
    value: 'enterprise',
    label: '企业版',
    description: '即将开放',
    addon: '暂不可选',
    disabled: true,
  },
]
const meta = {
  title: 'Forms/RadioCard',
  component: RadioCard.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '卡片单选、附加区域、只读与外部 store。' },
    },
  },
} satisfies Meta<typeof RadioCard.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [plan, setPlan] = useState<string | null>('standard')

    const [submittedForm, setSubmittedForm] = useState('尚未提交')
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            setSubmittedForm(
              JSON.stringify(Array.from(new FormData(event.currentTarget).entries())),
            )
          }}
          onReset={() => {
            setPlan('standard')
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>卡片式单选</h3>
            <RadioCard.Root
              name="plan"
              value={plan}
              onValueChange={({ value }) => setPlan(value)}
              variant="subtle">
              <RadioCard.Label>选择套餐</RadioCard.Label>
              <RadioCard.Item value="standard">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>标准版</RadioCard.ItemText>
                    <RadioCard.ItemDescription>适合个人使用</RadioCard.ItemDescription>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
              <RadioCard.Item value="professional">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>专业版</RadioCard.ItemText>
                    <RadioCard.ItemDescription>适合团队协作</RadioCard.ItemDescription>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
                <RadioCard.ItemAddon>包含团队管理与共享配置</RadioCard.ItemAddon>
              </RadioCard.Item>
              <RadioCard.Item value="unavailable" disabled>
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>暂不可选（禁用）</RadioCard.ItemText>
                    <RadioCard.ItemDescription>即将开放</RadioCard.ItemDescription>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </RadioCard.Root>
            <RadioCard.Root defaultValue="selected" variant="solid" readOnly>
              <RadioCard.Label>Solid 只读配方</RadioCard.Label>
              <RadioCard.Item value="selected">
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>已选项</RadioCard.ItemText>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </RadioCard.Root>
            <p role="status">套餐：{plan || '未选择'}</p>
          </div>
          <div className={css({ display: 'flex', gap: '3' })}>
            <Button type="submit">读取本地 FormData</Button>
            <Button type="reset" variant="outline">
              重置
            </Button>
          </div>
          <pre role="status" className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' })}>
            {submittedForm}
          </pre>
        </form>
      </div>
    )
  },
}
export const Store: Story = {
  render: function Store() {
    const radio = useRadioGroup({ name: 'radio-card-store', defaultValue: 'basic' })

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>
          ItemControl 是卡片内容容器；ItemIndicator 是独立标记。使用 Tab
          与方向键检查选择和禁用状态。
        </p>

        <RadioCard.RootProvider value={radio} variant="surface" size="sm">
          <RadioCard.Label>小尺寸 Surface：内容、描述与附加区</RadioCard.Label>
          {plans.map((plan) => (
            <RadioCard.Item key={plan.value} value={plan.value} disabled={plan.disabled}>
              <RadioCard.ItemHiddenInput aria-describedby={`radio-api-${plan.value}-description`} />
              <RadioCard.ItemControl>
                <RadioCard.ItemContent>
                  <RadioCard.ItemText>{plan.label}</RadioCard.ItemText>
                  <RadioCard.ItemDescription id={`radio-api-${plan.value}-description`}>
                    {plan.description}
                  </RadioCard.ItemDescription>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
              <RadioCard.ItemAddon>{plan.addon}</RadioCard.ItemAddon>
            </RadioCard.Item>
          ))}
        </RadioCard.RootProvider>
        <div className={css({ display: 'flex', gap: '2', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => radio.setValue('team')}>
            通过 store 选择团队版
          </Button>
          <Button variant="outline" onClick={() => radio.setValue('basic')}>
            恢复基础版
          </Button>
        </div>
        <p role="status">当前值：{radio.value || '未选择'}</p>
      </div>
    )
  },
}
export const States: Story = {
  render: function States() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <RadioCard.Root
          defaultValue="centered"
          variant="outline"
          size="lg"
          orientation="vertical"
          align="center"
          justify="center">
          <RadioCard.Label>大尺寸 Outline：纵向居中与自定义选中图标</RadioCard.Label>
          <RadioCard.Item value="centered">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemIndicator checked={<span>✓</span>} />
              <RadioCard.ItemContent>
                <RadioCard.ItemText>纵向展示</RadioCard.ItemText>
                <RadioCard.ItemDescription>orientation 控制卡片内部布局</RadioCard.ItemDescription>
              </RadioCard.ItemContent>
            </RadioCard.ItemControl>
          </RadioCard.Item>
          <RadioCard.Item value="alternative">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemIndicator checked={<span>✓</span>} />
              <RadioCard.ItemContent>
                <RadioCard.ItemText>另一个选项</RadioCard.ItemText>
                <RadioCard.ItemDescription>未选中时使用默认空心标记</RadioCard.ItemDescription>
              </RadioCard.ItemContent>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        </RadioCard.Root>

        <RadioCard.Root defaultValue="readonly" variant="solid" size="md" readOnly>
          <RadioCard.Label>Solid：只读、自定义 children 与 asChild</RadioCard.Label>
          <RadioCard.Item value="readonly">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <RadioCard.ItemText>只读选项</RadioCard.ItemText>
                <RadioCard.ItemDescription>文字颜色继承选中卡片的前景色</RadioCard.ItemDescription>
              </RadioCard.ItemContent>
              <RadioCard.ItemIndicator asChild>
                <span>✓</span>
              </RadioCard.ItemIndicator>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '4' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            RadioCard：尺寸与外观独立自定义
          </h3>
          <RadioCard.Root size="unstyled" name="custom-card-size" defaultValue="custom" gap="4">
            <RadioCard.Label textStyle="lg">RadioCard：自定尺寸，保留 outline</RadioCard.Label>
            <RadioCard.Item value="custom">
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl p="6" gap="4">
                <RadioCard.ItemContent gap="2">
                  <RadioCard.ItemText textStyle="xl">活动套餐</RadioCard.ItemText>
                  <RadioCard.ItemDescription textStyle="md">
                    内容、描述和附加区都由页面定义尺寸。
                  </RadioCard.ItemDescription>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator boxSize="32px" _after={{ boxSize: '12px' }} />
              </RadioCard.ItemControl>
              <RadioCard.ItemAddon px="6" py="3">
                附加说明
              </RadioCard.ItemAddon>
            </RadioCard.Item>
          </RadioCard.Root>
          <RadioCard.Root variant="unstyled" name="custom-card-appearance" defaultValue="brand">
            <RadioCard.Label>RadioCard：自定外观，保留 md 尺寸与默认对齐</RadioCard.Label>
            <RadioCard.Item
              value="brand"
              bg="gray.3"
              borderRadius="xl"
              _checked={{ bg: 'lime.3' }}
              focusVisibleRing="outside">
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemContent>
                  <RadioCard.ItemText>品牌卡片</RadioCard.ItemText>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator checked={<span>✓</span>} />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          </RadioCard.Root>
        </div>
      </div>
    )
  },
}
