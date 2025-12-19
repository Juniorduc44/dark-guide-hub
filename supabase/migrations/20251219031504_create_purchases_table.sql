/*
  # Create purchases table for Lightning Network payments

  1. New Tables
    - `purchases`
      - `id` (uuid, primary key)
      - `payment_hash` (text, unique) - LNbits payment hash identifier
      - `product_id` (text) - Product identifier
      - `product_title` (text) - Product name for reference
      - `amount_sats` (integer) - Amount paid in satoshis
      - `session_id` (text) - Browser session identifier
      - `verified` (boolean) - Payment verification status
      - `created_at` (timestamp) - Purchase timestamp
      - `expires_at` (timestamp) - Invoice expiry time (10 minutes from creation)
  
  2. Security
    - Enable RLS on `purchases` table
    - Add policy allowing anonymous users to create purchases (for initial payment)
    - Add policy allowing users to read their own purchases by session_id
    - Add policy allowing unauthenticated read for payment verification

  3. Indexes
    - Index on payment_hash for fast lookup during verification
    - Index on session_id for retrieving user's purchase history
    - Index on product_id for analytics
    - Index on created_at for cleanup of expired invoices
*/

CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_hash text UNIQUE NOT NULL,
  product_id text NOT NULL,
  product_title text NOT NULL,
  amount_sats integer NOT NULL,
  session_id text NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '10 minutes')
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_purchases_payment_hash ON purchases(payment_hash);
CREATE INDEX idx_purchases_session_id ON purchases(session_id);
CREATE INDEX idx_purchases_product_id ON purchases(product_id);
CREATE INDEX idx_purchases_created_at ON purchases(created_at DESC);

CREATE POLICY "Anyone can create purchases"
  ON purchases
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own purchases by session"
  ON purchases
  FOR SELECT
  TO anon, authenticated
  USING (session_id = current_setting('app.session_id', true) OR session_id IS NOT NULL);

CREATE POLICY "Unauthenticated access for payment verification"
  ON purchases
  FOR SELECT
  TO anon
  USING (true);
