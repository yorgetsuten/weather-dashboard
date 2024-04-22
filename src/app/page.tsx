import { CurrentLocation } from 'src/features/location'

export default function Home() {  
  return (
    <main className='bg-bg-primary flex justify-center items-center w-[100vw] h-[100vh]'>
      <CurrentLocation />
    </main>
  )
}
