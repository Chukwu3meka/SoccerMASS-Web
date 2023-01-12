import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";

import { styles } from ".";
import { IFooter } from "@interface/main/footer-interface";
import thirdPartyAccounts from "@source/thirdPartyAccounts";

const Footer = ({ logoutHandler, authenticated }: IFooter) => (
  <div className={styles.footer}>
    <Fade direction="right">
      <footer>
        <main>
          <aside>
            <Typography fontWeight={700} fontSize="2.2em" component="h1">
              SoccerMASS
            </Typography>

            <Image src="/images/soccermass.webp" alt="SoccerMASS" width={80} height={80} placeholder="blur" blurDataURL="/images/soccermass.webp" />

            <Typography variant="subtitle2">Follow US</Typography>

            <div>
              {thirdPartyAccounts.map(([accounts, link = "https://alienforest.com/"]) => (
                <a href={link} key={accounts} rel="noopener noreferrer" target="_blank">
                  <Image src={`/images/social/${accounts.toLowerCase()}.png`} alt={`SoccerMASS ${accounts} page`} width={30} height={30} />
                </a>
              ))}
            </div>
          </aside>

          <nav>
            <div>
              <label htmlFor="info">Info</label>
              <Link href="/info/privacy/">Privacy Policy</Link>
              <Link href="/info/contact/">Contact US</Link>
              <Link href="/info/terms/">Terms &amp; Conditions</Link>
              <Link href="/info/advertise/">Advertise</Link>
              <Link href="/info/donate/">Support/Donation</Link>
            </div>

            <div>
              <label htmlFor="soccermass-links">SoccerMASS</label>
              <Link href="/">Home</Link>
              <Link href="/apihub">API HUB</Link>
              <Link href="/manager">Manager</Link>
              {!authenticated && <Link href="/auth/signin">Signin</Link>}
              {!authenticated && <Link href="/auth/signup">Signup</Link>}
              <Link href="/auth/reset">Reset Password</Link>
              {authenticated && (
                <Link href="/auth/signin" onClick={logoutHandler()}>
                  Logout
                </Link>
              )}
            </div>

            <div>
              <label htmlFor="company">Company</label>
              <a href="https://viewcrunch.com/" rel="noopener noreferrer">
                ViewCrunch
              </a>
              <a href="https://soccermass.com/" rel="noopener noreferrer">
                SoccerMASS
              </a>
              <a href="https://alienforest.com/" rel="noopener noreferrer">
                AlienForest
              </a>
            </div>
          </nav>
        </main>

        <section>
          <Typography component="span" variant="body2" fontSize=".8em">
            Powered with 💗 by&nbsp;
            <a href="https://mongodb.com/" rel="noopener noreferrer" target="_blank">
              MongoDB
            </a>
            ,&nbsp;
            <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">
              Vercel
            </a>
            &nbsp;&&nbsp;
            <a href="https://render.com/" rel="noopener noreferrer" target="_blank">
              Render
            </a>
          </Typography>

          <Typography component="span" variant="body2" fontSize=".9em">
            ● All rights reserved. All trademarks are the property of their respective owners ●
          </Typography>

          <Typography component="span" variant="body2" fontSize="1em">
            ©SoccerMASS 2018 ~ {new Date().getFullYear()}
          </Typography>
        </section>
      </footer>
    </Fade>
  </div>
);

export default Footer;
