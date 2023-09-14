import { FC } from 'react'

import { MarkdownContent } from '@/components/ui/markdownContent'
import { GeneralPageModel } from '@/models/models'

export type AboutProps = GeneralPageModel

export const About: FC<AboutProps> = ({ contentMd }) => {

  return (
    <>
      <MarkdownContent markdown={contentMd} />
    </>
  )
}
