import { App, ConfigProvider } from 'antd'

interface UILibraryAdapterProps {
  children: React.ReactNode
}

export const AntdAdapter: React.FC<UILibraryAdapterProps> = ({ children }) => {
  return (
    <ConfigProvider>
      <App>{children}</App>
    </ConfigProvider>
  )
}
