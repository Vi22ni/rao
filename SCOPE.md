# Doguinho - Scope v1.0

## Core Features (MVP)
- [ ] Página pública com grid de pets 
- [ ] Formulário de upload (foto + nome + características)
  - Validação: 
    - Front: Tipo de arquivo (image/jpeg, image/png)
    - Back: Verificação básica (tamanho < 2MB)
- [ ] Painel admin (/admin):
  - [ ] Listagem de submissions pendentes
  - [ ] Aprovação/rejeição

## Stack Definida
| Área         | Tecnologias           |
|--------------|-----------------------|
| Backend      | Node.js, Express, PostgreSQL |
| Frontend     | Vue 3, Pinia, PrimeVue |
| Hospedagem   | Vercel (Monorepo) |