
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  InputLeftAddon,
  InputRightElement
} from '@chakra-ui/react';
import { Logo, useAuth } from '../components';

const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório'),
});

export default function Home() {
  const [auth, { signup }] = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    }
  });

  useEffect(() => {
    auth.user && router.push('/agenda');
  }, [auth.user]);

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
              type={show ? "text" : "password"}
              onChange={handleChange} 
              onBlur={handleBlur} 
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

          <FormControl id="username" p={4} isRequired>
            <InputGroup size="lg">
              <InputLeftAddon children="clocker.work/" />
              <Input
                size="lg" 
                value={values.username} 
                type="username" 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </InputGroup>
            {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
          </FormControl>

        <Box p={4}>          
          <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>
      <Link href='/'>Já tem uma conta? Acesse</Link>
    </Container>
  )
}
