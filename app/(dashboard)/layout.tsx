import { UserButton } from '@clerk/nextjs'

// The sharable components on the Dashboard like Navbar will stay static. No flashing issue
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute top-0 left-0 h-full border-t border-r border-black/10 w-[200px]">
        Mood Dashboard Layout
      </aside>
      <div className="ml-[200px]">
        <header className="h-[60px] border-t border-b border-black/10">
          <div className="h-full w-full flex justify-end">
            <UserButton />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
