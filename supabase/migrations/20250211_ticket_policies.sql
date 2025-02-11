-- Enable RLS on tickets table
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view any ticket
CREATE POLICY "Users can view any ticket"
ON tickets FOR SELECT
TO authenticated
USING (true);

-- Policy to allow users to update their own tickets
CREATE POLICY "Users can update their own tickets"
ON tickets FOR UPDATE
TO authenticated
USING (user_email = auth.jwt() ->> 'email');

-- Policy to allow users to close any ticket
CREATE POLICY "Users can close any ticket"
ON tickets FOR UPDATE
TO authenticated
USING (true);
