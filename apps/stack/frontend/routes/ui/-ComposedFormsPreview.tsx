import {
  Button,
  Editable,
  Field,
  Fieldset,
  Group,
  Input,
  InputAddon,
  InputGroup,
  RadioCard,
  TagsInput,
} from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function ComposedFormsPreview() {
  const [title, setTitle] = useState('可编辑的标题')
  const [savedTitle, setSavedTitle] = useState(title)
  const [tags, setTags] = useState(['Ark UI', 'Panda CSS'])
  const [plan, setPlan] = useState<string | null>('standard')
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [submission, setSubmission] = useState('尚未提交')
  const editable = Editable.useEditable({
    value: title,
    onValueChange: ({ value }) => setTitle(value),
    onValueCommit: ({ value }) => setSavedTitle(value),
    activationMode: 'none',
    submitMode: 'enter',
  })

  return (
    <section
      aria-labelledby="composed-forms-heading"
      className={css({ display: 'grid', gap: '6', padding: { base: '6', md: '10' } })}>
      <h2 id="composed-forms-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Editable、TagsInput、RadioCard、Fieldset 与输入组合
      </h2>
      <div className={css({ display: 'grid', gap: '3', maxWidth: 'xl' })}>
        <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>提交与取消编辑</h3>
        <Editable.RootProvider value={editable} size="md">
          <Editable.Label className={css({ srOnly: true })}>标题</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            <Editable.Context>
              {(context) =>
                context.editing ? (
                  <>
                    <Editable.SubmitTrigger asChild>
                      <Button size="sm">保存</Button>
                    </Editable.SubmitTrigger>
                    <Editable.CancelTrigger asChild>
                      <Button size="sm" variant="outline">
                        取消
                      </Button>
                    </Editable.CancelTrigger>
                  </>
                ) : (
                  <Editable.EditTrigger asChild>
                    <Button size="sm" variant="outline">
                      编辑
                    </Button>
                  </Editable.EditTrigger>
                )
              }
            </Editable.Context>
          </Editable.Control>
        </Editable.RootProvider>
        <p role="status">最后提交：{savedTitle}；Enter 保存，Escape 取消。</p>
        <Editable.Root defaultValue="只读文本" readOnly size="sm">
          <Editable.Label className={css({ srOnly: true })}>只读标题</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
        </Editable.Root>
      </div>

      <form
        className={css({ display: 'grid', gap: '6', maxWidth: '2xl' })}
        onSubmit={(event) => {
          event.preventDefault()
          setSubmission(JSON.stringify(Array.from(new FormData(event.currentTarget).entries())))
        }}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>标签输入</h3>
          <TagsInput.Root
            name="tags"
            value={tags}
            onValueChange={({ value }) => setTags(value)}
            max={5}
            editable
            variant="outline"
            size="md">
            <TagsInput.Label>技术标签（最多五个）</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="输入后按 Enter" />
              <TagsInput.ClearTrigger aria-label="清空技术标签" />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
          <TagsInput.Root defaultValue={['只读标签']} readOnly variant="subtle" size="sm">
            <TagsInput.Label>只读状态</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input />
            </TagsInput.Control>
          </TagsInput.Root>
          <TagsInput.Root variant="subtle" invalid={invalid} defaultValue={['Subtle']}>
            <TagsInput.Label>错误状态对照 · subtle</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="聚焦检查错误边框" />
            </TagsInput.Control>
          </TagsInput.Root>
          <TagsInput.Root variant="surface" invalid={invalid} defaultValue={['Surface']}>
            <TagsInput.Label>错误状态对照 · surface</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="聚焦检查错误边框" />
            </TagsInput.Control>
          </TagsInput.Root>
          <p>上述错误状态与下方字段组的“显示错误”按钮联动，分别检查聚焦和非聚焦表现。</p>
          <p role="status">标签：{tags.join('、') || '无'}；支持增删和编辑，不发送网络请求。</p>
        </div>

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

        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>Fieldset 与输入组合</h3>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
            <Button type="button" variant="outline" onClick={() => setDisabled((value) => !value)}>
              {disabled ? '启用字段组' : '禁用字段组'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setInvalid((value) => !value)}>
              {invalid ? '清除错误' : '显示错误'}
            </Button>
          </div>
          <Fieldset.Root disabled={disabled} invalid={invalid} flexDirection="column" gap="3">
            <Fieldset.Legend>账户信息</Fieldset.Legend>
            <Fieldset.HelperText>
              组合组件继承原生表单语义，禁用字段不参与 FormData。
            </Fieldset.HelperText>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>账户标识</Field.Label>
                <InputGroup
                  startElement={<span aria-hidden="true">@</span>}
                  endElement={<span aria-hidden="true">✓</span>}>
                  <Input name="account" defaultValue="newsnow" />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                <Field.Label>零值装饰元素</Field.Label>
                <InputGroup startElement={0} size="sm">
                  <Input name="sequence" placeholder="左侧的 0 应可见" size="sm" />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                <Field.Label>可调整的装饰元素</Field.Label>
                <InputGroup
                  startElement="https://"
                  startElementProps={{ minW: '20', pointerEvents: 'none', color: 'fg' }}
                  startOffset="-3rem"
                  endElement="域名"
                  endElementProps={{ minW: '16' }}
                  endOffset="-1.5rem">
                  <Input placeholder="example.com" />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                <Field.Label>站点域名</Field.Label>
                <Group attached width="full">
                  <InputAddon>https://</InputAddon>
                  <Input name="domain" defaultValue="example" />
                  <InputAddon>.com</InputAddon>
                </Group>
              </Field.Root>
            </Fieldset.Content>
            <Fieldset.ErrorText>这是本地演示错误，字段组需要重新检查。</Fieldset.ErrorText>
          </Fieldset.Root>
          <p role="status">
            字段组：{disabled ? '禁用' : '启用'}；错误：{invalid ? '显示' : '无'}
          </p>
        </div>

        <div className={css({ display: 'grid', gap: '4' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            输入组合：自定尺寸与外观
          </h3>{' '}
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

        <div className={css({ display: 'grid', gap: '3', maxWidth: 'md' })}>
          <h3>Editable / TagsInput · 紧凑定制</h3>
          <Editable.Root size="unstyled" defaultValue="点击编辑标题" gap="2">
            <Editable.Label className={css({ srOnly: true })}>自定尺寸的标题</Editable.Label>
            <Editable.Area>
              <Editable.Preview minHeight="36px" px="2" textStyle="sm" />
              <Editable.Input minHeight="36px" px="2" textStyle="sm" />
            </Editable.Area>
          </Editable.Root>
          <TagsInput.Root
            size="unstyled"
            name="compact-tags"
            defaultValue={['Panda', 'Ark']}
            editable
            gap="1.5"
            textStyle="sm"
            css={{
              '& [data-part=item-preview], & [data-part=item-input]': {
                height: '24px',
                px: '2',
                gap: '1',
                lineHeight: '1',
              },
              '& [data-part=item-delete-trigger], & [data-part=clear-trigger]': {
                boxSize: '4',
                _icon: { boxSize: '3.5' },
              },
            }}>
            <TagsInput.Label>自定尺寸的标签</TagsInput.Label>
            <TagsInput.Control minHeight="36px" px="2" gap="1.5">
              <TagsInput.Items />
              <TagsInput.Input height="28px" px="1" minWidth="16" placeholder="添加标签" />
              <TagsInput.ClearTrigger aria-label="清空紧凑标签" />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
          <TagsInput.Root
            variant="unstyled"
            defaultValue={['品牌页面']}
            editable
            css={{
              '& [data-part=item-preview]': { bg: 'lime.3', color: 'lime.11', borderRadius: 'md' },
              '& [data-part=input], & [data-part=item-input]': { outline: 'none' },
            }}>
            <TagsInput.Label>自定外观，保留 md 尺寸</TagsInput.Label>
            <TagsInput.Control
              bg="gray.3"
              borderRadius="lg"
              css={{ _focusWithin: { outline: '2px solid', outlineColor: 'lime.8' } }}>
              <TagsInput.Items />
              <TagsInput.Input placeholder="添加标签" />
              <TagsInput.ClearTrigger aria-label="清空自定外观标签" />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
        </div>
        <Button type="submit">读取本地 FormData</Button>
        <pre
          role="status"
          className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', textStyle: 'sm' })}>
          {submission}
        </pre>
      </form>
    </section>
  )
}
