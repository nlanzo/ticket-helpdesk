-- Add columns for ticket closing functionality
ALTER TABLE tickets
ADD COLUMN closed boolean DEFAULT false,
ADD COLUMN closed_at timestamp with time zone,
ADD COLUMN closed_by text,
ADD COLUMN closing_message text;
