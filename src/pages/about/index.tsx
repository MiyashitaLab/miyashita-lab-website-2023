import { GetStaticProps, NextPage } from 'next'

import { Meta } from '@/components/feature/meta'
import { About } from '@/components/page/about'
import { GeneralPageModel } from '@/models/models'
import { fetchPage } from '@/lib/cms/fetchPages'
import { digestMarkdown } from '@/lib/digestMarkdown'

type Props = GeneralPageModel

const AboutPage: NextPage<Props> = (props) => {
  return (
    <>
      <Meta pageTitle={props.title} pageDescription={digestMarkdown(props.contentMd)} />
      <About {...props} />
    </>
  )
}

export default AboutPage

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pageData = await fetchPage('about').catch(() => {
    return undefined
  })

  if (pageData === undefined) {
    return {
      notFound: true,
    }
  }

  return {
    props: pageData,
  }
}
