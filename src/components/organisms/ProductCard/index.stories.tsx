import { ComponentMeta, ComponentStory } from '@storybook/react'
import ProductCard from './index'

export default {
  title: 'Organisms/ProductCard',
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '計器名',
      table: {
        type: { summary: 'string' },
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: '計器画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    blurDataUrl: {
      control: { type: 'text' },
      description: '計器のぼかし画像のデータURIスキーム',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      options: ['listing', 'small', 'detail'],
      control: { type: 'radio' },
      defaultValue: 'listing',
      description: 'バリアント（表示スタイル）',
      table: {
        type: { summary: 'listing | small | detail' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
)

// Listingカード
export const Listing = Template.bind({})
Listing.args = {
  variant: 'listing',
  title: 'ナイスシューズ',
  imageUrl: '/images/sample/1.jpg',
}

// Smallカード
export const Small = Template.bind({})
Small.args = {
  variant: 'small',
  title: 'ナイスシューズ',
  imageUrl: '/images/sample/1.jpg',
}

// Detailカード
export const Detail = Template.bind({})
Detail.args = {
  variant: 'detail',
  title: 'ナイスシューズ',
  imageUrl: '/images/sample/1.jpg',
}
