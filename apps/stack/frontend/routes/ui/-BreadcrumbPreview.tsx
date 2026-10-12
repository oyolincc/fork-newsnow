import { Breadcrumb, Heading } from '@newsnow/ui'
import { Link } from '@tanstack/react-router'
import { vstack } from 'styled-system/patterns'

export function BreadcrumbPreview() {
  return (
    <section className={vstack({ gap: '4', alignItems: 'stretch', p: { base: '6', md: '10' } })}>
      <Heading size="xl">Breadcrumb</Heading>
      <Breadcrumb.Root aria-label="UI 验收路径">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <Link to="/ui">UI 首页</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <Link to="/ui/data">表格与标签</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>折叠与导航</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Breadcrumb.Root variant="underline" size="sm" aria-label="自定义分隔与省略路径">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#breadcrumb-target">首页</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>/</Breadcrumb.Separator>
          <Breadcrumb.Ellipsis />
          <Breadcrumb.Separator>/</Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>当前页面</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <div id="breadcrumb-target">链接目标</div>

      <Heading size="md">分维度定制</Heading>
      <Breadcrumb.Root size="unstyled" aria-label="自定尺寸路径">
        <Breadcrumb.List gap="1.5" textStyle="sm">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#breadcrumb-target" gap="1">
              首页
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>自定尺寸</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Breadcrumb.Root variant="unstyled" aria-label="自定外观路径">
        <Breadcrumb.List>
          <Breadcrumb.Item color="lime.11">
            <Breadcrumb.Link
              href="#breadcrumb-target"
              focusRing="outside"
              css={{ _hover: { textDecoration: 'underline' } }}>
              首页
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator color="lime.7">/</Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink color="lime.11" fontWeight="semibold">
              自定外观
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </section>
  )
}
