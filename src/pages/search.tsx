import Header from '@/components/Header';
import { useRouter } from 'next/router';
import React from 'react';
import { api } from '@/api/api';
import { Daum } from '@/api/airbnbdata';
import Card from '@/components/Card';

type ElementProps = {
  searchResults: Daum[];
};

export default function Search({ searchResults }: ElementProps) {
  const router = useRouter();
  const { location } = router.query;
  let capitalizedString = location;

  if (typeof location === 'string') {
    capitalizedString = location.charAt(0).toUpperCase() + location.slice(1);
  }

  return (
    <div>
      <Header placeholder={`${capitalizedString as string}`} />
      <main className='flex'>
        <section>
          <div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {searchResults?.map((item) => {
              return <Card key={item?.info?.id} data={item}></Card>;
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  context.res.setHeader(
    'Cache-Control',
    's-maxage=0, stale-while-revalidate=0'
  );
  const searchResults = await api.getDataByLocation(context?.query?.location);
  return {
    props: {
      searchResults,
    },
  };
}
