import { CurrentLocation } from 'src/features/location'
import { ThemeSwitcher } from 'src/features/theming'

export default function Home() {
  return (
    <main className='bg-bgPrimary flex justify-center items-center w-[100vw] h-[100vh]'>
      <ThemeSwitcher />
      <CurrentLocation />
    </main>
  )
}
