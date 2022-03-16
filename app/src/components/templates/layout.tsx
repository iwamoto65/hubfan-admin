import { ReactNode } from "react";
import { DarkSidenav } from "../organisms/sidenavs/DarkSidenav";

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/6">
          <DarkSidenav />
        </div>
        <div className="basis-5/6">
          <main>{ children }</main>
        </div>
      </div>
    </>
  )
}
