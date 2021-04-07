import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { 
  Container, 
  Box, 
  Input, 
  Button, 
  Text, 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { Logo } from '../Logo';
import firebase, { persistenceMode } from './../../config/firebase';
import { useEffect } from 'react';

const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
});

export const Login = () => {
  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (values, form) => {
      firebase.auth().setPersistence(persistenceMode);

      try {
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        console.log(user);
        console.log(firebase.auth().currentUser)
      } catch(error) {
        console.log('ERROR:', error);
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    }
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // useEffect(() => {
  //   console.log('Sessao ativa?', firebase.auth().currentUser)
  // }, [])

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>

        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            size="lg" 
            value={values.email} 
            type="email" 
            onChange={handleChange} 
            onBlur={handleBlur} 
          />
          {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <InputGroup size="lg">              
            <Input
                size="lg" 
                value={values.password} 
                type="password" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                type={show ? "text" : "password"}
                placeholder="Min 6 caracteres"
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
          </InputGroup>
          {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
        </FormControl>

        <Box p={4}>          
          <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>
      <Link href='/signup'>Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  )
}