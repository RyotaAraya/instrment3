import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'
import FilterGroup from 'components/molecules/FilterGroup'
import Layout from 'components/templates/Layout'
import ProductCardListContainer from 'containers/ProductCardListContainer'
import type { Category, Progress } from 'types'
import { PROGRESS } from 'utils/consts'

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const categoryNameDict: Record<Category, string> = {
  flowmeter: '流量計',
  pressureGauge: '圧力計',
  thermometer: '温度計',
  flameDetector: '火炎検知器',
}

const SearchPage: NextPage = () => {
  const router = useRouter()
  // 計器のカテゴリーをクエリから取得
  const slug: Category[] = Array.isArray(router.query.slug)
    ? (router.query.slug as Category[])
    : []

  console.log('slug', slug)
  // 計器の状態をクエリから取得
  const progresses = (() => {
    if (Array.isArray(router.query.progress)) {
      return router.query.progress as Progress[]
    } else if (router.query.progress) {
      return [router.query.progress as Progress]
    } else {
      return []
    }
  })()
  console.log('progresses', progresses)

  const handleChange = (selected: string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        slug,
        progress: selected,
      },
    })
  }

  return (
    <Layout>
      <Box
        paddingLeft={{
          base: 2,
          md: 3,
        }}
        paddingRight={{
          base: 2,
          md: 3,
        }}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box marginBottom={1}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">
                <a>トップ</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/search">
                <a>検索</a>
              </Link>
            </BreadcrumbItem>
            {/* パンくずリストを選択したカテゴリから生成 */}
            {slug.slice(0, slug.length - 1).map((category, i) => (
              <BreadcrumbItem key={i}>
                <Link href={`/search/${slug.slice(0, i + 1).join('/')}`}>
                  <a>{categoryNameDict[category] ?? 'Unknown'}</a>
                </Link>
              </BreadcrumbItem>
            ))}
            {slug.length == 0 && <BreadcrumbItem>すべて</BreadcrumbItem>}
            {slug.length > 0 && (
              <BreadcrumbItem>
                {categoryNameDict[slug[slug.length - 1]] ?? 'Unknown'}
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Box as="aside" minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
              {/* 計器の状態のフィルタ */}
              <Box paddingTop={1}>
                <FilterGroup
                  title="進捗"
                  items={PROGRESS}
                  value={progresses}
                  onChange={handleChange}
                />
              </Box>
              <Box paddingTop={1}>
                <Text as="h2" fontWeight="bold" variant="mediumLarge">
                  カテゴリ
                </Text>
                <Box>
                  <Link href="/search/" passHref>
                    <Anchor as="a">すべて</Anchor>
                  </Link>
                </Box>
                {/* カテゴリのリンク */}
                {Object.keys(categoryNameDict).map(
                  (category: string, i: number) => (
                    <Box key={i} marginTop={1}>
                      <Link href={`/search/${category}`} passHref>
                        <Anchor as="a">
                          {categoryNameDict[category as Category]}
                        </Anchor>
                      </Link>
                    </Box>
                  ),
                )}
              </Box>
            </Box>
            <Box>
              <Text
                as="h2"
                display={{ base: 'block', md: 'none' }}
                fontWeight="bold"
                variant="mediumLarge"
              >
                計器一覧
              </Text>
              {/*
                計器カードリストコンテナ
                検索クエリから計器カードリストを表示
               */}
              <ProductCardListContainer
                category={slug.length > 0 ? slug[slug.length - 1] : undefined}
                progresses={progresses}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default SearchPage
