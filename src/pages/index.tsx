import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import ProductCard from 'components/organisms/ProductCard'
import ProductCardCarousel from 'components/organisms/ProductCardCarousel'
import Layout from 'components/templates/Layout'
import getAllProducts from 'services/products/get-all-products'
import { ApiContext, Product } from 'types'

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<HomePageProps> = ({
  bookProducts,
  clothesProducts,
  shoesProducts,
  flameDetectorProducts,
}: HomePageProps) => {
  // 商品カードカルーセルをレンダリング
  const renderProductCardCarousel = (products: Product[]) => {
    return (
      <ProductCardCarousel>
        {products.map((p: Product, i: number) => (
          <Box paddingLeft={i === 0 ? 0 : 2} key={p.id}>
            <Link href={`/products/${p.id}`} passHref>
              <a>
                <ProductCard
                  variant="small"
                  title={p.title}
                  price={p.price}
                  imageUrl={p.imageUrl}
                  blurDataUrl={p.blurDataUrl}
                />
              </a>
            </Link>
          </Box>
        ))}
      </ProductCardCarousel>
    )
  }

  return (
    <Layout>
      <Flex padding={2} justifyContent="center" backgroundColor="primary">
        <Flex
          width={{ base: '100%', md: '1040px' }}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box width="100%">
            <Text as="h1" marginBottom={0} color="white" variant="extraLarge">
              INSTRMENT3
            </Text>
            <Text as="h1" marginTop={0} color="white" variant="extraLarge">
              工事管理ツール
            </Text>
          </Box>
          <Box width="100%">
            <Text as="p" color="white" variant="mediumLarge">
              Next.jsのデモアプリです。
            </Text>
            <Text as="p" color="white" variant="mediumLarge">
              ソースコードは
              <Text
                as="a"
                style={{ textDecoration: 'underline' }}
                target="_blank"
                href="https://github.com/RyotaAraya/instrment3"
                variant="mediumLarge"
                color="white"
              >
                コチラ
              </Text>
            </Text>
            <Text as="p" color="white" variant="mediumLarge">
              TypeScript/Next.jsで作成されており、バックエンドのモックAPIはjson-serverを使用しています。
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex paddingBottom={2} justifyContent="center">
        <Box
          paddingLeft={{ base: 2, md: 0 }}
          paddingRight={{ base: 2, md: 0 }}
          width={{ base: '100%', md: '1040px' }}
        >
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              トップス
            </Text>
            {renderProductCardCarousel(clothesProducts)}
          </Box>
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              本
            </Text>
            {renderProductCardCarousel(bookProducts)}
          </Box>
          <Box>
            <Text as="h2" variant="large">
              シューズ
            </Text>
            {renderProductCardCarousel(shoesProducts)}
          </Box>
          <Box>
            <Text as="h2" variant="large">
              火炎検知器
            </Text>
            {renderProductCardCarousel(flameDetectorProducts)}
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  // 各商品のトップ6個を取得し、静的ページを作成
  // 60秒でrevalidateな状態にし、静的ページを更新する
  const [clothesProducts, bookProducts, shoesProducts, flameDetectorProducts] =
    await Promise.all([
      getAllProducts(context, { category: 'clothes', limit: 6, page: 1 }),
      getAllProducts(context, { category: 'book', limit: 6, page: 1 }),
      getAllProducts(context, { category: 'shoes', limit: 6, page: 1 }),
      getAllProducts(context, { category: 'flameDetector', limit: 6, page: 1 }),
    ])

  console.log('shoesProducts', shoesProducts)
  console.log('flameDetectorProducts', flameDetectorProducts)

  return {
    props: {
      clothesProducts,
      bookProducts,
      shoesProducts,
      flameDetectorProducts,
    },
    revalidate: 60,
  }
}

export default HomePage
