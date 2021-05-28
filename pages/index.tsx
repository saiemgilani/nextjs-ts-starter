import { getSortedReferencesData } from '../src/lib/references'
import { GetStaticPropsResult } from 'next'
import React, { ReactElement } from 'react'
import { Grid, Typography } from '@material-ui/core'
import styles from '../styles/Shared.module.css'
import Box from '@material-ui/core/Box'
import { ReferenceData } from '../src/types/references'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { PreviewReference } from '../src/components/PreviewReference'
import Head from 'next/head'
import { NAME, NAME_AND_DOMAIN, BASE_URL } from '../src/types/constants'

const Home = ({ referencesData }: { referencesData: ReferenceData[];  }): ReactElement => {
  const large = useMediaQuery('(min-width:700px)')

  return (
    <>
      <Head>
        <title>{NAME}</title>
        <meta
          name="description"
          content={`${NAME}`}
        />
      </Head>
      <Grid container>
        <Grid item xs={12} className={styles.headings}>
          <Box p={5}>
            <Typography variant={large ? 'h1' : 'h4'}>{NAME_AND_DOMAIN}</Typography>
            <Typography className={styles.secondHeading} variant={large ? 'h3' : 'h6'}>
              R package documentation built by jamstackingup.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pt={3}>
            <PreviewReference references={referencesData} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}


export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    referencesData: ReferenceData[]
  }>
> => {
  const referencesData = getSortedReferencesData()

  return {
    props: {
      referencesData: referencesData.filter((pd) => pd.featured),
    },
  }
}


export default Home
