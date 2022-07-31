import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerContextProps {
  children: ReactNode;
}

type SideareaDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SideareaDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerContextProps){

  const disclosure = useDisclosure();
  const router = useRouter();

  //toda vez que trocar de rota o navigationdrawer vai fechar
  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath])

  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);