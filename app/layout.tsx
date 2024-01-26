import "styles/globals.scss";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { authService } from "services/accounts.service";
import { Merienda, Roboto_Slab } from "next/font/google";
import { setAxiosCookieInterceptor } from "services/index";
import StoreContextProvider from "components/providers/StoreContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { ReactChildren } from "interfaces/components/shared.interface";

const merienda = Merienda({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoccerMASS",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: ReactChildren) {
  let axiosCookies = "";

  cookies()
    .getAll()
    .forEach(({ name: cookieName, value: cookieValue }) => {
      axiosCookies += `${cookieName}=${cookieValue};`;
    });

  setAxiosCookieInterceptor(axiosCookies);

  const profile = await authService()
    .then(({ data, success }) => {
      return success ? data : null;
    })
    .catch(() => null);

  return (
    <html lang="en">
      <body className={`${merienda.className}  ${robotoSlab.className}`}>
        <AppRouterCacheProvider>
          <StoreContextProvider profile={profile}>{children}</StoreContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
