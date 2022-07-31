import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
  return (
    <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiInputMethodLine} href="/forms" children="Formulários" />
          <NavLink icon={RiGitMergeLine} href="/automation" children="Automação" />
        </NavSection>
        <NavSection title="AUTOMAÇÃO">
          <NavLink icon={RiInputMethodLine} href="/dashboard" children="Dashboard" />
          <NavLink icon={RiContactsLine} href="/users" children="Usuários" />
        </NavSection>        
      </Stack>
  )
}