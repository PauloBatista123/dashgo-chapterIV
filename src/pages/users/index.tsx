import { Box, Button, Checkbox, Flex, Heading, Icon, IconButton, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiEditLine, RiRefreshLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination/Index";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";

export default function UserList(){
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching, refetch } = useUsers(page);

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
            <Heading size="lg" fontWeight="normal">Lista Usuários {!isLoading && isFetching && <Spinner />}</Heading>
            
            <Box>
            <Link href="/users/create">
              <Button as="a" size={"sm"} fontSize="sm" colorScheme={"pink"} leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>
                Criar novo
              </Button>
            </Link>
            <Button ml={"4px"} as="button" size={"sm"} fontSize="sm" colorScheme={"cyan"} leftIcon={<Icon as={RiRefreshLine} fontSize="20"></Icon>} onClick={() => refetch()}>
                Atualizar
            </Button>
            </Box>
            
          </Flex>

          {isLoading ? (
            <Flex justify={"center"}><Spinner /></Flex>
          ) : error ? (
            <Flex justify={"center"}>
              <Text>Falha ao obter dados</Text>
            </Flex>
          ) : (
            <>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme={"pink"}></Checkbox>
                  </Th>
                  <Th>Usuário</Th>
                  {isVersionLg && <Th>Data de cadastro</Th>}
                  <Th>Ação</Th>
                </Tr>
              </Thead >
              <Tbody>
                {data.users.map((user) => {
                  return(
                  <Tr key={user.id}>
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme={"pink"}></Checkbox>
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight={"bold"}>{user.name}</Text>
                      <Text size={"sm"} color="gray.300">{user.email}</Text>
                    </Box>
                  </Td>
                  {isVersionLg && <Td>{user.createdAt}</Td>}
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
                    ) : (
                      <IconButton colorScheme={"purple"} as="a" size={"sm"} aria-label='Editar' icon={<RiEditLine />} />
                    )}

                  </Td>
                  </Tr>
                  )
                })}
              </Tbody>
            </Table >
            <Pagination 
              totalCountofRegisters={200}
              currentPage={page}
              onPageChange={setPage}
            />
            </>
          )}

          
        </Box>
      </Flex>
    </Box>
  );
}
