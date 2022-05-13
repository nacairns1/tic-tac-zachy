
import Link from 'next/link'


//Home Page in JSX (React allows you to code HTML directly in javascript)

export default function Home() {
  return (
    <div className='font-bold'>
      <h1>Hello!</h1>
      <Link href="/games/tic-tac-toe">
        <a>
          Click here to play tic-tac-toe
        </a>
      </Link>
    </div>
  )
}
