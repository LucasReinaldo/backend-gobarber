interface IMailConfig {
  driver: 'ethereal' | 'ses';
  default: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  default: {
    from: {
      email: 'mesmo que o configurado no aws',
      name: 'Lucas from Team GoBarber',
    },
  },
} as IMailConfig;
