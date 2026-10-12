import { Button, RadioCard, RadioGroup, useRadioGroup } from '@newsnow/ui'
import { useRef } from 'react'
import { css } from 'styled-system/css'

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

export function RadioPreview() {
  const radio = useRadioGroup({ name: 'radio-card-store', defaultValue: 'basic' })
  const indicatorRef = useRef<HTMLSpanElement>(null)

  return (
    <section
      aria-labelledby="radio-api-heading"
      className={css({
        display: 'grid',
        gap: '6',
        padding: { base: '6', md: '10' },
        maxWidth: '3xl',
      })}>
      <h2 id="radio-api-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Radio 与 RadioCard API
      </h2>
      <p>
        ItemControl 是卡片内容容器；ItemIndicator 是独立标记。使用 Tab 与方向键检查选择和禁用状态。
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

      <RadioGroup.Root defaultValue="new" size="sm">
        <RadioGroup.Label>普通 Radio：新增 ItemIndicator，保留 ItemControl</RadioGroup.Label>
        <RadioGroup.Item value="new">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator ref={indicatorRef} />
          <RadioGroup.ItemText>Chakra 风格 ItemIndicator</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="existing">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>已有 ItemControl 用法</RadioGroup.ItemText>
        </RadioGroup.Item>
      </RadioGroup.Root>
      <div className={css({ display: 'grid', gap: '4' })}>
        <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
          RadioCard：尺寸与外观独立自定义
        </h3>{' '}
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
    </section>
  )
}
