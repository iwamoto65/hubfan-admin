import Link from "next/link"
import { HomeIcon } from "src/components/atoms/icons/HomeIcon"
import { TeamIcon } from "src/components/atoms/icons/TeamIcon"

export const DarkSidenav = () => {
  const linkStyles = `
    flex
    items-center
    p-2
    text-base
    font-normal
    text-gray-900
    rounded-lg
    dark:text-white
    hover:bg-gray-100
    dark:hover:bg-gray-700
  `

  return (
    <aside className="h-screen">
      <div className="h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <a className={ linkStyles }>
                <HomeIcon />
                <span className="ml-3">ホーム</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/teams">
              <a className={ linkStyles }>
                <TeamIcon />
                <span className="ml-3">チーム</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
