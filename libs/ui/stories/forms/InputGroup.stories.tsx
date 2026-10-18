import { Field, Group, Input, InputAddon, InputGroup } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  args: { children: null },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '输入前后装饰、附加文本及尺寸和外观定制。' },
    },
  },
} satisfies Meta<typeof InputGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '4' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            输入组合：自定尺寸与外观
          </h3>
          <Field.Root>
            <Field.Label>InputGroup：组合双方分别退出尺寸</Field.Label>
            <InputGroup
              size="unstyled"
              startElement={<span aria-hidden="true">＠</span>}
              startElementProps={{ minWidth: '56px' }}>
              <Input
                size="unstyled"
                name="custom-handle"
                height="60px"
                ps="64px"
                paddingInlineEnd="4"
                textStyle="lg"
                placeholder="前缀宽度由页面定义"
              />
            </InputGroup>
          </Field.Root>
          <Field.Root>
            <Field.Label>InputAddon：自定尺寸</Field.Label>
            <Group attached width="full">
              <InputAddon size="unstyled" px="6" textStyle="lg">
                https://
              </InputAddon>
              <Input
                size="unstyled"
                height="60px"
                px="4"
                textStyle="lg"
                placeholder="example.com"
              />
            </Group>
          </Field.Root>
          <Field.Root>
            <Field.Label>InputAddon 与 Input：自定外观，保留 md 尺寸</Field.Label>
            <Group attached width="full">
              <InputAddon variant="unstyled" bg="gray.12" color="gray.1">
                https://
              </InputAddon>
              <Input
                variant="unstyled"
                bg="gray.3"
                focusVisibleRing="inside"
                placeholder="example.com"
              />
            </Group>
          </Field.Root>
        </div>
      </div>
    )
  },
}
