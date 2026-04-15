create or replace function public.before_user_created_enforce_domain(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  user_email text := event->'user'->>'email';
begin
  if user_email is null or lower(user_email) not like '%@g.chuo-u.ac.jp' then
    return jsonb_build_object(
      'decision', 'reject',
      'message', '中央大学のGoogleアカウント (@g.chuo-u.ac.jp) のみ利用できます。'
    );
  end if;
  return '{}'::jsonb;
end;
$$;

grant execute on function public.before_user_created_enforce_domain to supabase_auth_admin;
revoke execute on function public.before_user_created_enforce_domain from authenticated, anon, public;
