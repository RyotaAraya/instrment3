import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { Progress } from 'types/data'

// 削除ボタンのテキスト
const RemoveText = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

interface CartProductProps {
  /**
   * 計器ID
   */
  id: number
  /**
   * 計器画像URL
   */
  imageUrl: string
  /**
   * 計器タイトル
   */
  title: string
  /**
   * 計器タイトル
   */
  progress: Progress
  /**
   * 不具合計器登録ボタンを押した時のイベントハンドラ
   */
  onBuyButtonClick?: (id: number) => void
  /**
   * 削除ボタンを押した時のイベントハンドラ
   */
  onRemoveButtonClick?: (id: number) => void
}

/**
 * カート計器
 */
const CartProduct = ({
  id,
  imageUrl,
  title,
  onBuyButtonClick,
  onRemoveButtonClick,
}: CartProductProps) => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Box width="120px" height="120px">
          <Link href={`/products/${id}`} passHref>
            <a>
              <Image
                quality="85"
                src={imageUrl}
                alt={title}
                height={120}
                width={120}
                objectFit="cover"
              />
            </a>
          </Link>
        </Box>
        <Box padding={1}>
          <Flex
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Text
                fontWeight="bold"
                variant="mediumLarge"
                marginTop={0}
                marginBottom={1}
                as="p"
              >
                {title}
              </Text>
            </Box>
            <Flex marginTop={{ base: 2, md: 0 }}>
              {/* 購入ボタン */}
              <Button
                width={{ base: '100px', md: '200px' }}
                onClick={() => onBuyButtonClick && onBuyButtonClick(id)}
              >
                購入
              </Button>
              {/* 削除ボタン (モバイル) */}
              <Button
                marginLeft={1}
                width={{ base: '100px', md: '200px' }}
                display={{ base: 'block', md: 'none' }}
                variant="danger"
                onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
              >
                削除
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Box display={{ base: 'none', md: 'block' }}>
        {/* 削除ボタン (デスクトップ) */}
        <RemoveText
          color="danger"
          onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
        >
          カートから削除
        </RemoveText>
      </Box>
    </Flex>
  )
}

export default CartProduct
