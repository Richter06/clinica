# 🏥 Clínica Vita+ - Sistema de Gestão Clínica

Sistema web de gerenciamento clínico desenvolvido com **HTML, CSS e JavaScript puro**, utilizando **localStorage** para persistência de dados.

O projeto simula o funcionamento de uma clínica médica real, com foco acadêmico, sendo desenvolvido como **trabalho da universidade**, abrangendo controle completo de pacientes, médicos, consultas, prontuários e dashboard com indicadores em tempo real.

---

## 🎓 Projeto Acadêmico

Este sistema foi desenvolvido como **trabalho da universidade**, com o objetivo de aplicar na prática conceitos de:

- Desenvolvimento Web Front-End
- Manipulação de DOM
- Persistência com localStorage
- Lógica de sistemas administrativos
- Modelagem de dados clínicos simulados
- UX/UI de sistemas reais

---

## 🚀 Funcionalidades

- Cadastro de pacientes
- Cadastro de médicos
- Agendamento de consultas
- Status automático (agendada / confirmada / em atendimento / concluída / cancelada)
- Identificação automática de consultas atrasadas (ignorando concluídas e canceladas)
- Prontuário por paciente com histórico completo
- Registro clínico detalhado (diagnóstico, queixa, alergias, medicações, exames, procedimentos e evolução)
- Sinais vitais (pressão arterial, temperatura, frequência cardíaca)
- Cálculo automático de IMC
- Exportação de prontuário em PDF
- Dashboard com métricas em tempo real
- Relatórios com indicadores gerais do sistema
- Busca e filtros em tempo real
- Edição e exclusão de registros
- Persistência de dados com localStorage

---

## 🧠 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- localStorage
- Chart.js
- jsPDF

---

## 📊 Dashboard

Visão geral do sistema com dados atualizados automaticamente:

- Total de pacientes
- Total de médicos
- Total de consultas
- Consultas do dia
- Consultas futuras
- Consultas passadas
- Consultas atrasadas (excluindo concluídas e canceladas)

![Dashboard](./github/dash.png)

---

## 👨‍⚕️ Pacientes

Gerenciamento completo de pacientes:

- Cadastro
- Edição
- Exclusão
- Pesquisa em tempo real

![Pacientes](./github/pacientes.png)

---

## 🩺 Médicos

Controle de médicos cadastrados:

- Nome
- CRM
- Especialidade
- Contato

![Médicos](./github/medicos.png)

---

## 📅 Consultas

Sistema de agendamento completo:

- Seleção de paciente e médico
- Data e horário
- Status automático
- Histórico de consultas

![Consultas](./github/consultas.png)

---

## 📁 Prontuários

Histórico clínico completo por paciente:

- Queixa principal
- Diagnóstico médico
- Alergias
- Medicações em uso
- Exames solicitados
- Procedimentos realizados
- Evolução do paciente
- Sinais vitais
- Cálculo de IMC
- Observações médicas
- Exportação em PDF

![Prontuários](./github/prontuarios.png)

---

## 📈 Relatórios

Gráficos automáticos com dados do sistema:

- Distribuição de consultas
- Volume de atendimentos
- Indicadores gerais da clínica

![Relatórios](./github/relatorios.png)

---

## ⚙️ Como executar

Clone o repositório:

```bash
git clone https://github.com/Richter06/clinica
