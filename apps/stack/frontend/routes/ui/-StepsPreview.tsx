import { Button, Heading, Steps, useSteps } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { hstack, vstack } from 'styled-system/patterns'

const items = [
  { title: '选择方案', description: '确认配置' },
  { title: '填写信息', description: '完成资料' },
  { title: '提交', description: '确认结果' },
]

function StepList({ custom = false }: { custom?: boolean }) {
  return (
    <Steps.List>
      {items.map((item, index) => (
        <Steps.Item key={item.title} index={index}>
          <Steps.Trigger>
            {custom ? (
              <Steps.Indicator>
                <Steps.Status
                  complete={<span>✓</span>}
                  current={<span>●</span>}
                  incomplete={<span>○</span>}
                />
              </Steps.Indicator>
            ) : (
              <Steps.Indicator />
            )}
            <div>
              <Steps.Title>{item.title}</Steps.Title>
              <Steps.Description>{item.description}</Steps.Description>
            </div>
          </Steps.Trigger>
          <Steps.Separator />
        </Steps.Item>
      ))}
    </Steps.List>
  )
}

export function StepsPreview() {
  const [step, setStep] = useState(0)
  const [valid, setValid] = useState(false)
  const [message, setMessage] = useState('')
  const store = useSteps({ count: items.length, defaultStep: 1, orientation: 'vertical' })

  return (
    <section className={vstack({ gap: '6', alignItems: 'stretch', p: { base: '6', md: '10' } })}>
      <Heading size="xl">Steps</Heading>
      <Heading size="md">受控流程 · 线性校验</Heading>
      <Steps.Root
        count={items.length}
        step={step}
        linear
        isStepValid={(index) => index !== 1 || valid}
        onStepChange={({ step: nextStep }) => {
          setStep(nextStep)
          setMessage('')
        }}
        onStepInvalid={() => setMessage('请先确认第二步资料，再继续。')}
        onStepComplete={() => setMessage('已完成所有步骤。')}>
        <StepList />
        {items.map((item, index) => (
          <Steps.Content key={item.title} index={index}>
            <div className={vstack({ gap: '3', alignItems: 'start' })}>
              <p>{item.title}的内容；线性模式请使用前后按钮依次完成。</p>
              {index === 1 && (
                <Button variant="outline" onClick={() => setValid(!valid)} aria-pressed={valid}>
                  {valid ? '资料已确认（点击撤销）' : '确认资料'}
                </Button>
              )}
            </div>
          </Steps.Content>
        ))}
        <Steps.CompletedContent>所有步骤已完成。</Steps.CompletedContent>
        <div className={hstack({ gap: '3' })}>
          <Steps.PrevTrigger asChild>
            <Button variant="outline">上一步</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button>下一步</Button>
          </Steps.NextTrigger>
          <Button
            variant="plain"
            onClick={() => {
              setStep(0)
              setValid(false)
              setMessage('')
            }}>
            重置
          </Button>
        </div>
      </Steps.Root>
      <p role="status" aria-live="polite">
        {message || `当前步骤：${Math.min(step + 1, items.length)} / ${items.length}`}
      </p>

      <Heading size="md">竖向 · RootProvider · 自定义状态图标</Heading>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        <Button variant="outline" onClick={() => store.resetStep()}>
          通过 store 重置
        </Button>
        <Button onClick={() => store.setStep(items.length)}>通过 store 完成</Button>
      </div>
      <Steps.RootProvider value={store} variant="subtle" size="sm" minH="64">
        <StepList custom />
        <div className={css({ flex: '1', minWidth: '0' })}>
          {items.map((item, index) => (
            <Steps.Content key={item.title} index={index}>
              {item.description}
            </Steps.Content>
          ))}
          <Steps.CompletedContent>store 流程已完成。</Steps.CompletedContent>
        </div>
      </Steps.RootProvider>

      <Heading size="md">尺寸与自由组合</Heading>
      <Steps.Root count={items.length} defaultStep={1} size="xs">
        <StepList />
      </Steps.Root>
      <Steps.Root count={items.length} defaultStep={1} size="lg" variant="subtle">
        <Steps.List>
          {items.map((item, index) => (
            <Steps.Item key={item.title} index={index}>
              <Steps.Trigger aria-label={item.title}>
                <Steps.Indicator>
                  <Steps.Status
                    complete={<span>✓</span>}
                    current={0}
                    incomplete={<Steps.Number />}
                  />
                </Steps.Indicator>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
      </Steps.Root>

      <Heading size="md">分维度定制</Heading>
      <Steps.Root
        count={items.length}
        defaultStep={1}
        size="unstyled"
        gap="3"
        css={{
          '& [data-part=list]': { textStyle: 'xs' },
          '& [data-part=item], & [data-part=trigger]': { gap: '2' },
          '& [data-part=indicator]': { boxSize: '28px', _icon: { boxSize: '14px' } },
          '& [data-part=separator]': { height: '2px', mx: '2' },
          '& [data-part=title]': { textStyle: 'xs' },
        }}>
        <StepList />
      </Steps.Root>
      <Steps.Root
        count={items.length}
        defaultStep={1}
        variant="unstyled"
        css={{
          '& [data-part=indicator]': {
            bg: 'lime.3',
            color: 'lime.11',
            borderRadius: 'sm',
            '&[data-current]': { bg: 'lime.9', color: 'white' },
          },
          '& [data-part=separator]': { bg: 'lime.5' },
          '& [data-part=trigger]': { focusVisibleRing: 'outside' },
        }}>
        <StepList />
      </Steps.Root>
    </section>
  )
}
