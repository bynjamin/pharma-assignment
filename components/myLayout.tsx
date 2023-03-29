import Head from 'next/head'
import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

export default function MyLayout({ children }) {
  return (
    <>
      <Head>
        <title>Pharma assignment</title>
        <meta name="description" content="Visualizing data from external API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>Pharma Assignment</Header>
          <main>
            <Content>{children}</Content>
          </main>
        </Layout>
      </Space>
    </>
  )
}