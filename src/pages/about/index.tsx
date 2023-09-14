import { GetStaticProps, NextPage } from 'next'

import { Meta } from '@/components/feature/meta'
import { About } from '@/components/page/about'
import { GeneralPageModel } from '@/models/models'
import { fetchPage } from '@/lib/cms/fetchPages'
import { digestMarkdown } from '@/lib/digestMarkdown'

import fs from 'fs'
import path from 'path'

type Props = {
  slug: string
  title: string
  centering: boolean
  contentMd: string
  css: string
}

const AboutPage: NextPage<Props> = (props) => {
  return (
    <>
      <Meta pageTitle={props.title} pageDescription={digestMarkdown(props.contentMd)} />
      <style>{props.css}</style>
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

  const cssPath = path.join(process.cwd(), 'src\\styles\\aboutpage\\about.css')
  const aboutCSS = fs.readFileSync(cssPath, 'utf-8')
  const newPageData = {
    slug: pageData.slug,
    title: pageData.title,
    centering: pageData.centering,
    contentMd: pageData.contentMd,
    css: aboutCSS,
  }

  return {
    props: newPageData,
  }
}
