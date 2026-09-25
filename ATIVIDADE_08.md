# Atividade 08 — Nossa Viagem sem conta

O app React + Capacitor foi preparado para se conectar automaticamente ao Supabase quando abrir. Os dois aparelhos instalados a partir do mesmo build compartilham os dados. A conexão consulta `shared_link_spaces` usando uma chave longa do app em `x-trip-token`, aplica alterações com controle de revisão e consulta a nuvem a cada três segundos.

**Estado atual:** a política de leitura e escrita por token foi aplicada no projeto `nossa-viagem`. Uma consulta com o token do app viu 1 viagem; uma consulta com token incorreto viu 0. Uma gravação como cliente anônimo adicionou 13 itens ao checklist. O APK ainda não foi gerado neste ambiente.

- O token está no arquivo `.env.local` do projeto local. Ele deve ser usado no build de ambos os aparelhos. Nunca publique esse arquivo em um repositório. Para o GitHub Actions, crie o secret `NEXT_PUBLIC_TRIP_TOKEN` com o mesmo valor.
- No app, abra **Mais → Configurações** para ver **Conectado automaticamente** e a lista **Checklist vindo da nuvem** no navegador ou no APK gerado com este token.
- A `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` é pública. O token de viagem também pode ser extraído de um APK instalado; qualquer pessoa que tenha o APK pode ler ou mudar essa viagem. Distribua apenas para os dois aparelhos desejados.
- A migração já aplicada fica documentada em `ESQUEMA_BANCO_APLICADO.sql`. Não a execute novamente no mesmo banco.

## GitHub Actions

Antes do push, registre `NEXT_PUBLIC_TRIP_TOKEN` como Secret do repositório com o valor do arquivo `CONFIGURACAO_PRIVADA_NAO_ENVIAR_GITHUB/.env.local` que acompanha o ZIP. Só envie os arquivos de `PROJETO/` ao repositório. Sem o Secret, o build deve falhar em vez de gerar um app sem conexão.
