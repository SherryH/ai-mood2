import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

// The sharable components on the Dashboard like Navbar will stay static. No flashing issue
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute top-0 left-0 h-full border-t border-r border-black/10 w-[200px]">
        <div className="px-4 my-4">Mood Dashboard Layout</div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.label} className="text-xl my-4">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-t border-b border-black/10">
          <div className="h-full w-full flex justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
