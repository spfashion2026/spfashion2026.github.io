import { supabase } from './supabase.js'

document.getElementById('login').addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { user, error } = await supabase.auth.signInWithPassword({
    email, password
  })

  if (error) alert(error.message)
  else window.location.href = 'admin-dashboard.html'
})
