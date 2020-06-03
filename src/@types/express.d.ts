declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

// - Quando o token é criado, ele possui algumas partes que podem ser entendidas e resgatadas,
// tais como iat, que é quando foi criado, exp, que é quando o token vai expirar e sub, que é o subject, no nosso caso o id do usuário.

// - Para que possamos resgatar esse sub (id do usuário) temos que criar uma interface,
// pois se só buscarmos sub de decoded (const decoded = verify(token, authConfig.jwt.secret);)
// que é quem possui as informações do token, ele não vai saber identificar o tipo, por isso criamos a
// interface e forçamos a tipagem dele → const { sub } = decoded as TokenPayload;

// - agora que já possuímos o id através do sub, podemos fazer → request.user = { id: sub },
// porém para fazermos isso, precisamos criar uma tipagem dentro do express, pois request não possui
// essa tipagem user, logo vamos adicionar esse tipo ao request do express.

// - Criado pasta @types/express.d.ts, que é o arquivo de definição de tipos do express.
// E adicionamos o código abaixo: basicamente estamos falando que no Express, em Request, possuímos um
// objeto user com a propriedade id sendo uma string.
