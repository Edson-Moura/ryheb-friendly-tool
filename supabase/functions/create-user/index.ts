import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, password, full_name, phone, role } = await req.json()

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // 1. Create user with admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        phone: phone || null
      }
    })

    if (authError) {
      throw authError
    }

    if (!authData.user) {
      throw new Error('Usuário não foi criado corretamente')
    }

    // 2. Create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        user_id: authData.user.id,
        full_name,
        phone: phone || null
      })

    if (profileError) {
      console.warn('Erro ao criar perfil:', profileError)
    }

    // 3. Assign role if specified
    if (role) {
      // Get first restaurant to associate user
      const { data: restaurants } = await supabaseAdmin
        .from('restaurants')
        .select('id')
        .limit(1)

      if (restaurants && restaurants.length > 0) {
        const { error: roleError } = await supabaseAdmin
          .from('restaurant_members')
          .insert({
            user_id: authData.user.id,
            restaurant_id: restaurants[0].id,
            role
          })

        if (roleError) {
          console.warn('Erro ao atribuir role:', roleError)
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, user: authData.user }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})