import { FC } from 'react'
import { GeneralPageModel } from '@/models/models'
import { MarkdownContent } from '@/components/ui/markdownContent'

export type AboutProps = GeneralPageModel

export const About: FC<AboutProps> = ({ contentMd }) => {

  return (
    <>
      <MarkdownContent markdown={contentMd} />
    </>
  )
}
