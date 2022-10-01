import { Controller, useForm } from 'react-hook-form'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Text from 'components/atoms/Text'
import TextArea from 'components/atoms/TextArea'
import Box from 'components/layout/Box'
import Dropdown from 'components/molecules/Dropdown'
import InputImages, { FileData } from 'components/molecules/InputImages'
import type { Category, Progress } from 'types'

export type ProductFormData = {
  image: FileData[]
  title: string
  description: string
  category: Category
  progress: Progress
}

interface ProductFormProps {
  /**
   * 不具合計器登録ボタンを押した時のイベントハンドラ
   */
  onProductSave?: (data: ProductFormData) => void
}

/**
 * 不具合通知フォーム
 */
const ProductForm = ({ onProductSave }: ProductFormProps) => {
  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>()
  const onSubmit = (data: ProductFormData) => {
    onProductSave && onProductSave(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" variant="mediumLarge" fontWeight="bold">
            不具合計器の写真
          </Text>
        </Box>
        {/* 計器画像の入力 */}
        <Controller
          control={control}
          name="image"
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputImages
              images={value ?? []}
              onChange={onChange}
              maximumNumber={1}
              hasError={!!error}
            />
          )}
        />
        {errors.image && (
          <Text color="danger" variant="small" paddingLeft={1}>
            不具合計器の写真は必須です
          </Text>
        )}
      </Box>

      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" variant="mediumLarge" fontWeight="bold">
            計器情報
          </Text>
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            カテゴリ
          </Text>
          {/* カテゴリのドロップダウン */}
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            defaultValue="flowmeter"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'flowmeter', label: '流量計' },
                  { value: 'pressureGauge', label: '圧力計' },
                  { value: 'thermometer', label: '温度計' },
                  { value: 'flameDetector', label: '火炎検知器' },
                ]}
                hasError={!!error}
                value={value}
                placeholder="カテゴリを選択して下さい"
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.category && (
            <Text color="danger" variant="small" paddingLeft={1}>
              カテゴリの選択は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            計器名
          </Text>
          {/* 計器タイトルの入力 */}
          <Input
            {...register('title', { required: true })}
            name="title"
            type="text"
            placeholder="流量計1"
            hasError={!!errors.title}
          />
          {errors.title && (
            <Text color="danger" variant="small" paddingLeft={1}>
              計器名の入力は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            概要
          </Text>
          {/* 計器概要の入力 */}
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextArea
                placeholder="指示値振れ頻発 ±10%"
                hasError={!!error}
                onChange={onChange}
              >
                {value}
              </TextArea>
            )}
          />
          {errors.description && (
            <Text color="danger" variant="small" paddingLeft={1}>
              概要の入力は必須です
            </Text>
          )}
        </Box>
      </Box>
      <Button width="100%" type="submit">
        不具合計器登録
      </Button>
    </form>
  )
}

export default ProductForm
