/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import { Helmet } from 'react-helmet'

import { Fragment, FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Reset from './resetStyles'
import MdxHeader from './mdx/mdxHeader'
import { TableOfContents, TOC } from './tableOfContents'
import Header from './header'
import { H1, H2, H3, H4, H5, H6 } from './mdx/heading'
import Figure from './mdx/figure'
import Pre from './mdx/pre'
import DesktopSideNav from './sideNav/desktopSideNav'
import { CodeTabs, CodeTabItem, Code } from './mdx/code'
import Metadata from './mdx/metadata'
import Table, { TableHeader, TableHeadCell, TableBody, TableRow, TableCell } from './mdx/table'
import LearnMore, { LearnMoreTitle, LearnMoreLink } from './mdx/learnMore'
import Callout, { CalloutTitle, CalloutDescription } from './mdx/callout'
import Link from './link'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  figure: Figure,
  Card,
  Metadata,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Callout,
  CalloutTitle,
  CalloutDescription,
  LearnMore,
  LearnMoreTitle,
  LearnMoreLink,
  Link,
  CodeTabs,
  CodeTabItem,
  code: Code,
  pre: Pre,
}

interface LayoutProps {
  data: {
    mdx: {
      body: string
      toc: TOC
      timeToRead: number
      fields: {
        lastModifiedTime: string
      }
      frontmatter: {
        title: string
      }
      fileAbsolutePath: string
    }
  }
}

const description =
  "LaunchDarkly's comprehensive app documentation. Development teams are using feature management as a best practice to separate code deployments from feature releases and control their feature lifecycles from concept to launch to value. LaunchDarkly is the feature management platform that software teams use to build better software, faster."

const Layout: FunctionComponent<LayoutProps> = ({
  data: {
    mdx: {
      body,
      toc,
      timeToRead,
      fields: { lastModifiedTime },
      frontmatter: { title },
      fileAbsolutePath,
    },
  },
}) => {
  return (
    <Fragment>
      <Reset />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div
        sx={{
          color: 'grayBlack',
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: ['100%', '18rem auto', '18rem 48rem auto'],
          gridTemplateRows: ['4.5rem auto', '4.5rem auto', '4.5rem auto'],
          gridTemplateAreas: [
            `
            'header'
            'main'
            'footer'
            `,
            `
            'header header'
            'sideNav main'
            'sideNav footer'
            `,
            `
            'header header header'
            'sideNav main aside'
            'sideNav footer footer'
            `,
          ],
        }}
      >
        <Header />
        <DesktopSideNav />
        <main sx={{ gridArea: 'main', px: [5, 7, 9], pt: 7 }}>
          <MdxHeader
            fileAbsolutePath={fileAbsolutePath}
            title={title}
            timeToRead={timeToRead}
            lastModifiedDateFormatted={lastModifiedTime}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </main>
        <aside sx={{ gridArea: 'aside', pt: 4, display: ['none', 'none', 'block'], width: '18rem' }}>
          <TableOfContents toc={toc} sx={{ position: 'sticky', top: 2 }} />
        </aside>
        <footer sx={{ gridArea: 'footer', height: '7rem' }}></footer>
      </div>
    </Fragment>
  )
}

export const pageQuery = graphql`
  query Query($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
      toc: tableOfContents(maxDepth: 2)
      timeToRead
      fields {
        lastModifiedTime(formatString: "MMM d, YYYY")
      }
      frontmatter {
        title
      }
      fileAbsolutePath
    }
  }
`

export default Layout
