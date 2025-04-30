
  export const apiMessageErrorHandler = (error?: string) => {
    switch (error) {
      case 'Invalid credentials':
        return {
          paths: ['email', 'password'],
          message: 'Credenciais inválidas',
        };
  
      case 'User not found':
        return {
          message: 'Usuário não encontrado',
        };
  
      case 'Resource not found':
        return {
          message: 'Recurso não encontrado',
        };
  
      case 'Phone already exists':
        return {
          paths: ['phone'],
          message: 'Este endereço de telefone já está em uso',
        };
  
      case 'Cpf already exists':
        return {
          paths: ['cpf'],
          message: 'Este CPF já está em uso',
        };
  
      case 'Unauthorized':
        return {
          message: 'Sessão inválida, você foi desconectado',
        };
  
      default:
        return {
          message:
            'Ocorreu um erro desconhecido, se o erro persistir tente novamente mais tarde',
        };
    }
  };