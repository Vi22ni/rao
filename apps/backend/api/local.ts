import app from '../src/server';

const PORT = process.env.PORT || 6543;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
