import classNames from 'classnames'
import { FC, ReactElement, useState } from 'react'

import { WrapLink } from '@/components/feature/wrapLink'
import { Icon } from '@/components/ui/icon'

export type PageHeaderLinkItem = {
  text: string
  href: string
  highlight?: boolean
}

export type PageHeaderProps = {
  logo: ReactElement
  logoHref: string
  links: readonly PageHeaderLinkItem[]
}

//md未満はハンバーガーメニューにする

export const PageHeader: FC<PageHeaderProps> = ({ logo, logoHref, links }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickHamburger = () => {
    setIsOpen(!isOpen)
  }

  const youtubeLink = {
    text: 'YouTube',
    href: 'https://www.youtube.com/@miyashitalab',
    highlight: false,
  }

  return (
    <header className={'w-full bg-white px-4'}>
      <nav className={'mx-auto flex h-full max-w-screen-xl flex-wrap items-center justify-between bg-white py-1'}>
        <div className={'flex h-10 items-center'}>
          <WrapLink href={logoHref}>{logo}</WrapLink>
        </div>

        {/* ハンバーガーボタン */}
        <div className={'block md:hidden'}>
          <button className={'h-10 w-10 rounded-lg text-gray-500 hover:bg-gray-200'} onClick={handleClickHamburger}>
            <Icon size={'lg'} fontStyle={'solid'} name={'bars'} />
          </button>
        </div>
        <div
          className={classNames('w-full md:flex md:w-auto pt-2 md:pt-0', {
            hidden: !isOpen,
          })}
        >
          <ul className={'flex flex-col md:flex-row md:space-x-4'}>
            {/* 内部リンク */}
            {[...links].map(({ text, href, highlight }) => (
              <li key={href}>
                <WrapLink href={href}>
                  <div
                    className={classNames(
                      'block rounded text-md py-1 pl-2',
                      'border-b border-gray-100',
                      'md:border-b-0',
                      {
                        'text-white bg-teal-500 md:text-cyan-500 md:bg-transparent': highlight,
                      },
                      {
                        'text-gray-700 hover:bg-gray-100 md:hover:underline decoration-cyan-500 decoration-1 underline-offset-4 md:hover:bg-transparent': !highlight,
                      }
                    )}
                  >
                    {text}
                  </div>
                </WrapLink>
              </li>
            ))}
            {/* 外部リンク */}
            {[youtubeLink].map(({ text, href, highlight }) => (
              <li key={href}>
                <a href={href} target="_blank">
                  <div
                    className={classNames(
                      'block rounded text-md py-1 pl-2',
                      'border-b border-gray-100',
                      'md:border-b-0',
                      {
                        'text-white bg-teal-500 md:text-cyan-500 md:bg-transparent': highlight,
                      },
                      {
                        'text-gray-700 hover:bg-gray-100 md:hover:underline decoration-cyan-500 decoration-1 underline-offset-4 md:hover:bg-transparent': !highlight,
                      }
                    )}
                  >
                    {text + ' '}
                    <div className={'fa-solid fa-up-right-from-square'}></div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
