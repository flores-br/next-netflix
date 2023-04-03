import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import { Billboard, MovieList, Navbar } from '@/components'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import useInfoModalStore from '@/hooks/useInfoModalStore'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList data={movies} title='Trending Now' />
        <MovieList data={favorites} title='My List' />
      </div>
    </>
  )
}

export default Home
