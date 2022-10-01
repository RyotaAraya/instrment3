import styled from 'styled-components'
import ScaleImage from 'components/atoms/ScaleImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import { Progress } from 'types/data'
import { PROGRESS_LIST } from 'utils/consts'

interface ProductCardProps {
  /**
   * 計器タイトル
   */
  title: string
  /**
   * 進捗
   */
  progress: Progress
  /**
   * 計器画像URL
   */
  imageUrl: string
  /**
   * 計器のぼかし画像のデータURIスキーム
   */
  blurDataUrl?: string
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'listing' | 'small' | 'detail'
}

// 計器カードのコンテナ
const ProductCardContainer = styled.div`
  position: relative;
`

// 計器カード画像のコンテナ
const ProductCardImageContainer = styled.div`
  z-index: 99;
`

// 計器カードの情報
const ProductCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
`

/**
 * 計器カード
 */
const ProductCard = ({
  title,
  progress,
  imageUrl,
  blurDataUrl,
  variant = 'listing',
}: ProductCardProps) => {
  const { size, imgSize } = (() => {
    switch (variant) {
      case 'detail':
        return { size: { base: '320px', md: '540px' }, imgSize: 540 }
      case 'listing':
        return { size: { base: '160px', md: '240px' }, imgSize: 240 }
      default:
        return { size: { base: '160px' }, imgSize: 160 }
    }
  })()

  return (
    <ProductCardContainer>
      {variant !== 'small' && (
        <ProductCardInfo>
          <Box>
            <Text
              as="h2"
              fontSize={{ base: 'small', md: 'mediumLarge' }}
              letterSpacing={{ base: 2, md: 3 }}
              lineHeight={{ base: '32px', md: '48px' }}
              backgroundColor="white"
              margin={0}
              paddingRight={2}
              paddingLeft={2}
              paddingTop={0}
              paddingBottom={0}
            >
              {title}
            </Text>
            <Text
              as="span"
              fontWeight="bold"
              display="inline-block"
              backgroundColor="white"
              fontSize={{ base: 'extraSmall', md: 'medium' }}
              lineHeight={{ base: '8px', md: '12px' }}
              letterSpacing={{ base: 2, md: 4 }}
              margin={0}
              padding={{ base: 1, md: 2 }}
            >
              {PROGRESS_LIST[progress]}
            </Text>
          </Box>
        </ProductCardInfo>
      )}
      <ProductCardImageContainer>
        {blurDataUrl && (
          <ScaleImage
            src={imageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        )}
        {!blurDataUrl && (
          <ScaleImage
            src={imageUrl}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            containerWidth={size}
            containerHeight={size}
            objectFit="cover"
          />
        )}
      </ProductCardImageContainer>
      {variant === 'small' && (
        <Box marginTop={1}>
          <Text as="h2" variant="medium" margin={0} padding={0}>
            {title}
          </Text>
          <Text as="span" variant="medium">
            {PROGRESS_LIST[progress]}
          </Text>
        </Box>
      )}
    </ProductCardContainer>
  )
}

export default ProductCard
