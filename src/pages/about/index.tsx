import { GetStaticProps, NextPage } from 'next'

import { Meta } from '@/components/feature/meta'
import { About } from '@/components/page/about'
import { GeneralPageModel } from '@/models/models'
import { fetchPage } from '@/lib/cms/fetchPages'
import { digestMarkdown } from '@/lib/digestMarkdown'

type Props = GeneralPageModel

const AboutPage: NextPage<Props> = (props) => {
  const aboutCSS = `
    --bs-font-sans-serif: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  }

  ::after,
  ::before {
    box-sizing: border-box;
  }
  @media (prefers-reduced-motion: no-preference) {
    :root {
      scroll-behavior: smooth;
    }
  }
  body {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-family: 'system-ui';
    background-color: #fff;
  }

  body {
    font-family: 'system-ui';
    overflow-x: hidden;
    background-color: #fff;
    font-weight: 400;
    font-style: normal;
    color: #000;
    font-size: var(--font_14);
  }

  a,
  a:hover,
  a:focus,
  i,
  input,
  button,
  input:focus,
  .transition {
    text-decoration: none;
    outline: none;
    transition-delay: 0s;
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: ease;
    box-shadow: none;
  }

  a {
    color: #000;
  }

  iframe {
    border: 0;
    outline: none;
  }

  ::-moz-selection {
    background: var(--red);
    text-shadow: none;
    color: var(--white);
  }

  ::selection {
    background: var(--red);
    text-shadow: none;
    color: var(--white);
  }

  img {
    max-width: 100%;
    border: none;
    outline: none;
    height: auto;
  }

  input,
  textarea {
    border-radius: 0;
    resize: none;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background-color: transparent;
    background-image: none;
    color: #000;
  }

  figure {
    margin: 0;
  }

  svg,
  img {
    max-width: 100%;
    height: auto;
  }

  .ds-header {
    padding-top: 5.875rem;
    padding-bottom: 9.125rem;
    position: relative;
  }

  .ds-logo {
    text-align: center;
  }

  .ds-logo a {
    display: inline-flex;
    justify-content: center;
    color: #181818;
    font-size: 0.875rem;
    letter-spacing: 12px;
    font-weight: 600;
    border-bottom: 3px solid #e0e0e0;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .ds-pge-wrap {
    margin-bottom: 100px;
  }

  .ds-sticky {
    position: sticky;
    top: 0;
    padding-top: 10px;
  }

  .ds-left-section figure {
    margin-bottom: 0.5rem;
  }

  .ds-socail span {
    display: block;
    font-weight: 600;
    font-size: 1.125rem;
  }

  .ds-socail ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1.125rem;
  }

  .ds-socail ul li {
    margin-right: 20px;
    margin-top: 10px;
  }

  .ds-socail ul li:last-child {
    margin-right: 0;
  }

  .ds-socail ul li a:hover {
    color: #000;
    text-decoration: underline;
  }

  .ds-heading {
    padding-top: 5.6rem;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 3.6875rem;
    margin-bottom: 2rem;
  }

  .ds-info-sectio-wrp {
    padding-left: 2.5rem;
  }

  .ds-info-sectio p,
  .ds-project-details p {
    font-size: 1.1rem;
    line-height: 2.25rem;
    margin-bottom: 20px;
  }

  .ds-info-list-section {
    margin-top: 5.625rem;
  }

  .ds-info-list-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .ds-info-list-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .ds-info-list-section ul li {
    width: 50%;
    font-size: 1.125rem;
    margin-bottom: 10px;
  }

  .ds-info-list-section ul li a {
    text-decoration: underline;
  }

  .ds-info-list-section ul li a:hover {
    text-decoration: none;
    color: #000;
  }

  .ds-pr-info {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 40px;
  }

  .ds-margin-bottom-70 {
    margin-bottom: 4.375rem;
  }

  .ds-footer {
    padding-bottom: 120px;
    padding-top: 50px;
    text-align: center;
  }

  .ds-footer a:hover {
    color: #000;
    text-decoration: underline;
  }

  .padding-under {
    padding-bottom: 5rem;
  }

  @media (max-width: 767px) {
    .ds-header {
      padding-top: 2.875rem;
      padding-bottom: 3.125rem;
    }

    .ds-info-sectio-wrp {
      padding-left: 0;
      padding-top: 1.875rem;
    }

    .ds-heading {
      font-size: 1.5rem;
      line-height: 2.6875rem;
      margin-bottom: 20px;
      padding-top: 1rem;
    }

    .ds-info-list-section ul li {
      width: 100%;
    }

    .ds-info-list-section {
      margin-top: 2.625rem;
    }

    .ds-pge-wrap {
      margin-bottom: 50px;
    }

    .ds-footer {
      padding-bottom: 80px;
    }

    .ds-closebutton {
      position: static;
      display: block;
    }

    .ds-main-image {
      margin-bottom: 3.0625rem;
    }

    .ds-pr-info {
      margin-bottom: 10px;
    }

    .ds-list-image {
      margin-top: 2.375rem;
    }

    .ds-margin-bottom-70 {
      margin-bottom: 2.375rem;
    }

    .padding-under {
      padding-bottom: 2rem;
    }
  }

  .container,
  .container-fluid,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    width: 100%;
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 576px) {
    .container,
    .container-sm {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container,
    .container-md,
    .container-sm {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container,
    .container-lg,
    .container-md,
    .container-sm {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container,
    .container-lg,
    .container-md,
    .container-sm,
    .container-xl {
      max-width: 1140px;
    }
  }
  @media (min-width: 1400px) {
    .container,
    .container-lg,
    .container-md,
    .container-sm,
    .container-xl,
    .container-xxl {
      max-width: 1320px;
    }
  }

  .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y) * -1);
    margin-right: calc(var(--bs-gutter-x) * -0.5);
    margin-left: calc(var(--bs-gutter-x) * -0.5);
  }
  .row > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }


  @media (min-width: 576px) {
    .col-sm-12 {
      flex: 0 0 auto;
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    .col-lg-5 {
      flex: 0 0 auto;
      width: 41.66666667%;
    }
    .col-lg-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
  }
  @media (min-width: 1200px) {
    .col-xl-5 {
      flex: 0 0 auto;
      width: 41.66666667%;
    }
    .col-xl-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
  }
  @media (min-width: 1400px) {
    .col-xxl-5 {
      flex: 0 0 auto;
      width: 41.66666667%;
    }
    .col-xxl-7 {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
  }
  @media (min-width: 768px) {
    .col-md-6 {
      flex: 0 0 auto;
      width: 50%;
    }
  }
  /* .col-12 {
    flex: 0 0 auto;
    width: 100%;
  } */

  .text-center {
    text-align: center !important;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .ds-heading {
      font-size: 1.5rem;
      line-height: 2.6875rem;
      padding-top: 1rem;
    }

    .ds-info-list-section ul li {
      width: 100%;
    }

    .padding-under {
      padding-bottom: 2rem;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .padding-under {
      padding-bottom: 2rem;
    }
  }
  `
  return (
    <>
      <Meta pageTitle={props.title} pageDescription={digestMarkdown(props.contentMd)} />
      <style>{aboutCSS}</style>
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
