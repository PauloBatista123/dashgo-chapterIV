import { Box, Button, Checkbox, Flex, Heading, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination/Index";
import { Sidebar } from "../../components/Sidebar";

export default function UserList(){

  const isVersionLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box w={"100%"}>
      <Header />

      <Flex w="100%" my="6" mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Lista Usuários</Heading>
            
            <Link href="/users/create">
              <Button as="a" size={"sm"} fontSize="sm" colorScheme={"pink"} leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4","4","6"]} color="gray.300" width="8">
                  <Checkbox colorScheme={"pink"}></Checkbox>
                </Th>
                <Th>Usuário</Th>
                {isVersionLg && <Th>Data de cadastro</Th>}
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4","4","6"]}>
                  <Checkbox colorScheme={"pink"}></Checkbox>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight={"bold"}>Paulo Henrique</Text>
                    <Text size={"sm"} color="gray.300">paulo.batista@gmail.com</Text>
                  </Box>
                </Td>
                {isVersionLg && <Td>04 de abr 2022</Td>}
                <Td>
                  {isVersionLg ? (
                    <Button
                    as="a"
                    size={"sm"}
                    fontSize="sm"
                    colorScheme={"purple"}
                    leftIcon={<Icon
                    as={RiEditLine}
                    fontSize="16"
                    />}>
                    Editar
                  </Button>
                  ):(
                    <IconButton colorScheme={"purple"} as="a" size={"sm"} aria-label='Editar' icon={<RiEditLine />} />
                  )}
                  
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}