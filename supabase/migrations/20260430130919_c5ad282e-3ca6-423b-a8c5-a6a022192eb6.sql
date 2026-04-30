
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticator;

drop policy if exists "Anyone can submit application" on public.applications;
create policy "Validated public application insert" on public.applications
  for insert with check (
    length(trim(full_name)) between 2 and 100
    and email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and length(email) <= 255
    and length(trim(phone)) between 5 and 30
    and length(program) between 2 and 100
    and (country is null or length(country) <= 100)
    and (message is null or length(message) <= 2000)
  );

drop policy if exists "Public read gallery" on storage.objects;
create policy "Public read gallery files" on storage.objects
  for select using (bucket_id = 'gallery' and (storage.foldername(name))[1] is not null);
