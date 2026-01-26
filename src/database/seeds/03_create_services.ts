import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('services').del();

  await knex('services').insert([
    {
      name: 'Instalação e atualização de softwares',
      description: 'Instalação e atualização de software',
      price: 150.0,
      is_active: true,
    },
    {
      name: 'Instalação e atualização de hardwares',
      description: 'Instalação e configuração de componentes físicos',
      price: 200.0,
      is_active: true,
    },
    {
      name: 'Diagnóstico e remoção de vírus',
      description: 'Identificação e eliminação de malwares e vírus',
      price: 100.0,
      is_active: true,
    },
    {
      name: 'Suporte a impressoras',
      description: 'Configuração e manutenção de impressoras',
      price: 80.0,
      is_active: true,
    },
    {
      name: 'Configuração de VPN e Acesso Remoto',
      description: 'Configuração de acesso remoto seguro',
      price: 180.0,
      is_active: true,
    },
  ]);
}
