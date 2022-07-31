import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header(){
  const { onOpen } = useSidebarDrawer();

  const isVersionLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isVersionLg && (
        <IconButton
          icon={<Icon as={RiMenuLine}></Icon>}
          fontSize="24"
          variant={"unstyled"}
          onClick={onOpen}
          aria-label="Open navigation"
          mr={"2"}
        >
        </IconButton>
      )}
      <Logo />

      {isVersionLg && <SearchBox />}

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationNav />
        <Profile showProfileData={isVersionLg} />
      </Flex>
    </Flex>
  );
}