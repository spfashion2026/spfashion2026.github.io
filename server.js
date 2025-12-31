import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import multer from 'multer'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const upload = multer({ storage: multer.memoryStorage() })

// Admin login
app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabaseAdmin.auth.admin.signInWithPassword({ email, password })
  if (error) return res.status(401).json({ error: error.message })
  res.json({ user: data.user })
})

// Get products
app.get('/products', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// Add product
app.post('/products', upload.single('image'), async (req, res) => {
  const { name, category, price, discount } = req.body
  const file = req.file

  const { data: fileData, error: uploadError } = await supabaseAdmin.storage
    .from('product-images')
    .upload(`images/${Date.now()}-${file.originalname}`, file.buffer, { contentType: file.mimetype })

  if (uploadError) return res.status(500).json({ error: uploadError.message })

  const image_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${fileData.path}`

  const { data, error } = await supabaseAdmin.from('products').insert([{ name, category, price, discount, image_url }])
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// Delete product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabaseAdmin.from('products').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
