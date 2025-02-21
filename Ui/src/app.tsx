import { Outlet } from 'react-router'

export function App() {
  return (
    <div className="flex h-svh">
      {/*sidebar*/}
      <div className="min-w-16 basis-[5%] overflow-y-auto bg-amber-50">
        <div className="flex h-full flex-col items-center justify-between gap-16 py-8 md:gap-32">
          <div>l</div>
          <nav className="flex flex-col gap-4">
            <p>h</p>
            <p>r</p>
            <p>s</p>
            <p>c</p>
          </nav>
          <div>b</div>
        </div>
      </div>
      {/*sidebarend*/}

      <div className="flex grow flex-col">
        {/*navbar*/}
        <div className="z-50 bg-fuchsia-100">
          <div className="flex gap-4 p-8 [&>div]:px-4 [&>div]:py-2">
            <div className="mr-auto basis-[50%] bg-emerald-100">search bar</div>
            <div className="bg-indigo-100">profile</div>
            <div className="bg-rose-100">cart</div>
          </div>
        </div>
        {/*navbarend*/}

        <div className="grow overflow-y-auto px-16 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
