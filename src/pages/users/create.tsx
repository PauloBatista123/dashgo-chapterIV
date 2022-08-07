import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form"

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type SignInFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

//validação
const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa de no minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não conferem'),
});

export default function CreateUser(){
  const createUser = useMutation(async (user: SignInFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }      
    })

    return response.data;
  }, {
    onSuccess: () => { 
      queryClient.invalidateQueries(['users'])
    }
  })

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<SignInFormData> = async (values) => {
    await createUser.mutateAsync(values);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto" px="6">
        <Sidebar />
        
        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6","8"]}
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          {createUser.isSuccess && (
            <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Usuário cadastrado com sucesso!</AlertTitle>
            </Alert>
          )}
          <Heading size={"lg"} fontWeight="normal" >Criar usuário</Heading>

          <Divider my={"6"} borderColor={"gray.700"}/>

          <VStack spacing={"8"}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6","8"]} w={"100%"}>
              <Input
                type="text"
                name="name"
                label="Nome Completo"
                {...register('name')}
                error={errors.name} 
                />
              <Input
                type="email"
                name="email"
                label="E-mail"
                {...register('email')}
                error={errors.email} 
                />
            </SimpleGrid>

            <SimpleGrid minChildWidth={"240px"} spacing={["6","8"]} w={"100%"}>
              <Input
                type="password"
                name="password"
                label="Senha" 
                {...register('password')} 
                error={errors.password} 
                />
              <Input
                type="password"
                name="password_confirmation"
                label="Confirme a Senha" 
                {...register('password_confirmation')} 
                error={errors.password_confirmation}
                />
            </SimpleGrid>
          </VStack>
          <Flex mt={"8"} justify="flex-end">
              <HStack spacing={"4"}>
                <Link href="/users">
                  <Button colorScheme={"whiteAlpha"}>Cancelar</Button>
                </Link>
                <Button
                  colorScheme={"pink"}
                  type="submit"
                  isLoading={isSubmitting}
                >
                    Salvar
                  </Button>
              </HStack>
            </Flex>
        </Box>
      </Flex>
    </Box>
  );
}