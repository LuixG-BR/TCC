# EMPS — Epilepsy Monitoring and Prevention System

**Sistema de Monitoramento e Prevenção da Epilepsia**  
**TCC | Técnico em Desenvolvimento de Sistemas — ETEC Registro**

O **EMPS** é um protótipo acadêmico de monitoramento de pessoas com epilepsia, integrando uma cinta cardíaca Bluetooth, um sensor de movimento, um microcontrolador ESP32, um aplicativo mobile, um sistema web e uma API com banco de dados em nuvem.

O objetivo é coletar sinais cardíacos e movimentos, analisar alterações conforme regras experimentais e disponibilizar informações para acompanhamento de pacientes e profissionais.

> **Aviso:** o EMPS é um protótipo educacional. Não é um dispositivo médico validado e não deve ser utilizado para diagnosticar, prever ou prevenir crises epilépticas nem substituir atendimento profissional.

## Arquitetura atual

```text
Cinta cardíaca BLE ──────► ESP32 ◄────── MPU6050 (I²C)
                              │
                         BLE EMPS_ESP32
                              │
                              ▼
                      Aplicativo React Native
                      • recebe as leituras
                      • calcula médias periódicas
                      • identifica o paciente logado
                              │
                       POST /monitoramento
                              │
                              ▼
                         API FastAPI
                      • valida os dados
                      • aplica regras de status
                      • controla autenticação
                              │
                              ▼
                      PostgreSQL / Supabase
                              │
                              ▼
                      Sistema web e mobile
```

## Próximas etapas para a banca final

- [ ] Melhorar a estabilidade da alimentação elétrica do protótipo.
- [ ] Revisar os critérios experimentais de detecção para reduzir falsos positivos.
- [ ] Implementar e validar o **modo Sport**, distinguindo atividade física de situações suspeitas.
- [ ] Melhorar a estabilidade e reconexão BLE.
- [ ] Finalizar o fluxo web de acompanhamento e registro médico.
- [ ] Testar o monitoramento ponta a ponta em diferentes cenários.
- [ ] Revisar permissões, privacidade dos dados e tratamento de erros.
- [ ] Concluir documentação, fluxogramas e apresentação.

**Decisão de escopo:** não está prevista a miniaturização comercial com ESP32-C3 Mini nem a exigência de autonomia de 24 horas para a banca final. A prioridade é manter o hardware já demonstrado e melhorar sua confiabilidade.

As branches de desenvolvimento incluem frentes de backend, frontend, mobile e integração com o ESP32. A organização exata das pastas deve seguir a versão consolidada na branch principal.

---

**Estado da documentação:** outubro de 2026. Elaborado com base no contexto consolidado do EMPS até 09/10/2026. As ferramentas listadas refletem a implementação atual e o histórico de desenvolvimento; itens ainda planejados estão identificados.
