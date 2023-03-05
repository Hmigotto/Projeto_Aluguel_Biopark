const express = require("express")

const prediosRoutes = express.Router();

const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

// Criação de um novo prédio com apartamentos
prediosRoutes.post('/predios', async (req, res) => {
  const { nome, tamanho, apartamentos } = req.body

  const predio = await prisma.predio.create({
    data: {
      nome,
      tamanho,
      apartamentos: {
        createMany: {
          data: apartamentos.map((apartamento) => ({
            nome: apartamento.nome,
            disponibilidade: apartamento.disponibilidade,
            locador: apartamento.locador,
            locatario: apartamento.locatario,
            valor: apartamento.valor,
          })),
        },
      },
    },
    include: {
      apartamentos: true,
    },
  })

  res.json(predio)
})

// Criação de um novo apartamento para um prédio
prediosRoutes.post('/predios/:id', async (req, res) => {
  const { id } = req.params // extrai o id do prédio da rota
  const { nome, disponibilidade, locador, locatario, valor } = req.body // extrai os dados do novo apartamento do corpo da requisição

  const apartamento = await prisma.apartamento.create({
    data: {
      nome,
      disponibilidade,
      locador,
      locatario,
      valor,
      predio: {
        connect: {
          id: parseInt(id), // conecta o novo apartamento ao prédio com o id correspondente
        },
      },
    },
  })

  res.json(apartamento)
})

// Criação de uma nova reserva
prediosRoutes.post('/reserva', async (req, res) => {
  const { nome, email, contato, mensagem } = req.body

  const reserva = await prisma.reserva.create({
    data: {
      nome,
      email,
      contato,
      mensagem,
    },
  })

  res.json(reserva)
})


// Listagem de todos os prédios
prediosRoutes.get('/predios', async (req, res) => {
  const predios = await prisma.predio.findMany({
    include: {
      apartamentos: true,
    },
  })
  res.json(predios)
})

// Listagem de um predio especifico
prediosRoutes.get('/predios/:id', async (req, res) => {
  const { id } = req.params;
  const predio = await prisma.predio.findUnique({
    where: { id: parseInt(id) },
    include: { apartamentos: true },
  });
  res.json(predio);
});

// Listagem de um apartamento especifico
prediosRoutes.get('/predios/:idPredio/:idApartamento', async (req, res) => {
  const { idPredio, idApartamento } = req.params;

  const apartamento = await prisma.apartamento.findUnique({
    where: {
      id: parseInt(idApartamento),
    },
    include: {
      predio: true,
    },
  });

  res.json(apartamento);
});

// Listagem de todas as reservas
prediosRoutes.get('/reserva', async (req, res) => {
  const reserva = await prisma.reserva.findMany({
  })
  res.json(reserva)
})


// Atualização de um prédio
prediosRoutes.put('/predios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, tamanho } = req.body;

  try {
    const updatedPredio = await prisma.predio.update({
      where: { id: Number(id) },
      data: { nome, tamanho },
    });

    res.json(updatedPredio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o prédio.' });
  }
});


// Atualização de um apartamento
prediosRoutes.put('/predios/:idPredio/:idApartamento', async (req, res) => {
  const { idPredio, idApartamento } = req.params;
  const { nome, disponibilidade, locador, locatario, valor } = req.body;

  try {
    const updatedApartamento = await prisma.apartamento.update({
      where: { id: Number(idApartamento) },
      data: { nome, disponibilidade, locador, locatario, valor },
    });

    res.json(updatedApartamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o apartamento.' });
  }
});


// Remoção de um prédio
prediosRoutes.delete('/predios/:id', async (req, res) => {
  const { id } = req.params;

  // ----------------  Verifica se o prédio existe
  const predio = await prisma.predio.findUnique({
    where: { id: parseInt(id) },
  });

  if (!predio) {
    return res.status(404).json({ message: 'Prédio não encontrado' });
  }

  // ----------------  Remove os apartamentos relacionados ao prédio
  await prisma.apartamento.deleteMany({
    where: {
      predioId: predio.id,
    },
  });

  // ----------------  Remove o prédio
  try {
    await prisma.predio.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Prédio removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Não foi possível remover o prédio' });
  }
});

// Remoção de um apartamento
prediosRoutes.delete('/predios/:idPredio/:idApartamento', async (req, res) => {
  const { idPredio, idApartamento } = req.params;

  try {
    await prisma.apartamento.delete({
      where: {
        id: parseInt(idApartamento),
      },
    });

    res.send('Apartamento removido com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Não foi possível remover o apartamento');
  }
});

// Remoção de uma reserva
prediosRoutes.delete('/reserva/:id', async (req, res) => {
  const { id } = req.params

  const reserva = await prisma.reserva.delete({
    where: {
      id: parseInt(id),
    },
  })

  res.json(reserva)
})



module.exports = prediosRoutes
