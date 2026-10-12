import { Button, Field, Heading, NativeSelect, PasswordInput, Text } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { hstack, vstack } from 'styled-system/patterns'

export function NativePasswordPreview() {
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState('demo-password')
  const [framework, setFramework] = useState('react')
  const [disabled, setDisabled] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  return (
    <section className={vstack({ alignItems: 'stretch', gap: '5', p: { base: '6', md: '10' } })}>
      <Heading size="xl">PasswordInput 与 NativeSelect</Heading>
      <Field.Root>
        <Field.Label>受控密码和可见状态</Field.Label>
        <PasswordInput
          ref={passwordRef}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          visible={visible}
          onVisibleChange={setVisible}
          autoComplete="new-password"
          rootProps={{ maxWidth: 'md' }}
        />
        <Field.HelperText>
          显示按钮可通过 Tab 和 Enter 操作；切换显示不应提交表单。
        </Field.HelperText>
      </Field.Root>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        <Button variant="outline" onClick={() => setVisible((value) => !value)}>
          {visible ? '隐藏密码' : '显示密码'}
        </Button>
        <Button variant="outline" onClick={() => passwordRef.current?.focus()}>
          通过 ref 聚焦密码
        </Button>
      </div>
      <Field.Root invalid>
        <Field.Label>默认可见、自定义图标与错误状态</Field.Label>
        <PasswordInput
          defaultVisible
          size="sm"
          variant="surface"
          visibilityIcon={{ on: '+', off: '−' }}
          defaultValue="example"
          autoComplete="new-password"
        />
        <Field.ErrorText>示例错误提示</Field.ErrorText>
      </Field.Root>
      <Field.Root disabled>
        <Field.Label>Field 禁用联动</Field.Label>
        <PasswordInput size="xs" placeholder="输入与显示按钮都应禁用" />
      </Field.Root>
      <PasswordInput
        aria-label="大尺寸密码输入"
        size="2xl"
        variant="subtle"
        placeholder="2xl 尺寸"
      />

      <Field.Root>
        <Field.Label>PasswordInput：自定尺寸与尾部预留</Field.Label>
        <PasswordInput
          size="unstyled"
          name="custom-password"
          height="64px"
          ps="6"
          paddingInlineEnd="72px"
          textStyle="lg"
          defaultValue="custom-password"
          autoComplete="new-password"
        />
        <Field.HelperText>
          点击眼睛并检查焦点；长密码不应被按钮遮挡。下面一项使用默认预留空间。
        </Field.HelperText>
        <PasswordInput
          size="unstyled"
          height="40px"
          ps="4"
          defaultValue="fallback-padding"
          autoComplete="new-password"
          aria-label="自动预留尾部空间的密码"
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          原生选择框
          <Field.RequiredIndicator />
        </Field.Label>
        <NativeSelect.Root size="md" disabled={disabled} maxWidth="md">
          <NativeSelect.Field
            ref={selectRef}
            placeholder="请选择框架"
            value={framework}
            onChange={(event) => setFramework(event.target.value)}
            name="framework">
            <optgroup label="框架">
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
            </optgroup>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.HelperText>当前值：{framework || '未选择'}</Field.HelperText>
      </Field.Root>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        <Button variant="outline" onClick={() => setDisabled((value) => !value)}>
          选择框：{disabled ? '已禁用' : '可用'}
        </Button>
        <Button variant="outline" disabled={disabled} onClick={() => selectRef.current?.focus()}>
          通过 ref 聚焦选择框
        </Button>
      </div>
      <Field.Root invalid disabled>
        <Field.Label>Field 错误与禁用联动</Field.Label>
        <NativeSelect.Root size="sm" variant="surface">
          <NativeSelect.Field defaultValue="" placeholder="请选择">
            <option value="one">选项一</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator>⌄</NativeSelect.Indicator>
        </NativeSelect.Root>
        <Field.ErrorText>示例错误提示</Field.ErrorText>
      </Field.Root>
      <NativeSelect.Root size="lg" variant="subtle" invalid>
        <NativeSelect.Field aria-label="根入口错误状态" placeholder="根入口 invalid">
          <option value="one">选项一</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Text>NativeSelect 保留原生 option / optgroup、表单提交和浏览器键盘行为。</Text>

      <Heading size="md">NativeSelect · 分维度定制</Heading>
      <NativeSelect.Root size="unstyled" maxWidth="md" textStyle="sm">
        <NativeSelect.Field
          height="36px"
          px="3"
          paddingInlineEnd="36px"
          aria-label="自定尺寸的原生选择">
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator width="36px" css={{ _icon: { boxSize: '4' } }} />
      </NativeSelect.Root>
      <NativeSelect.Root variant="unstyled" maxWidth="md">
        <NativeSelect.Field
          bg="gray.3"
          borderRadius="lg"
          focusVisibleRing="inside"
          aria-label="自定外观的原生选择">
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator color="lime.11" />
      </NativeSelect.Root>
    </section>
  )
}
