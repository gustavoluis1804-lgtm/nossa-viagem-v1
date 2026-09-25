-- Migração aplicada no projeto Supabase nossa-viagem em 25/09/2026.
-- Histórico para revisão; não reaplique diretamente em outro projeto sem ajustar o token.
-- Qualquer pessoa com uma cópia do APK pode recuperar o token e ler/alterar
-- o conteúdo desta viagem. As demais viagens continuam protegidas.

grant select (id, data, revision, updated_at) on public.shared_link_spaces to anon;
grant update (data, revision, updated_at) on public.shared_link_spaces to anon;
create policy "read trip with matching app token" on public.shared_link_spaces
for select to anon using (
  token_hash = encode(sha256(convert_to(coalesce(current_setting('request.headers', true)::jsonb ->> 'x-trip-token', ''), 'UTF8')), 'hex')
);
create policy "update trip with matching app token" on public.shared_link_spaces
for update to anon using (
  token_hash = encode(sha256(convert_to(coalesce(current_setting('request.headers', true)::jsonb ->> 'x-trip-token', ''), 'UTF8')), 'hex')
) with check (
  token_hash = encode(sha256(convert_to(coalesce(current_setting('request.headers', true)::jsonb ->> 'x-trip-token', ''), 'UTF8')), 'hex')
);
insert into public.shared_link_spaces(token_hash, data) values ('66f5ebba5c60d71c605b71a65b6c7838f696a254b9ccccb524bb25145bbe2c00', '{}'::jsonb);
