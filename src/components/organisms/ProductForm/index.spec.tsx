import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '.'
import { theme } from 'themes'

describe('ProductForm', () => {
  let renderResult: RenderResult
  let handleProductSave: jest.Mock
  // スタブ
  global.URL.createObjectURL = () => 'https://test.com'

  beforeEach(() => {
    // ダミー関数
    handleProductSave = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ProductForm onProductSave={handleProductSave} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('フォーム入力後、onProductSaveが呼ばれる', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // 計器画像を入力
      const element = await screen.findByTestId('dropzone')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })

      // 不具合計器名を入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /不具合計器名/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '計器' } })

      // 計器情報を入力
      const inputPasswordNode = screen.getByPlaceholderText(
        /指示値振れ頻発/,
      ) as HTMLInputElement
      fireEvent.change(inputPasswordNode, { target: { value: 'テストテスト' } })

      // 不具合計器登録ボタンをクリック
      fireEvent.click(screen.getByText('不具合計器登録'))
    })

    // handleProductSaveが呼ばれていることを確認
    expect(handleProductSave).toHaveBeenCalledTimes(1)
  })

  it('不具合計器名入力だけでは、バリデーションエラーでonProductSaveが呼ばれない', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // 不具合計器名を入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /不具合計器名/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '計器' } })

      // 不具合計器登録ボタンをクリック
      fireEvent.click(screen.getByText('不具合計器登録'))
    })

    // handleProductSaveが呼ばれていないことを確認
    expect(handleProductSave).toHaveBeenCalledTimes(0)
  })
})
