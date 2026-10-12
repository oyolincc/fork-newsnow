import { Button, ButtonGroup, CloseButton, IconButton } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'

const row = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3' })
const section = css({ display: 'grid', gap: '4' })

export function ButtonPreview() {
  const [dark, setDark] = useState(true)
  const [loading, setLoading] = useState(false)
  const [clicks, setClicks] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <section
      className={css({
        bg: 'bg.page',
        color: 'fg.default',
        padding: { base: '6', md: '10' },
        display: 'grid',
        alignContent: 'start',
        gap: '8',
      })}>
      <header className={section}>
        <h2 className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>Button 验收</h2>
        <p>点击按钮、使用 Tab 检查焦点，并切换主题查看各状态。</p>
        <div className={row}>
          <Button
            variant="outline"
            onClick={() => {
              const nextDark = !dark
              document.documentElement.classList.toggle('dark', nextDark)
              document.documentElement.classList.toggle('light', !nextDark)
              setDark(nextDark)
            }}>
            切换到{dark ? '浅色' : '深色'}主题
          </Button>
          <Button asChild variant="plain">
            <a href="/">返回首页</a>
          </Button>
        </div>
      </header>

      <section className={section} aria-labelledby="variants-heading">
        <h2 id="variants-heading">配方</h2>
        <div className={row}>
          <Button colorPalette="lime" variant="solid">
            Solid
          </Button>
          <Button colorPalette="lime" variant="surface">
            Surface
          </Button>
          <Button colorPalette="lime" variant="subtle">
            Subtle
          </Button>
          <Button colorPalette="lime" variant="outline">
            Outline
          </Button>
          <Button colorPalette="lime" variant="plain">
            Plain
          </Button>
        </div>
      </section>

      <section className={section} aria-labelledby="sizes-heading">
        <h2 id="sizes-heading">尺寸</h2>
        <div className={row}>
          <Button size="2xs">2xs</Button>
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button size="xl">xl</Button>
          <Button size="2xl">2xl</Button>
        </div>
      </section>

      <section className={section} aria-labelledby="colors-heading">
        <h2 id="colors-heading">配色</h2>
        <div className={row}>
          <Button colorPalette="gray">Gray</Button>
          <Button colorPalette="lime">Lime</Button>
          <Button colorPalette="red">Red</Button>
          <Button colorPalette="green">Green</Button>
        </div>
      </section>

      <section className={section} aria-labelledby="button-customization-heading">
        <h2 id="button-customization-heading">按维度自定义</h2>
        <p>自定尺寸保留默认外观，自定外观保留默认尺寸；点击计数并用 Tab 检查焦点。</p>
        <div className={row}>
          <Button>默认 md / solid</Button>
          <Button size="unstyled" height="64px" px="8" gap="4" textStyle="lg">
            自定尺寸
          </Button>
          <Button
            variant="unstyled"
            bg="gray.12"
            color="gray.1"
            borderRadius="full"
            cursor="pointer"
            focusVisibleRing="outside"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-3px)' }}
            onClick={() => setClicks((value) => value + 1)}>
            自定外观与悬浮动效
          </Button>
          <Button
            size="unstyled"
            variant="unstyled"
            height="64px"
            px="8"
            textStyle="xl"
            borderRadius="full"
            bg="lime.9"
            color="black"
            focusVisibleRing="outside"
            disabled>
            全自定，保留禁用行为
          </Button>
        </div>
        <div className={row}>
          <IconButton size="unstyled" width="24px" height="24px" aria-label="自定尺寸添加按钮">
            <span aria-hidden="true">＋</span>
          </IconButton>
          <CloseButton size="unstyled" width="24px" height="24px" aria-label="自定尺寸关闭按钮" />
          <ButtonGroup size="unstyled" variant="outline">
            <Button height="24px" px="6">
              组内上一项
            </Button>
            <Button height="24px" px="6">
              组内下一项
            </Button>
          </ButtonGroup>
        </div>
        <p>IconButton 保留零内边距，CloseButton 保留 plain / gray；按钮组沿用原有尺寸继承。</p>
      </section>

      <section className={section} aria-labelledby="states-heading">
        <h2 id="states-heading">交互状态</h2>
        <div className={row}>
          <Button ref={buttonRef} colorPalette="lime" onClick={() => setClicks(clicks + 1)}>
            已点击 {clicks} 次
          </Button>
          <Button disabled onClick={() => setClicks(clicks + 1)}>
            禁用
          </Button>
          <Button variant="outline" onClick={() => buttonRef.current?.focus()}>
            通过 ref 聚焦计数按钮
          </Button>
        </div>
        <div className={row}>
          <Button variant="outline" onClick={() => setLoading(!loading)}>
            {loading ? '结束' : '开始'}加载
          </Button>
          <Button loading={loading} onClick={() => setClicks(clicks + 1)}>
            保存
          </Button>
          <Button loading={loading} loadingText="保存中…" spinnerPlacement="end">
            保存并继续
          </Button>
        </div>
        <p role="status">
          已点击 {clicks} 次；加载状态：{loading ? '加载中' : '空闲'}
        </p>
      </section>

      <section className={section} aria-labelledby="group-heading">
        <h2 id="group-heading">按钮组</h2>
        <ButtonGroup attached variant="outline" size="sm" colorPalette="lime">
          <Button>上一项</Button>
          <Button>当前项</Button>
          <Button>下一项</Button>
        </ButtonGroup>
      </section>
    </section>
  )
}
