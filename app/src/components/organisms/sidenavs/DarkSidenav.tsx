import Link from "next/link"
import { HomeIcon } from "src/components/atoms/icons/HomeIcon"
import { CompanyIcon } from "src/components/atoms/icons/CompanyIcon"
import { GameIcon } from "src/components/atoms/icons/GameIcon"
import { TeamIcon } from "src/components/atoms/icons/TeamIcon"
import { PlayerIcon } from "src/components/atoms/icons/PlayerIcon"

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
            <h1 className="ml-3 text-2xl mt-5 mb-6 font-mono dark:text-lime-400">Gaia</h1>
          </li>
          <li>
            <Link href="/">
              <a className={ linkStyles }>
                <HomeIcon />
                <span className="ml-3">ホーム</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/companies">
              <a className={ linkStyles }>
                <CompanyIcon />
                <span className="ml-3">企業</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/games">
              <a className={ linkStyles }>
                <GameIcon />
                <span className="ml-3">ゲーム</span>
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
          <li>
            <Link href="/players">
              <a className={ linkStyles }>
                <PlayerIcon />
                <span className="ml-3">プレイヤー</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
