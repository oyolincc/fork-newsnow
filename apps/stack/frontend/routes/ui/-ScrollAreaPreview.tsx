import { Button, ScrollArea } from '@newsnow/ui'
import { css } from 'styled-system/css'

export function ScrollAreaPreview() {
  const scrollArea = ScrollArea.useScrollArea()

  return (
    <section
      aria-labelledby="scroll-area-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <h2 id="scroll-area-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Scroll Area
      </h2>
      <p>双向滚动：滚轮、触控板、键盘和拖动滚动条均使用 Ark 的原生行为。</p>
      <ScrollArea.RootProvider
        value={scrollArea}
        scrollbar="visible"
        size="sm"
        height="64"
        maxWidth="xl"
        borderWidth="1px"
        borderRadius="md">
        <ScrollArea.Viewport role="region" aria-label="可滚动的示例列表" tabIndex={0}>
          <ScrollArea.Content padding="4" minWidth="2xl">
            <ol className={css({ display: 'grid', gap: '3' })}>
              {Array.from({ length: 20 }, (_, index) => (
                <li
                  key={index}
                  className={css({ display: 'flex', justifyContent: 'space-between' })}>
                  <span>第 {index + 1} 条示例内容</span>
                  <span>右侧内容用于展示横向滚动</span>
                </li>
              ))}
            </ol>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" />
        <ScrollArea.Scrollbar orientation="horizontal" />
        <ScrollArea.Corner />
      </ScrollArea.RootProvider>
      <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
        <Button
          type="button"
          variant="outline"
          onClick={() => scrollArea.scrollToEdge({ edge: 'top' })}>
          回到顶部
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => scrollArea.scrollToEdge({ edge: 'bottom' })}>
          滚动到底部
        </Button>
      </div>
    </section>
  )
}
