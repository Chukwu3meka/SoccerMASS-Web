"use client";

import Link from "next/link";
import Image from "next/image";
import routes from "utils/routes";
import Ellipsis from "components/shared/ellipsis";

import { styles } from ".";
import { ConsoleLayoutProps } from "interfaces/components/others/layouts.interface";
import { ArrowBack as PrevPageIcon, Webhook as WebhookIcon } from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, ListItemButton, Avatar, Stack, Divider, List, Button, Paper } from "@mui/material";

const ConsoleLayout = ({ children, profile, activeRoute, title, themeHandler, prevPageHandler }: ConsoleLayoutProps) => (
  <div className={styles.layout}>
    <nav className={styles.navigation}>
      <Stack alignItems="center" sx={{ py: 2 }}>
        <Avatar alt={profile?.name} src={profile ? profile.avatar : "/images/layout/profile.webp"} sx={{ width: 115, height: 115 }} />

        <Stack>
          <Ellipsis lines={1} fontWeight={600} fontSize="1em" textTransform="capitalize">
            {profile ? profile.name : "Full name"}
          </Ellipsis>
          <Ellipsis lines={1} ml="auto" textAlign="right" fontSize=".7em">
            {profile ? profile.role : "Role"}
          </Ellipsis>
        </Stack>

        <Divider sx={{ width: "100%", mt: 1, mb: 2 }} />
      </Stack>

      <Stack pr={2} mr={-1.5}>
        <List component="nav" aria-label="main mailbox folders" sx={{ mt: -1.5 }}>
          {routes
            .filter((route) => route.research === null)
            .map(({ title, path, Icon }, i) => (
              <Link key={i} href={path} className={styles[activeRoute.replace("console-", "").startsWith(path) ? "active" : ""]}>
                <ListItemButton selected={activeRoute.replace("console-", "").startsWith(path)}>
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Ellipsis lines={1} fontWeight={600} fontSize=".85em" color="var(--contrast-color) !important">
                      {title.toUpperCase()}
                    </Ellipsis>
                  </ListItemText>
                </ListItemButton>
              </Link>
            ))}

          <ListItemButton>
            <ListItemIcon>
              <IconButton aria-label="theme icon" sx={{ ml: -1.05 }} onClick={themeHandler}>
                <WebhookIcon fontSize="small" />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <a href={`${process.env.BASE_URL}/accounts/signout`} rel="noopener noreferrer" target="_blank">
                <Ellipsis lines={1} fontWeight={600} fontSize=".85em" color="var(--contrast-color) !important">
                  LOGOUT
                </Ellipsis>
              </a>
            </ListItemText>
          </ListItemButton>
        </List>
      </Stack>

      <Stack alignItems="center" py={2}>
        <Divider sx={{ width: "100%", mt: 2, mb: 1.5 }} />

        <Image className={styles.spinner} src="/images/layout/waverd.webp" alt="Wave Research Avatar" width={30} height={30} />

        <Ellipsis lines={1} fontSize=".7em" my={1}>
          Ireland | Nigeria | Israel | United States
        </Ellipsis>

        <Link href="/">
          <Ellipsis lines={1} fontFamily="Fredericka the Great" fontSize=".9em" letterSpacing=".009">
            ©{new Date().getFullYear()} Wave Research
          </Ellipsis>
        </Link>
      </Stack>
    </nav>

    <main>
      <Paper component="header" elevation={2} sx={{ p: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={prevPageHandler}>
            <PrevPageIcon />
          </IconButton>

          <Ellipsis lines={1} fontWeight={600} fontSize="1.3em">
            {title.toUpperCase()}
          </Ellipsis>
        </Stack>

        <Button id="back" variant="outlined" color="primary" onClick={prevPageHandler}>
          Back
        </Button>
      </Paper>

      <div>{children}</div>
    </main>
  </div>
);

export default ConsoleLayout;
