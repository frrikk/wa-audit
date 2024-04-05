"use client";

import { Menu } from "@mantine/core";
import { NameIcon } from "@/components/ui/name-icon";
import { logOut } from "@/utils/auth-actions";
import { Button } from "@/components/ui/button";

interface HeaderMenuProps {
  nameIcon: string;
  email: string;
}

export const HeaderMenu = ({ nameIcon, email }: HeaderMenuProps) => {
  return (
    <Menu width={200} trigger="hover" position="bottom-end" shadow="xl">
      <Menu.Target>
        <button>
          <NameIcon name={nameIcon} />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{email}</Menu.Label>
        <Menu.Item>
          <form action={logOut}>
            <Button buttonType="logOut">Log out</Button>
          </form>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
